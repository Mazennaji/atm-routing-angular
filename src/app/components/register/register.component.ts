import { Component, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name = '';
  email = '';
  pin = '';
  confirmPin = '';
  error = signal<string | null>(null);
  loading = signal(false);
  showPin = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  togglePin(): void {
    this.showPin.update((v) => !v);
  }

  get pinStrength(): 'weak' | 'medium' | 'strong' | null {
    if (!this.pin) return null;
    if (this.pin.length < 4) return 'weak';
    const unique = new Set(this.pin.split('')).size;
    if (unique <= 1) return 'weak';
    if (unique <= 2) return 'medium';
    return 'strong';
  }

  submit(): void {
    this.error.set(null);

    if (!this.name || !this.email || !this.pin || !this.confirmPin) {
      this.error.set('Please fill in all fields');
      return;
    }

    if (this.pin !== this.confirmPin) {
      this.error.set('PINs do not match');
      return;
    }

    this.loading.set(true);

    setTimeout(() => {
      const result = this.auth.register(this.name, this.email, this.pin);
      this.loading.set(false);

      if (result.success) {
        this.router.navigate(['/']);
      } else {
        this.error.set(result.error ?? 'Registration failed');
      }
    }, 800);
  }
}
