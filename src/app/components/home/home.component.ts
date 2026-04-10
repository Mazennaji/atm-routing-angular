import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AtmService } from '../../services/atm.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentTime = new Date();

  constructor(public atm: AtmService) {
    setInterval(() => this.currentTime = new Date(), 1000);
  }

  get greeting(): string {
    const h = this.currentTime.getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }
}
