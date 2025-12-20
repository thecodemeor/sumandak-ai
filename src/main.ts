import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ChatComponent } from './chat/chat';

bootstrapApplication(ChatComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));