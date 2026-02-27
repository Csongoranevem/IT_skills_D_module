import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';

interface ChatMessage {
  sender: 'user' | 'ai';
  name: string;
  text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class HomeComponent implements OnInit {
  UserMessage: string = '';
  messages: ChatMessage[] = [];
  isLoading: boolean = false;

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.addAiGreeting();
  }

  private addAiGreeting() {
    this.messages.push({
      sender: 'ai',
      name: 'AI pajtás',
      text: 'Szia miben segíthetek? 😊 Csak írj nyugodtan, hajrá...'
    });
  }

  async sendMessage() {
    if (this.UserMessage.trim() === '') {
      console.log('Üres üzenet!');
      return;
    }

    this.messages.push({
      sender: 'user',
      name: 'Te',
      text: this.UserMessage
    });

    const userText = this.UserMessage;
    this.UserMessage = '';
    this.isLoading = true;

    try {
      const res = await this.api.sendMail({ message: userText });
      this.messages.push({
        sender: 'ai',
        name: 'AI pajtás',
        text: res.message || 'Nem érkezett válasz.'
      });
    } catch {
      this.messages.push({
        sender: 'ai',
        name: 'AI pajtás',
        text: 'Hiba történt a válasz lekérésekor.'
      });
    } finally {
      this.isLoading = false;
    }
  }

  newChat() {
    this.messages = [];
    this.addAiGreeting();
  }
}

