import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AtmService } from '../../services/atm.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  amount = signal<string>('');
  error  = signal<string>('');
  success = signal<boolean>(false);

  quickAmounts = [50, 100, 200, 500, 1000, 2000];

  constructor(public atm: AtmService, private router: Router) {}

  get numericAmount(): number { return parseFloat(this.amount()) || 0; }

  selectQuick(val: number): void {
    this.amount.set(val.toString());
    this.error.set('');
  }

  onInput(event: Event): void {
    this.amount.set((event.target as HTMLInputElement).value);
    this.error.set('');
  }

  confirm(): void {
    const amt = this.numericAmount;
    if (!amt || amt <= 0)  { this.error.set('Please enter a deposit amount.'); return; }
    if (amt > 50000)       { this.error.set('Maximum single deposit is $50,000.'); return; }

    const ok = this.atm.deposit(amt);
    if (ok) { this.success.set(true); setTimeout(() => this.router.navigate(['/receipt']), 1200); }
    else    { this.error.set('Deposit failed. Please try again.'); }
  }
}
