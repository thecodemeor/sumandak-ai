import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private http: HttpClient) {}

    send(message: string): Promise<{ reply: string }> {
        return firstValueFrom(
            this.http.post<{ reply: string }>('/api/chat', { message })
        );
    }
}