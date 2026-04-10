<div align="center">

<img src="https://img.shields.io/badge/%20-NexBank-0a0c0f?style=for-the-badge&labelColor=00e5a0&color=0a0c0f" height="40"/>

<br/>
<br/>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&duration=3000&pause=1000&color=00E5A0&center=true&vCenter=true&repeat=false&width=500&lines=ATM+User+Interface"/>
  <img alt="NexBank" src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=28&duration=3000&pause=1000&color=0a0c0f&center=true&vCenter=true&repeat=false&width=500&lines=ATM+User+Interface"/>
</picture>

<br/>

**Routing in Angular · Signals · Standalone Components**

<br/>

<a href="https://angular.io"><img src="https://img.shields.io/badge/Angular_17-DD0031.svg?style=flat&logo=angular&logoColor=white" alt="Angular 17"/></a>&nbsp;
<a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript_5.2-3178C6.svg?style=flat&logo=typescript&logoColor=white" alt="TypeScript"/></a>&nbsp;
<img src="https://img.shields.io/badge/Signals-FF6D00.svg?style=flat&logoColor=white" alt="Signals"/>&nbsp;
<img src="https://img.shields.io/badge/Standalone-7C3AED.svg?style=flat" alt="Standalone"/>&nbsp;
<img src="https://img.shields.io/badge/License-MIT-00E5A0.svg?style=flat" alt="MIT"/>

<br/>
<br/>

A production-grade ATM interface demonstrating Angular Router concepts — route matching, wildcard routes, reactive signals, and multi-screen navigation through a realistic banking flow.

<br/>

[Live Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

<br/>

---

</div>

<br/>

## About

Built as part of the Coursera guided project **"Build ATM User Interface using Routing in Angular"**, then elevated into a fully designed, production-quality application. The app walks through a complete ATM flow — insert card → check balance → withdraw or deposit → view receipt — where each screen is a standalone route tied together by a persistent shell layout.

<br/>

## Screens & Routes

```
Route           Component            Concept
─────────────────────────────────────────────────────────────
/               HomeComponent        pathMatch: 'full' — exact match only
/balance        BalanceComponent     Standard prefix match
/withdraw       WithdrawComponent    Programmatic navigation via Router.navigate()
/deposit        DepositComponent     Reactive state shared across routes
/receipt        ReceiptComponent     Reading cross-route state from service
**              NotFoundComponent    Wildcard — must be last in routes array
```

<br/>

## Architecture

```
AppComponent (shell — always rendered)
│
├── /               → HomeComponent
│     routerLinkActive highlights nav (exact match)
│
├── /balance        → BalanceComponent
│
├── /withdraw       → WithdrawComponent
│     └── on success → router.navigate(['/receipt'])
│
├── /deposit        → DepositComponent
│     └── on success → router.navigate(['/receipt'])
│
├── /receipt        → ReceiptComponent
│     reads lastTx signal from AtmService
│
└── **              → NotFoundComponent
```

<br/>

## Key Concepts

<details>
<summary><strong>Route Configuration</strong></summary>

<br/>

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  { path: '',         component: HomeComponent,     pathMatch: 'full' },
  { path: 'balance',  component: BalanceComponent  },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'deposit',  component: DepositComponent  },
  { path: 'receipt',  component: ReceiptComponent  },
  { path: '**',       component: NotFoundComponent },
];
```

</details>

<details>
<summary><strong>Route Matching — <code>prefix</code> vs <code>full</code></strong></summary>

<br/>

```typescript
// 'prefix' (default) — matches any URL starting with the path segment
{ path: 'balance', component: BalanceComponent }

// 'full' — only matches when the entire URL equals the path
{ path: '', component: HomeComponent, pathMatch: 'full' }
```

</details>

<details>
<summary><strong>Wildcard Route</strong></summary>

<br/>

```typescript
// Catches every URL that didn't match above — order is critical
{ path: '**', component: NotFoundComponent }
```

</details>

<details>
<summary><strong>Router Directives</strong></summary>

<br/>

```html
<a routerLink="/balance" routerLinkActive="active">Balance</a>

<a routerLink="/"
   routerLinkActive="active"
   [routerLinkActiveOptions]="{ exact: true }">
  Home
</a>
```

</details>

<details>
<summary><strong>Programmatic Navigation</strong></summary>

<br/>

```typescript
constructor(private router: Router) {}

confirm(): void {
  const ok = this.atm.withdraw(amount);
  if (ok) this.router.navigate(['/receipt']);
}
```

</details>

<details>
<summary><strong>Angular Signals — Reactive State</strong></summary>

<br/>

```typescript
balance = signal<number>(4_250.75);
lastTx  = signal<Transaction | null>(null);

withdraw(amount: number): boolean {
  this.balance.set(this.balance() - amount);
  this.lastTx.set({ type: 'withdrawal', amount, ... });
  return true;
}
```

</details>

<br/>

## Tech Stack

```
Layer        Choice              Rationale
──────────────────────────────────────────────────────────
Framework    Angular 17          Standalone components, no NgModule
State        Angular Signals     Fine-grained reactivity, no RxJS overhead
Routing      @angular/router     withViewTransitions() for smooth pages
Styling      Pure CSS + Vars     Zero deps, full design system control
Fonts        Syne + DM Mono      Display + monospace ATM aesthetic
Language     TypeScript 5.2      Strict mode throughout
```

<br/>

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/              # Welcome screen + quick actions
│   │   ├── balance/           # Account overview
│   │   ├── withdraw/          # Cash withdrawal flow
│   │   ├── deposit/           # Fund deposit flow
│   │   ├── receipt/           # Transaction receipt
│   │   └── not-found/         # 404 wildcard screen
│   ├── services/
│   │   └── atm.service.ts     # Shared signal-based state
│   ├── app.component.*        # Shell layout
│   ├── app.config.ts          # provideRouter + withViewTransitions
│   └── app.routes.ts          # Route definitions
├── styles.css                 # Global design system
├── index.html
└── main.ts
```

<br/>

## Design System

Dark terminal aesthetic — evoking a real ATM screen while remaining modern and polished.

```css
:root {
  --bg:       #0a0c0f;     /* Deep black        */
  --surface:  #111318;     /* Card surfaces     */
  --accent:   #00e5a0;     /* Green — withdraw  */
  --warn:     #ff6b35;     /* Orange — errors   */
}
```

Color is semantic: **green** for withdrawals, **purple** for deposits.

<br/>

## Quick Start

```bash
# Prerequisites: Node 18+, Angular CLI 17+
npm install -g @angular/cli

# Clone & run
git clone https://github.com/YOUR_USERNAME/atm-routing-angular.git
cd atm-routing-angular
npm install
ng serve
# → http://localhost:4200
```

```bash
# Production
ng build --configuration production
```

<br/>

## Learning Objectives

- [x] Set up Angular Router with `provideRouter()`
- [x] Define routes using the `Routes` array
- [x] Apply `pathMatch: 'full'` vs default `'prefix'`
- [x] Handle unknown paths with wildcard `**`
- [x] Navigate with `routerLink` and `routerLinkActive`
- [x] Navigate programmatically with `Router.navigate()`
- [x] Share state across routes with an injectable service

<br/>

---

<div align="center">

<sub>MIT © 2024 · Angular 17 · No CSS frameworks · Designed for humans</sub>

</div>