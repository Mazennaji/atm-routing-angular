import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AtmService } from '../../services/atm.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {
  constructor(public atm: AtmService) {}

  get spendingRate(): number {
    return Math.min(100, (this.atm.balance() / 10000) * 100);
  }
}
