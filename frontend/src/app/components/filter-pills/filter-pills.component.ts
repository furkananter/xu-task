import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleCategory } from '../../types/learning-module';

@Component({
    selector: 'app-filter-pills',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="glass-card filter-card">
      <h3>Filter Modules</h3>
      <div class="category-pills">
        <button 
          class="pill" 
          [class.active]="selectedCategory === ''"
          (click)="select('')">
          All
        </button>
        <button 
          class="pill ai" 
          [class.active]="selectedCategory === 'AI'"
          (click)="select('AI')">
          <span class="icon">🤖</span> AI
        </button>
        <button 
          class="pill sust" 
          [class.active]="selectedCategory === 'Sustainability'"
          (click)="select('Sustainability')">
          <span class="icon">🌱</span> Eco
        </button>
        <button 
          class="pill digital" 
          [class.active]="selectedCategory === 'DigitalSkills'"
          (click)="select('DigitalSkills')">
          <span class="icon">💻</span> Tech
        </button>
      </div>
    </div>
  `,
    styles: [`
    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: blur(var(--blur-md));
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 1.5rem;
    }
    
    h3 {
      font-size: 1.1rem;
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .category-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .pill {
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.02);
      color: var(--text-secondary);
      padding: 0.5rem 1rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .pill:hover { background: rgba(255,255,255,0.08); }
    
    .pill.active {
      background: var(--text-primary);
      color: var(--bg-darker);
      border-color: var(--text-primary);
      font-weight: 700;
      transform: scale(1.05);
    }
  `]
})
export class FilterPillsComponent {
    @Input() selectedCategory: ModuleCategory | '' = '';
    @Output() categoryChange = new EventEmitter<ModuleCategory | ''>();

    select(category: ModuleCategory | ''): void {
        this.categoryChange.emit(category);
    }
}
