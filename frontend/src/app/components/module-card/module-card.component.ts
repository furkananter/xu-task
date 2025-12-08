import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningModule, ModuleCategory } from '../../types/learning-module';

@Component({
    selector: 'app-module-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div 
      class="glass-card module-item" 
      [class.completed]="module.completed"
      [class.updating]="isUpdating">
      
      <div class="module-status-line"></div>
      
      <div class="module-main">
        <div class="module-header">
          <span class="category-tag" [attr.data-category]="module.category">
            {{ getCategoryLabel(module.category) }}
          </span>
          <span class="duration-tag">
            ⏱️ {{ module.estimatedMinutes }}m
          </span>
        </div>
        
        <h3>{{ module.title }}</h3>
        
        <div class="module-footer">
          <label class="custom-checkbox">
            <input 
              type="checkbox" 
              [checked]="module.completed"
              [disabled]="isUpdating"
              (change)="onToggle()">
            <span class="checkmark"></span>
            <span class="checkbox-text">
              {{ module.completed ? 'Completed' : 'Mark Complete' }}
            </span>
          </label>
        </div>
      </div>
      
      <!-- Glossy overlay effect -->
      <div class="shine"></div>
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
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      height: 100%;
    }

    .module-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 180px;
      cursor: default;
    }

    .module-item:hover {
      transform: translateY(-5px) scale(1.02);
      border-color: var(--glass-highlight);
      box-shadow: var(--glass-shadow);
      background: rgba(255,255,255,0.07);
    }

    .module-status-line {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--text-secondary), transparent);
      opacity: 0.3;
      transition: opacity 0.3s;
    }

    .module-item.completed .module-status-line {
      background: var(--accent-green);
      opacity: 1;
      box-shadow: 0 0 10px var(--accent-green);
    }
    
    .module-main {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .module-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .category-tag {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      background: rgba(255,255,255,0.1);
    }

    .category-tag[data-category="AI"] { color: var(--accent-blue); background: rgba(56, 189, 248, 0.15); }
    .category-tag[data-category="Sustainability"] { color: var(--accent-green); background: rgba(74, 222, 128, 0.15); }
    .category-tag[data-category="DigitalSkills"] { color: var(--accent-purple); background: rgba(192, 132, 252, 0.15); }

    .duration-tag {
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    h3 {
      font-size: 1.25rem;
      line-height: 1.4;
      margin-bottom: 2rem;
      flex-grow: 1;
      color: var(--text-primary);
    }

    .module-item.completed h3 {
      color: var(--text-muted);
      text-decoration: line-through;
    }
    
    .module-item.updating {
        opacity: 0.7;
        pointer-events: none;
    }

    /* Custom Checkbox */
    .custom-checkbox {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      user-select: none;
    }

    .custom-checkbox input { display: none; }

    .checkmark {
      width: 24px;
      height: 24px;
      border: 2px solid var(--text-secondary);
      border-radius: 6px;
      position: relative;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .custom-checkbox:hover .checkmark { border-color: var(--text-primary); }

    .custom-checkbox input:checked ~ .checkmark {
      background: var(--accent-green);
      border-color: var(--accent-green);
      box-shadow: 0 0 10px rgba(74, 222, 128, 0.4);
    }

    .checkmark::after {
      content: '';
      position: absolute;
      left: 7px;
      top: 3px;
      width: 6px;
      height: 12px;
      border: solid var(--bg-darker);
      border-width: 0 2px 2px 0;
      transform: rotate(45deg) scale(0);
      transition: transform 0.2s;
    }

    .custom-checkbox input:checked ~ .checkmark::after { transform: rotate(45deg) scale(1); }

    .checkbox-text {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      transition: color 0.2s;
    }

    .custom-checkbox input:checked ~ .checkbox-text {
      color: var(--accent-green);
    }

    /* Shine Effect */
    .shine {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
      transform: translateX(-100%);
      transition: 0.5s;
      pointer-events: none;
    }

    .module-item:hover .shine { transform: translateX(100%); }
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
}
