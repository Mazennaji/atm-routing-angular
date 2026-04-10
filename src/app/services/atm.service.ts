import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

export interface Transaction {
  id: string;
  type: 'withdrawal' | 'deposit';
  amount: number;
  date: Date;
  balanceAfter: number;
}

@Injectable({ providedIn: 'root' })
export class AtmService {
  private auth = inject(AuthService);

  // ── Account state ──
  balance = signal<number>(4_300.75);

  // ── Read from AuthService ──
  cardName = computed(() => this.auth.currentUser()?.name ?? 'Guest');
  cardLast4 = computed(() => this.auth.currentUser()?.cardNumber ?? '0000');

  // ── Transaction history ──
  transactions = signal<Transaction[]>([
    { id: 'tx-001', type: 'deposit',    amount: 1_500.00, date: new Date(2024, 11, 28, 9, 15),  balanceAfter: 4_800.75 },
    { id: 'tx-002', type: 'withdrawal', amount: 200.00,   date: new Date(2024, 11, 29, 14, 30), balanceAfter: 4_600.75 },
    { id: 'tx-003', type: 'deposit',    amount: 350.00,   date: new Date(2024, 11, 30, 11, 0),  balanceAfter: 4_950.75 },
    { id: 'tx-004', type: 'withdrawal', amount: 500.00,   date: new Date(2025, 0, 2, 16, 45),   balanceAfter: 4_450.75 },
    { id: 'tx-005', type: 'withdrawal', amount: 150.00,   date: new Date(2025, 0, 3, 10, 20),   balanceAfter: 4_300.75 },
  ]);

  // ── Last transaction (for receipt) ──
  lastTx = signal<Transaction | null>(null);

  // ── Computed ──
  totalWithdrawn = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  totalDeposited = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  transactionCount = computed(() => this.transactions().length);

  // ── Methods ──
  withdraw(amount: number): boolean {
    if (amount <= 0 || amount > this.balance() || amount > 2000) return false;
    const newBalance = this.balance() - amount;
    const tx: Transaction = {
      id: `tx-${String(Date.now()).slice(-6)}`,
      type: 'withdrawal',
      amount,
      date: new Date(),
      balanceAfter: newBalance,
    };
    this.balance.set(newBalance);
    this.transactions.update((list) => [...list, tx]);
    this.lastTx.set(tx);
    return true;
  }

  deposit(amount: number): boolean {
    if (amount <= 0) return false;
    const newBalance = this.balance() + amount;
    const tx: Transaction = {
      id: `tx-${String(Date.now()).slice(-6)}`,
      type: 'deposit',
      amount,
      date: new Date(),
      balanceAfter: newBalance,
    };
    this.balance.set(newBalance);
    this.transactions.update((list) => [...list, tx]);
    this.lastTx.set(tx);
    return true;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
}
