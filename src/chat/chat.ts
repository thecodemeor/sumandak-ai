import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat.html',
    styleUrl: './chat.scss'
})
export class ChatComponent {
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
        this.messages.push({ role: 'bot', text: 'Thinking…' });

        try {
            const res = await this.chat.send(msg);
            this.messages[this.messages.length - 1].text = res.reply;
        } catch {
            this.messages[this.messages.length - 1].text = 'Error contacting AI';
        } finally {
            this.sending = false;
        }
    }
}