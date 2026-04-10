import { Component, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  pin = '';
  error = signal<string | null>(null);
  loading = signal(false);
  showPin = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  togglePin(): void {
    this.showPin.update((v) => !v);
  }

  submit(): void {
    this.error.set(null);

    if (!this.email || !this.pin) {
      this.error.set('Please fill in all fields');
      return;
    }

    this.loading.set(true);

    // Simulate network delay
    setTimeout(() => {
      const result = this.auth.login(this.email, this.pin);
      this.loading.set(false);

      if (result.success) {
        this.router.navigate(['/']);
      } else {
        this.error.set(result.error ?? 'Login failed');
      }
    }, 600);
  }
}
