import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageComponent } from '../message/message.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  navItems = [
    { name: 'Főoldal', link: '/home' },
    { name: 'Kapcsolat', link: '/contact' },
    { name: 'Bejelentkezés', link: '/login' },
    { name: 'Regisztráció', link: '/register' },

  ]

}
