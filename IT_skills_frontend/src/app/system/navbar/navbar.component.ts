import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavItem } from '../../interfaces/navItem';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  navItems: NavItem[] = [];
  isLoggedIn = false;

  private loggedOutItems: NavItem[] = [
    { name: 'Bejelentkezés', link: '/login' },
  ];

  private loggedInItems: NavItem[] = [
    { name: 'Főoldal', link: '/home' },
    { name: 'Kapcsolat', link: '/contact' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.navItems = loggedIn ? this.loggedInItems : this.loggedOutItems;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
