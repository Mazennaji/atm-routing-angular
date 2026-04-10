import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  email: string;
  cardNumber: string;
  pin: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users = signal<User[]>([
    {
      name: 'Alex Morgan',
      email: 'alex@nexbank.com',
      cardNumber: '4821',
      pin: '1234',
    },
  ]);

  currentUser = signal<User | null>(null);
  isLoggedIn = computed(() => this.currentUser() !== null);

  constructor(private router: Router) {}

  login(email: string, pin: string): { success: boolean; error?: string } {
    const user = this.users().find(
      (u) => u.email === email && u.pin === pin
    );
    if (user) {
      this.currentUser.set(user);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or PIN' };
  }

  register(name: string, email: string, pin: string): { success: boolean; error?: string } {
    if (this.users().find((u) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      return { success: false, error: 'PIN must be exactly 4 digits' };
    }
    const last4 = String(1000 + Math.floor(Math.random() * 9000));
    const user: User = { name, email, cardNumber: last4, pin };
    this.users.update((list) => [...list, user]);
    this.currentUser.set(user);
    return { success: true };
  }

  logout(): void {
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
