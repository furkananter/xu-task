import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearningModuleService } from '../../services/learning-module.service';
import { LearningModule, ProgressStats, ModuleCategory } from '../../types/learning-module';

/**
 * Module List Component
 * 
 * Displays all learning modules with:
 * - Progress summary showing completion percentage
 * - Optional category filter dropdown
 * - Toggle completion functionality for each module
 */
@Component({
    selector: 'app-module-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container">
      <header class="header">
        <h1>📚 Learning Module Tracker</h1>
        <p class="subtitle">Track your learning progress across AI, Sustainability, and Digital Skills</p>
      </header>

      <!-- Progress Summary -->
      <div class="progress-card" [class.loading]="loading()">
        @if (progress()) {
          <div class="progress-content">
            <div class="progress-stats">
              <span class="progress-number">{{ progress()!.completed }}</span>
              <span class="progress-label">of {{ progress()!.total }} modules completed</span>
            </div>
            <div class="progress-bar-container">
              <div 
                class="progress-bar" 
                [style.width.%]="progress()!.percentage"
                [class.complete]="progress()!.percentage === 100">
              </div>
            </div>
            <div class="progress-percentage">{{ progress()!.percentage }}%</div>
          </div>
        } @else {
          <div class="loading-text">Loading progress...</div>
        }
      </div>

      <!-- Category Filter -->
      <div class="filter-section">
        <label for="category-filter">Filter by Category:</label>
        <select 
          id="category-filter" 
          [ngModel]="selectedCategory()" 
          (ngModelChange)="onCategoryChange($event)"
          class="category-select">
          <option value="">All Categories</option>
          <option value="AI">🤖 AI</option>
          <option value="Sustainability">🌱 Sustainability</option>
          <option value="DigitalSkills">💻 Digital Skills</option>
        </select>
      </div>

      <!-- Error State -->
      @if (error()) {
        <div class="error-message">
          <span>⚠️ {{ error() }}</span>
        </div>
      }

      <!-- Module List -->
      <div class="module-list">
        @if (loading() && modules().length === 0) {
          <div class="loading-card">
            <div class="loading-spinner"></div>
            <span>Loading modules...</span>
          </div>
        } @else if (modules().length === 0) {
          <div class="empty-state">
            <span>📭</span>
            <p>No modules found{{ selectedCategory() ? ' in this category' : '' }}</p>
          </div>
        } @else {
          @for (module of modules(); track module.id) {
            <div 
              class="module-card" 
              [class.completed]="module.completed"
              [class.updating]="updatingModuleId() === module.id">
              <div class="module-checkbox">
                <input 
                  type="checkbox" 
                  [id]="'module-' + module.id"
                  [checked]="module.completed"
                  [disabled]="updatingModuleId() === module.id"
                  (change)="onToggleCompletion(module)"
                  class="checkbox">
                <label [for]="'module-' + module.id" class="checkbox-label">
                  <span class="checkmark">✓</span>
                </label>
              </div>
              <div class="module-content">
                <h3 class="module-title">{{ module.title }}</h3>
                <div class="module-meta">
                  <span class="category-badge" [attr.data-category]="module.category">
                    {{ getCategoryIcon(module.category) }} {{ getCategoryLabel(module.category) }}
                  </span>
                  <span class="duration">
                    ⏱️ {{ module.estimatedMinutes }} min
                  </span>
                </div>
              </div>
              <div class="module-status">
                @if (module.completed) {
                  <span class="status-complete">✅ Completed</span>
                } @else {
                  <span class="status-pending">⏳ Pending</span>
                }
              </div>
            </div>
          }
        }
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      padding: 2rem;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    h1 {
      color: #fff;
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: #a0aec0;
      font-size: 1.1rem;
      margin: 0;
    }

    .progress-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .progress-card:hover {
      border-color: rgba(102, 126, 234, 0.5);
    }

    .progress-card.loading {
      opacity: 0.7;
    }

    .progress-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .progress-stats {
      flex-shrink: 0;
    }

    .progress-number {
      font-size: 2rem;
      font-weight: 700;
      color: #667eea;
    }

    .progress-label {
      color: #a0aec0;
      font-size: 0.9rem;
      margin-left: 0.5rem;
    }

    .progress-bar-container {
      flex: 1;
      height: 12px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 6px;
      transition: width 0.5s ease;
    }

    .progress-bar.complete {
      background: linear-gradient(90deg, #48bb78 0%, #38a169 100%);
    }

    .progress-percentage {
      font-size: 1.25rem;
      font-weight: 600;
      color: #fff;
      min-width: 50px;
      text-align: right;
    }

    .filter-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .filter-section label {
      color: #a0aec0;
      font-size: 0.9rem;
    }

    .category-select {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 0.5rem 1rem;
      color: #fff;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .category-select:hover {
      border-color: #667eea;
    }

    .category-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
    }

    .category-select option {
      background: #1a1a2e;
      color: #fff;
    }

    .error-message {
      background: rgba(245, 101, 101, 0.2);
      border: 1px solid #f56565;
      border-radius: 8px;
      padding: 1rem;
      color: #f56565;
      margin-bottom: 1.5rem;
    }

    .module-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .module-card {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
    }

    .module-card:hover {
      transform: translateY(-2px);
      border-color: rgba(102, 126, 234, 0.5);
      box-shadow: 0 10px 40px rgba(102, 126, 234, 0.2);
    }

    .module-card.completed {
      border-color: rgba(72, 187, 120, 0.3);
      background: rgba(72, 187, 120, 0.05);
    }

    .module-card.updating {
      opacity: 0.7;
      pointer-events: none;
    }

    .module-checkbox {
      position: relative;
    }

    .checkbox {
      position: absolute;
      opacity: 0;
      width: 24px;
      height: 24px;
      cursor: pointer;
      z-index: 1;
    }

    .checkbox-label {
      width: 24px;
      height: 24px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      background: transparent;
    }

    .checkbox:checked + .checkbox-label {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      border-color: transparent;
    }

    .checkbox:focus + .checkbox-label {
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
    }

    .checkmark {
      color: white;
      font-size: 14px;
      opacity: 0;
      transform: scale(0);
      transition: all 0.2s ease;
    }

    .checkbox:checked + .checkbox-label .checkmark {
      opacity: 1;
      transform: scale(1);
    }

    .module-content {
      flex: 1;
    }

    .module-title {
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .module-card.completed .module-title {
      text-decoration: line-through;
      color: #a0aec0;
    }

    .module-meta {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .category-badge {
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      background: rgba(102, 126, 234, 0.2);
      color: #667eea;
    }

    .category-badge[data-category="AI"] {
      background: rgba(99, 179, 237, 0.2);
      color: #63b3ed;
    }

    .category-badge[data-category="Sustainability"] {
      background: rgba(72, 187, 120, 0.2);
      color: #48bb78;
    }

    .category-badge[data-category="DigitalSkills"] {
      background: rgba(159, 122, 234, 0.2);
      color: #9f7aea;
    }

    .duration {
      font-size: 0.8rem;
      color: #718096;
    }

    .module-status {
      font-size: 0.8rem;
    }

    .status-complete {
      color: #48bb78;
    }

    .status-pending {
      color: #a0aec0;
    }

    .loading-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      color: #a0aec0;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-text {
      color: #a0aec0;
      text-align: center;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #a0aec0;
    }

    .empty-state span {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }

    @media (max-width: 640px) {
      :host {
        padding: 1rem;
      }

      h1 {
        font-size: 1.75rem;
      }

      .progress-content {
        flex-direction: column;
        text-align: center;
      }

      .progress-percentage {
        text-align: center;
      }

      .module-card {
        flex-direction: column;
        align-items: flex-start;
      }

      .module-status {
        align-self: flex-end;
      }
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

    /**
     * Loads modules and progress data
     */
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
                this.error.set('Failed to load modules. Please try again.');
                this.loading.set(false);
                console.error('Error loading modules:', err);
            },
        });

        this.learningModuleService.getProgress().subscribe({
            next: (progress) => {
                this.progress.set(progress);
            },
            error: (err) => {
                console.error('Error loading progress:', err);
            },
        });
    }

    /**
     * Handles category filter change
     */
    onCategoryChange(category: ModuleCategory | ''): void {
        this.selectedCategory.set(category);
        this.loadData();
    }

    /**
     * Handles module completion toggle
     */
    onToggleCompletion(module: LearningModule): void {
        this.updatingModuleId.set(module.id);

        this.learningModuleService.toggleCompletion(module.id, !module.completed).subscribe({
            next: (updatedModule) => {
                // Update local state
                this.modules.update((modules) =>
                    modules.map((m) => (m.id === updatedModule.id ? updatedModule : m))
                );
                this.updatingModuleId.set(null);
            },
            error: (err) => {
                this.error.set('Failed to update module. Please try again.');
                this.updatingModuleId.set(null);
                console.error('Error toggling completion:', err);
            },
        });
    }

    /**
     * Returns the icon for a category
     */
    getCategoryIcon(category: ModuleCategory): string {
        switch (category) {
            case 'AI':
                return '🤖';
            case 'Sustainability':
                return '🌱';
            case 'DigitalSkills':
                return '💻';
            default:
                return '📚';
        }
    }

    /**
     * Returns the display label for a category
     */
    getCategoryLabel(category: ModuleCategory): string {
        switch (category) {
            case 'AI':
                return 'AI';
            case 'Sustainability':
                return 'Sustainability';
            case 'DigitalSkills':
                return 'Digital Skills';
            default:
                return category;
        }
    }
}
