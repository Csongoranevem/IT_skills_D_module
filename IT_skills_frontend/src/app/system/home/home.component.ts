import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // Kikapcsolja az izolációt
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class HomeComponent {
  UserMessage: string = "";

  sendMessage() {
    if (this.UserMessage == "") {
      console.log("Üres üzenet!");
    } else {
      const ChatFal = document.getElementById("ChatFal");

      const UserMessageDiv = document.createElement("div");
      UserMessageDiv.classList.add("UserChat");

      const UserName = document.createElement("h6");
      UserName.innerHTML = "Username";
      UserName.classList.add("UserName");
      UserName.classList.add("ChatNames");

      const UserMessageText = document.createElement("p");
      UserMessageText.innerHTML = this.UserMessage;
      UserMessageText.classList.add("UserMessage");

      ChatFal!.appendChild(UserMessageDiv);
      UserMessageDiv.appendChild(UserName);
      UserMessageDiv.appendChild(UserMessageText);

      this.UserMessage = "";
    }
  }

  newChat() {
    const ChatFal = document.getElementById("ChatFal");
    ChatFal!.innerHTML = "";
    const UserMessageDiv = document.createElement("div");
    UserMessageDiv.classList.add("AIChat");

    const UserName = document.createElement("h6");
    UserName.innerHTML = "AI pajtás";
    UserName.classList.add("AIName");
    UserName.classList.add("ChatNames");

    const UserMessageText = document.createElement("p");
    UserMessageText.innerHTML = "Szia miben segíthetek? 😊 Csak írj nyugodtan, hajrá.. ÁLLJÁ KI A SZÁMBÓL";
    UserMessageText.classList.add("AIMessage");

    ChatFal!.appendChild(UserMessageDiv);
    UserMessageDiv.appendChild(UserName);
    UserMessageDiv.appendChild(UserMessageText);
}
}

