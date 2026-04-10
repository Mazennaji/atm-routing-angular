import { Injectable, signal } from '@angular/core';

export interface Transaction {
  type: 'withdrawal' | 'deposit';
  amount: number;
  timestamp: Date;
  balance: number;
}

@Injectable({ providedIn: 'root' })
export class AtmService {
  balance   = signal<number>(4_250.75);
  cardName  = signal<string>('ALEX MORGAN');
  cardLast4 = signal<string>('4821');
  lastTx    = signal<Transaction | null>(null);

  withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this.balance()) return false;
    const newBal = parseFloat((this.balance() - amount).toFixed(2));
    this.balance.set(newBal);
    this.lastTx.set({ type: 'withdrawal', amount, timestamp: new Date(), balance: newBal });
    return true;
  }

  deposit(amount: number): boolean {
    if (amount <= 0) return false;
    const newBal = parseFloat((this.balance() + amount).toFixed(2));
    this.balance.set(newBal);
    this.lastTx.set({ type: 'deposit', amount, timestamp: new Date(), balance: newBal });
    return true;
  }

  formatCurrency(val: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  }
}