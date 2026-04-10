import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AtmService, Transaction } from '../../services/atm.service';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {
  constructor(public atm: AtmService) {}

  get tx(): Transaction | null { return this.atm.lastTx(); }

  get txId(): string {
    return 'NX' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
