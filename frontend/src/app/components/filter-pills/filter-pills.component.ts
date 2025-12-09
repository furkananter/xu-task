import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleCategory } from '../../types/learning-module';
import { HlmCardImports } from '@app/ui/card';
import { HlmButton } from '@app/ui/button';

@Component({
  selector: 'app-filter-pills',
  standalone: true,
  imports: [CommonModule, ...HlmCardImports, HlmButton],
  template: `
    <div class="flex flex-col gap-4">
      <h3 class="text-lg font-semibold px-1">Filter Modules</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          hlmBtn 
          [variant]="selectedCategory === '' ? 'default' : 'outline'"
          size="sm"
          class="flex-1 border-white/10 hover:bg-white/5"
          (click)="select('')">
          All
        </button>
        <button 
          hlmBtn 
          [variant]="selectedCategory === 'AI' ? 'default' : 'outline'"
          size="sm"
          class="flex-1 gap-1 border-white/10 hover:bg-white/5"
          (click)="select('AI')">
          <span>🤖</span> AI
        </button>
        <button 
          hlmBtn 
          [variant]="selectedCategory === 'Sustainability' ? 'default' : 'outline'"
          size="sm"
          class="flex-1 gap-1 border-white/10 hover:bg-white/5"
          (click)="select('Sustainability')">
          <span>🌱</span> Eco
        </button>
        <button 
          hlmBtn 
          [variant]="selectedCategory === 'DigitalSkills' ? 'default' : 'outline'"
          size="sm"
          class="flex-1 gap-1 border-white/10 hover:bg-white/5"
          (click)="select('DigitalSkills')">
          <span>💻</span> Tech
        </button>
      </div>
    </div>
  `
})
export class FilterPillsComponent {
  @Input() selectedCategory: ModuleCategory | '' = '';
  @Output() categoryChange = new EventEmitter<ModuleCategory | ''>();

  select(category: ModuleCategory | ''): void {
    this.categoryChange.emit(category);
  }
}
