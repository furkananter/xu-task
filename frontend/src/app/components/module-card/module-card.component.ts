import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningModule, ModuleCategory } from '../../types/learning-module';
import { HlmCardImports } from '@app/ui/card';
import { HlmBadge } from '@app/ui/badge';
import { HlmCheckbox } from '@app/ui/checkbox';
import { HlmLabel } from '@app/ui/label';

@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [CommonModule, ...HlmCardImports, HlmBadge, HlmCheckbox, HlmLabel],
  template: `
    <section 
      hlmCard 
      class="relative h-[240px] flex flex-col transition-all duration-300 border border-[var(--glass-border)] hover:-translate-y-1 hover:border-[var(--primary)]/50 hover:bg-[var(--glass-highlight)] hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] overflow-hidden"
      [class.border-l-4]="true"
      [style.border-left-color]="module.completed ? 'var(--accent-green)' : getCategoryColor(module.category)"
      [class.opacity-70]="isUpdating"
      [class.pointer-events-none]="isUpdating">
      
      <!-- Subtle internal glow based on status -->
      <div 
        class="absolute inset-0 pointer-events-none transition-opacity duration-500"
        [class]="module.completed ? 'bg-[var(--accent-green)]/5' : 'bg-transparent'">
      </div>
      
      <div hlmCardHeader class="pb-2">
        <div class="flex justify-between items-center">
          <span 
            hlmBadge 
            variant="outline"
            class="text-xs font-bold uppercase tracking-wide border"
            [class]="getCategoryClass(module.category)">
            {{ getCategoryLabel(module.category) }}
          </span>
          <span class="text-sm text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
            ⏱️ {{ module.estimatedMinutes }}m
          </span>
        </div>
      </div>
      
      <div hlmCardContent class="flex-1">
        <h3 
          class="text-lg font-semibold leading-tight text-foreground"
          [class.text-muted-foreground]="module.completed"
          [class.line-through]="module.completed">
          {{ module.title }}
        </h3>
      </div>
      
      <div hlmCardFooter>
        <label class="flex items-center gap-3 cursor-pointer select-none group">
          <hlm-checkbox 
            [checked]="module.completed"
            [disabled]="isUpdating"
            (checkedChange)="onToggle()">
          </hlm-checkbox>
          <span 
            hlmLabel
            class="text-sm font-medium cursor-pointer transition-colors group-hover:text-primary"
            [class.text-[var(--accent-green)]]="module.completed"
            [class.group-hover:!text-[var(--accent-green)]]="module.completed">
            {{ module.completed ? 'Completed' : 'Mark Complete' }}
          </span>
        </label>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class ModuleCardComponent {
  @Input({ required: true }) module!: LearningModule;
  @Input() isUpdating = false;
  @Output() toggle = new EventEmitter<void>();

  onToggle(): void {
    this.toggle.emit();
  }

  getCategoryLabel(category: ModuleCategory): string {
    const labels: Record<string, string> = {
      'AI': 'Artificial Intelligence',
      'Sustainability': 'Sustainability',
      'DigitalSkills': 'Digital Skills'
    };
    return labels[category] || category;
  }

  getCategoryColor(category: ModuleCategory): string {
    const colors: Record<string, string> = {
      'AI': 'oklch(0.65 0.20 250)', // var(--accent-blue)
      'Sustainability': 'oklch(0.75 0.18 60)', // var(--accent-orange)
      'DigitalSkills': 'oklch(0.65 0.22 290)' // var(--accent-purple)
    };
    return colors[category] || 'var(--border)';
  }

  getCategoryClass(category: ModuleCategory): string {
    const classes: Record<string, string> = {
      'AI': 'border-[var(--accent-blue)] text-[var(--accent-blue)] bg-[var(--accent-blue)]/10',
      'Sustainability': 'border-[var(--accent-orange)] text-[var(--accent-orange)] bg-[var(--accent-orange)]/10',
      'DigitalSkills': 'border-[var(--accent-purple)] text-[var(--accent-purple)] bg-[var(--accent-purple)]/10'
    };
    return classes[category] || '';
  }
}
