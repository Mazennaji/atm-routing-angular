import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BalanceComponent } from './components/balance/balance.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard, guestGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  // Public routes
  { path: 'login',    component: LoginComponent,    canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },

  // Protected routes
  { path: '',         component: HomeComponent,     pathMatch: 'full', canActivate: [authGuard] },
  { path: 'balance',  component: BalanceComponent,  canActivate: [authGuard] },
  { path: 'withdraw', component: WithdrawComponent, canActivate: [authGuard] },
  { path: 'deposit',  component: DepositComponent,  canActivate: [authGuard] },
  { path: 'receipt',  component: ReceiptComponent,  canActivate: [authGuard] },

  // Wildcard — always last
  { path: '**',       component: NotFoundComponent },
];
