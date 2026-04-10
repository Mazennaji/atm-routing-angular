import { Routes } from '@angular/router';
import { HomeComponent }     from './components/home/home.component';
import { BalanceComponent }  from './components/balance/balance.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { DepositComponent }  from './components/deposit/deposit.component';
import { ReceiptComponent }  from './components/receipt/receipt.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '',         component: HomeComponent,     pathMatch: 'full' },

  { path: 'balance',  component: BalanceComponent  },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'deposit',  component: DepositComponent  },
  { path: 'receipt',  component: ReceiptComponent  },

  { path: '**',       component: NotFoundComponent },
];
