import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningModuleFacade } from '../../facades/learning-module.facade';
import { ModuleCategory } from '../../types/learning-module';

// Sub-components
import { ProgressCardComponent } from '../progress-card/progress-card.component';
import { FilterPillsComponent } from '../filter-pills/filter-pills.component';
import { ModuleCardComponent } from '../module-card/module-card.component';

// Spartan UI
import { HlmCardImports } from '@app/ui/card';
import { HlmButton } from '@app/ui/button';
import { HlmBadge } from '@app/ui/badge';

/**
 * Module List Component - "Dumb" Presentation Component.
 * All state and logic is delegated to the LearningModuleFacade.
 */
@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [
    CommonModule,
    ProgressCardComponent,
    FilterPillsComponent,
    ModuleCardComponent,
    ...HlmCardImports,
    HlmButton,
    HlmBadge
  ],
  template: `
    <div class="max-w-6xl mx-auto px-4 py-8 relative z-10">
      <!-- Header -->
      <header class="text-center mb-12 animate-fade-in">
        <span 
          hlmBadge 
          variant="outline" 
          class="mb-4 text-primary border-primary/30 bg-primary/5">
          EaaS Platform
        </span>
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-2 text-foreground">
          Learning <span class="bg-gradient-to-r from-primary to-[#D946EF] bg-clip-text text-transparent">Tracker</span>
        </h1>
        <p class="text-lg text-muted-foreground">
          Master modules in AI, Sustainability, and Digital Skills.
        </p>
      </header>
      
      <div class="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 items-start">
        <!-- Sidebar -->
        <aside class="flex flex-col gap-6 lg:sticky lg:top-8">
          <app-progress-card 
            [progress]="facade.progress()" 
            [loading]="facade.loading()">
          </app-progress-card>

          <app-filter-pills 
            [selectedCategory]="facade.selectedCategory()" 
            (categoryChange)="onCategoryChange($event)">
          </app-filter-pills>
        </aside>

        <!-- Main Content -->
        <main>
          @if (facade.error()) {
            <section hlmCard class="border-destructive bg-destructive/5 flex items-center gap-4 mb-8 p-4">
              <span class="text-2xl">⚠️</span>
              <span class="text-destructive font-medium">{{ facade.error() }}</span>
            </section>
          }

          @if (facade.loading() && facade.modules().length === 0) {
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="h-48 rounded-xl bg-secondary animate-pulse"></div>
              <div class="h-48 rounded-xl bg-secondary animate-pulse"></div>
              <div class="h-48 rounded-xl bg-secondary animate-pulse"></div>
              <div class="h-48 rounded-xl bg-secondary animate-pulse"></div>
            </div>
          } @else if (facade.isEmpty()) {
            <section hlmCard class="text-center py-16 px-6">
              <div class="text-6xl mb-6 opacity-80">📭</div>
              <h3 class="text-xl font-semibold mb-2 text-foreground">No modules found</h3>
              <p class="text-muted-foreground mb-6">No modules match your current category filter.</p>
              <button hlmBtn variant="secondary" (click)="onCategoryChange('')">
                Clear Filters
              </button>
            </section>
          } @else {
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              @for (module of facade.modules(); track module.id) {
                <app-module-card 
                  [module]="module" 
                  [isUpdating]="facade.updatingModuleId() === module.id"
                  (toggle)="onToggle(module)">
                </app-module-card>
              }
            </div>
          }
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .animate-fade-in {
      animation: fadeIn 0.8s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ModuleListComponent implements OnInit {
  readonly facade = inject(LearningModuleFacade);

  ngOnInit(): void {
    this.facade.loadData();
  }

  onCategoryChange(category: ModuleCategory | ''): void {
    this.facade.setCategory(category);
  }

  onToggle(module: { id: string; completed: boolean }): void {
    this.facade.toggleCompletion(module as any);
  }
}
