import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningModuleService } from '../../services/learning-module.service';
import { LearningModule, ProgressStats, ModuleCategory } from '../../types/learning-module';

// Import sub-components
import { ProgressCardComponent } from '../progress-card/progress-card.component';
import { FilterPillsComponent } from '../filter-pills/filter-pills.component';
import { ModuleCardComponent } from '../module-card/module-card.component';

@Component({
    selector: 'app-module-list',
    standalone: true,
    imports: [
        CommonModule,
        ProgressCardComponent,
        FilterPillsComponent,
        ModuleCardComponent
    ],
    template: `
    <div class="main-container">
      <!-- Background Blurs -->
      <div class="glow-blob blob-1"></div>
      <div class="glow-blob blob-2"></div>

      <header class="hero-header">
        <div class="badge">EaaS Platform</div>
        <h1>Learning <span class="gradient-text">Tracker</span></h1>
        <p class="subtitle">Master modules in AI, Sustainability, and Digital Skills.</p>
      </header>
      
      <div class="dashboard-grid">
        <!-- Sidebar / Top Section for Stats -->
        <aside class="stats-section">
          <app-progress-card 
            [progress]="progress()" 
            [loading]="loading()">
          </app-progress-card>

          <app-filter-pills 
            [selectedCategory]="selectedCategory()" 
            (categoryChange)="onCategoryChange($event)">
          </app-filter-pills>
        </aside>

        <!-- Main Content List -->
        <main class="modules-section">
          @if (error()) {
            <div class="glass-card error-card">
              <span class="error-icon">⚠️</span>
              {{ error() }}
            </div>
          }

          @if (loading() && modules().length === 0) {
            <div class="loading-grid">
              <div class="glass-skeleton"></div>
              <div class="glass-skeleton"></div>
              <div class="glass-skeleton"></div>
            </div>
          } @else if (modules().length === 0) {
            <div class="glass-card empty-state">
              <div class="empty-icon">📭</div>
              <p>No modules found in this category.</p>
              <button class="reset-btn" (click)="onCategoryChange('')">Clear Filters</button>
            </div>
          } @else {
            <div class="modules-grid">
              @for (module of modules(); track module.id) {
                <app-module-card 
                  [module]="module" 
                  [isUpdating]="updatingModuleId() === module.id"
                  (toggle)="onToggleCompletion(module)">
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
      position: relative;
    }

    .main-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      position: relative;
      z-index: 1;
    }

    /* Background Ambient Glows */
    .glow-blob {
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      filter: blur(80px);
      z-index: -1;
      opacity: 0.4;
      pointer-events: none;
    }
    .blob-1 { top: -100px; left: -100px; background: radial-gradient(#6366f1, transparent 70%); }
    .blob-2 { bottom: -100px; right: -100px; background: radial-gradient(#a855f7, transparent 70%); }

    /* Typography & Header */
    .hero-header {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeInDown 0.8s ease-out;
    }

    .badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--accent-blue);
      margin-bottom: 1rem;
      backdrop-filter: blur(4px);
    }

    h1 {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .gradient-text {
      background: var(--primary-glow);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: 1.2rem;
    }

    /* Grid Layout */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 2rem;
      align-items: start;
    }

    @media (max-width: 900px) {
      .dashboard-grid { grid-template-columns: 1fr; }
    }

    /* Stats Section */
    .stats-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      position: sticky;
      top: 2rem;
    }

    /* Modules Section */
    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    /* Utility Classes for this component */
    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: blur(var(--blur-md));
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      padding: 1.5rem;
      color: var(--text-primary);
    }

    .error-card {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
      color: #fca5a5;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
    }
    
    .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
    
    .reset-btn {
      margin-top: 1rem;
      background: var(--text-primary);
      color: var(--bg-darker);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .loading-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .glass-skeleton {
      height: 200px;
      background: rgba(255,255,255,0.03);
      border-radius: 20px;
      animation: pulse 1.5s infinite;
    }

    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0% { opacity: 0.5; }
      50% { opacity: 0.8; }
      100% { opacity: 0.5; }
    }
  `]
})
export class ModuleListComponent implements OnInit {
    private readonly learningModuleService = inject(LearningModuleService);

    // State signals
    readonly modules = signal<LearningModule[]>([]);
    readonly progress = signal<ProgressStats | null>(null);
    readonly loading = signal(true);
    readonly error = signal<string | null>(null);
    readonly selectedCategory = signal<ModuleCategory | ''>('');
    readonly updatingModuleId = signal<string | null>(null);

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.loading.set(true);
        this.error.set(null);
        const category = this.selectedCategory() || undefined;

        this.learningModuleService.getModules(category).subscribe({
            next: (modules) => {
                this.modules.set(modules);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Failed to load modules.');
                this.loading.set(false);
            },
        });

        this.learningModuleService.getProgress().subscribe({
            next: (progress) => this.progress.set(progress)
        });
    }

    onCategoryChange(category: ModuleCategory | ''): void {
        this.selectedCategory.set(category);
        this.loadData();
    }

    onToggleCompletion(module: LearningModule): void {
        this.updatingModuleId.set(module.id);
        const newCompletedState = !module.completed;

        // Optimistic Update 1: Update Module List
        this.modules.update((modules) =>
            modules.map((m) => (m.id === module.id ? { ...m, completed: newCompletedState } : m))
        );

        // Optimistic Update 2: Recalculate Progress Immediately
        const allModules = this.modules();
        const total = allModules.length;
        const completed = allModules.filter(m => m.completed).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        this.progress.set({ total, completed, percentage });

        this.learningModuleService.toggleCompletion(module.id, newCompletedState).subscribe({
            next: (updatedModule) => {
                // Confirmation from server (optional: reconcile if needed)
                this.updatingModuleId.set(null);
            },
            error: () => {
                // Rollback on error
                this.modules.update((modules) =>
                    modules.map((m) => (m.id === module.id ? { ...m, completed: !newCompletedState } : m))
                );
                // Rollback progress could be complicated, usually just refetch
                this.updatingModuleId.set(null);
            },
        });
    }
}
