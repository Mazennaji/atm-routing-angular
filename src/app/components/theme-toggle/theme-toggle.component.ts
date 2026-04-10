import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button class="theme-toggle" (click)="theme.toggle()" [attr.aria-label]="theme.isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
      <span class="toggle-track">
        <span class="toggle-icon sun">☀</span>
        <span class="toggle-icon moon">☾</span>
        <span class="toggle-thumb" [class.light]="!theme.isDark()"></span>
      </span>
    </button>
  `,
  styles: [`
    .theme-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
    }

    .toggle-track {
      position: relative;
      width: 52px;
      height: 28px;
      background: var(--surface-2, #161920);
      border: 1px solid var(--border, #1e2028);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 6px;
      transition: background 0.3s, border-color 0.3s;
    }

    .toggle-icon {
      font-size: 13px;
      z-index: 1;
      transition: opacity 0.3s;
    }

    .sun { color: #fbbf24; }
    .moon { color: #a78bfa; }

    .toggle-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      background: var(--accent, #00e5a0);
      border-radius: 50%;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s;
      box-shadow: 0 2px 8px rgba(0, 229, 160, 0.3);
    }

    .toggle-thumb.light {
      transform: translateX(24px);
      background: #fbbf24;
      box-shadow: 0 2px 8px rgba(251, 191, 36, 0.3);
    }

    .theme-toggle:hover .toggle-track {
      border-color: var(--border-light, #2a2d38);
    }
  `],
})
export class ThemeToggleComponent {
  constructor(public theme: ThemeService) {}
}