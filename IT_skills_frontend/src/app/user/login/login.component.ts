import { Component } from '@angular/core';
import { APIService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';
import { MessageComponent } from '../../system/message/message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  ngOnInit(): void {
  }

  constructor(
    private api: APIService,
    private auth: AuthService,
    private message: MessageService,
    private router: Router

  ) { }



  login() {

    if (!this.email || !this.password) {
      this.message.show('warning', 'Figyelem', 'Kérlek töltsd ki az összes mezőt!');
      return;
    }
    this.api.Login(this.email, this.password).then(res => {
      if (res.status == 500) {
        this.message.show('danger', 'Hiba', res.message!);
        return
      }

      if (this.rememberMe) {
        this.auth.storeUser(JSON.stringify(res.data))
      }

      this.auth.login(JSON.stringify(res.data));
      this.router.navigate(['/home']);
      this.message.show('success', '', "Sikeresen bejelentkeztél!");
    })
  }
}
