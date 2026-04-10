import { Component, signal, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AtmService, Transaction } from '../../services/atm.service';

type FilterType = 'all' | 'withdrawal' | 'deposit';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  filter = signal<FilterType>('all');
  searchQuery = signal<string>('');

  filteredTransactions = computed(() => {
    let txs = [...this.atm.transactions()].reverse(); // newest first
    const f = this.filter();
    if (f !== 'all') {
      txs = txs.filter((t) => t.type === f);
    }
    const q = this.searchQuery().toLowerCase();
    if (q) {
      txs = txs.filter(
        (t) =>
          t.type.includes(q) ||
          t.amount.toString().includes(q) ||
          t.id.includes(q)
      );
    }
    return txs;
  });

  constructor(public atm: AtmService) {}

  setFilter(f: FilterType): void {
    this.filter.set(f);
  }

  onSearch(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  }
}
