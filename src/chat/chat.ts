import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';
import { MozCard, MozCardBody, MozButton } from 'mozek-angular';
import { SumInput } from '../components/input/input';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MozCard,
    MozCardBody,
    MozButton,
    SumInput
],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class ChatComponent {
    @ViewChild('bottom') bottom!: ElementRef<HTMLDivElement>;

    private shouldScroll = false;
    input = '';
    sending = false;

    messages: { role: 'user' | 'bot'; text: string }[] = [
        { role: 'bot', text: 'Salam. I am Sumandak. Ask me anything.' }
    ];

    constructor(private chat: ChatService) {}

    async send() {
        const msg = this.input.trim();
        if (!msg || this.sending) return;

        this.input = '';
        this.sending = true;

        this.messages.push({ role: 'user', text: msg });

        // Keep a reference so we always update the correct "Thinking…" bubble
        const botMsg = { role: 'bot' as const, text: 'Thinking…' };
        this.messages.push(botMsg);

        this.shouldScroll = true;

        try {
            const res = await this.chat.send(msg);
            botMsg.text = res?.reply ?? 'No response.';
        } catch (e: any) {
            // Show the REAL error message (super important for debugging)
            const details =
                e?.error?.details ||
                e?.error?.error ||
                e?.error?.message ||
                e?.message ||
                'Request failed';

            botMsg.text = `Error: ${details}`;
        } finally {
            this.sending = false;
            this.shouldScroll = true;
        }
    }
    ngAfterViewChecked(): void {
        if (this.shouldScroll) {
            this.bottom?.nativeElement.scrollIntoView({ behavior: 'smooth' });
            this.shouldScroll = false;
        }
    }
}