import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AtmService } from '../../services/atm.service';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  selectedAmount = signal<number | null>(null);
  customMode = signal<boolean>(false);
  customInput = signal<string>('');
  error = signal<string>('');
  success = signal<boolean>(false);

  quickAmounts = [20, 40, 60, 100, 200, 500];

  constructor(public atm: AtmService, private router: Router) {}

  selectAmount(val: number): void {
    this.selectedAmount.set(val);
    this.customMode.set(false);
    this.customInput.set('');
    this.error.set('');
  }

  enableCustom(): void {
    this.customMode.set(true);
    this.selectedAmount.set(null);
  }

  onCustomInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.customInput.set(val);
    const num = parseFloat(val);
    this.selectedAmount.set(isNaN(num) ? null : num);
    this.error.set('');
  }

  get amount(): number | null { return this.selectedAmount(); }

  confirm(): void {
    const amt = this.amount;
    if (!amt || amt <= 0) { this.error.set('Please select or enter an amount.'); return; }
    if (amt > this.atm.balance()) { this.error.set('Insufficient funds.'); return; }
    if (amt > 2000) { this.error.set('Exceeds daily limit of $2,000.'); return; }
    if (amt % 20 !== 0 && !this.customMode()) { this.error.set('Amount must be a multiple of $20.'); return; }

    const ok = this.atm.withdraw(amt);
    if (ok) { this.success.set(true); setTimeout(() => this.router.navigate(['/receipt']), 1200); }
    else { this.error.set('Transaction failed. Please try again.'); }
  }
}