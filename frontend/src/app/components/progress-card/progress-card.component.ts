import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressStats } from '../../types/learning-module';
import { HlmCardImports } from '@app/ui/card';

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [CommonModule, ...HlmCardImports],
  template: `
    <section hlmCard class="text-center border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md" [class.animate-pulse]="loading()">
      @if (progress(); as p) {
        <div class="p-6">
          <div class="relative w-[120px] h-[120px] mx-auto mb-4">
            <!-- Custom SVG Ring for the circular progress -->
            <svg class="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <defs>
                <linearGradient [id]="gradientId()" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" [style.stop-color]="startColor()" />
                  <stop offset="100%" [style.stop-color]="endColor()" />
                </linearGradient>
              </defs>
              <circle 
                class="stroke-[var(--input)]" 
                stroke-width="8" 
                fill="transparent" 
                r="52" 
                cx="60" 
                cy="60"/>
              <circle 
                [attr.stroke]="gradientUrl()" 
                stroke-width="8" 
                fill="transparent" 
                r="52" 
                cx="60" 
                cy="60"
                stroke-linecap="round"
                [style.stroke-dasharray]="'326.726'"
                [style.stroke-dashoffset.px]="dashOffset()"
                class="transition-all duration-500 ease-out"/>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-xl font-extrabold text-foreground">{{ p.percentage }}%</span>
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-1">Overall Progress</h3>
          <p class="text-sm text-muted-foreground">
            {{ p.completed }} / {{ p.total }} Modules Completed
          </p>
        </div>
      } @else {
        <div class="p-6">
          <div class="w-[120px] h-[120px] mx-auto rounded-full bg-secondary"></div>
          <div class="h-4 w-24 mx-auto mt-4 bg-secondary rounded"></div>
        </div>
      }
    </section>
  `
})
export class ProgressCardComponent {
  progress = input<ProgressStats | null>(null);
  loading = input<boolean>(false);

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
    if (pct === 100) return 'var(--accent-green)';
    if (pct >= 50) return 'var(--accent-blue)';
    return 'var(--destructive)';
  });

  readonly endColor = computed(() => {
    const pct = this.progress()?.percentage ?? 0;
    if (pct === 100) return 'oklch(0.65 0.20 145)'; // Subtle green variation
    if (pct >= 50) return 'var(--accent-purple)';
    return 'oklch(0.65 0.22 25)'; // Subtle red variation
  });
}
