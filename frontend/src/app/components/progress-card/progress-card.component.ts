import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressStats } from '../../types/learning-module';

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="glass-card progress-card" [class.loading]="loading()">
      @if (progress()) {
        <div class="progress-ring-wrapper">
          <svg class="progress-ring" width="120" height="120">
            <defs>
              <linearGradient [id]="gradientId()" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" [style.stop-color]="startColor()" />
                <stop offset="100%" [style.stop-color]="endColor()" />
              </linearGradient>
            </defs>
            <circle class="progress-ring__circle-bg" stroke="rgba(255,255,255,0.1)" stroke-width="8" fill="transparent" r="52" cx="60" cy="60"/>
            <circle class="progress-ring__circle" 
              [attr.stroke]="gradientUrl()" 
              stroke-width="8" 
              fill="transparent" 
              r="52" cx="60" cy="60"
              [style.stroke-dashoffset.px]="dashOffset()"
              stroke-dasharray="326.726"/>
          </svg>
          <div class="progress-value">
            <span class="number">{{ progress()!.percentage }}%</span>
          </div>
        </div>
        <div class="progress-info">
          <h3>Overall Progress</h3>
          <p>{{ progress()!.completed }} / {{ progress()!.total }} Modules Completed</p>
        </div>
      } @else {
        <div class="skeleton-ring"></div>
      }
    </div>
  `,
  styles: [`
    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: blur(var(--blur-md));
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
      transition: all 0.3s var(--ease-spring);
    }
    
    .progress-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
    }

    .progress-ring-wrapper {
      position: relative;
      margin-bottom: 1rem;
    }
    .progress-ring { transform: rotate(-90deg); }
    .progress-ring__circle { transition: stroke-dashoffset 0.5s ease-out, stroke 0.3s ease; }
    
    .progress-value {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--text-primary);
    }
    
    .progress-info h3 { font-size: 1.1rem; margin-bottom: 0.25rem; }
    .progress-info p { font-size: 0.9rem; color: var(--text-secondary); }
    
    .skeleton-ring {
      width: 120px; height: 120px;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
      0% { opacity: 0.5; }
      50% { opacity: 0.8; }
      100% { opacity: 0.5; }
    }
  `]
})
export class ProgressCardComponent {
  progress = input<ProgressStats | null>(null);
  loading = input<boolean>(false);

  // Computed: unique gradient ID forces SVG re-render
  readonly gradientId = computed(() => {
    const pct = this.progress()?.percentage ?? 0;
    return 'progressGradient' + pct;
  });

  readonly gradientUrl = computed(() => {
    return 'url(#' + this.gradientId() + ')';
  });

  readonly dashOffset = computed(() => {
    const p = this.progress();
    if (!p) return 326.726;
    const circumference = 326.726;
    return circumference - (p.percentage / 100) * circumference;
  });

  readonly startColor = computed(() => {
    const pct = this.progress()?.percentage ?? 0;
    if (pct === 100) return '#4ade80';
    if (pct >= 50) return '#6366f1';
    return '#f472b6';
  });

  readonly endColor = computed(() => {
    const pct = this.progress()?.percentage ?? 0;
    if (pct === 100) return '#22c55e';
    if (pct >= 50) return '#a855f7';
    return '#ef4444';
  });
}
