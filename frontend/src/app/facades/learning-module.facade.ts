import { Injectable, inject, signal, computed } from '@angular/core';
import { LearningModuleService } from '../services/learning-module.service';
import { LearningModule, ProgressStats, ModuleCategory } from '../types/learning-module';

/**
 * Facade Service - Manages all state and business logic for learning modules.
 * Components become "dumb" and only display data from this facade.
 */
@Injectable({ providedIn: 'root' })
export class LearningModuleFacade {
    private readonly api = inject(LearningModuleService);

    // === Private State ===
    private readonly _modules = signal<LearningModule[]>([]);
    private readonly _progress = signal<ProgressStats | null>(null);
    private readonly _loading = signal(true);
    private readonly _error = signal<string | null>(null);
    private readonly _selectedCategory = signal<ModuleCategory | ''>('');
    private readonly _updatingModuleId = signal<string | null>(null);

    // === Public Read-Only Signals ===
    readonly modules = this._modules.asReadonly();
    readonly progress = this._progress.asReadonly();
    readonly loading = this._loading.asReadonly();
    readonly error = this._error.asReadonly();
    readonly selectedCategory = this._selectedCategory.asReadonly();
    readonly updatingModuleId = this._updatingModuleId.asReadonly();

    // === Computed ===
    readonly isEmpty = computed(() => !this._loading() && this._modules().length === 0);

    // === Actions ===

    loadData(): void {
        this._loading.set(true);
        this._error.set(null);
        const category = this._selectedCategory() || undefined;

        this.api.getModules(category).subscribe({
            next: (modules) => {
                this._modules.set(modules);
                this._loading.set(false);
            },
            error: () => {
                this._error.set('Failed to load modules.');
                this._loading.set(false);
            },
        });

        this.api.getProgress().subscribe({
            next: (progress) => this._progress.set(progress),
        });
    }

    setCategory(category: ModuleCategory | ''): void {
        this._selectedCategory.set(category);
        this.loadData();
    }

    toggleCompletion(module: LearningModule): void {
        this._updatingModuleId.set(module.id);
        const newCompletedState = !module.completed;

        // Optimistic Update: Modules
        this._modules.update((modules) =>
            modules.map((m) => (m.id === module.id ? { ...m, completed: newCompletedState } : m))
        );

        // Optimistic Update: Progress
        this.recalculateProgress();

        this.api.toggleCompletion(module.id, newCompletedState).subscribe({
            next: () => {
                this._updatingModuleId.set(null);
            },
            error: () => {
                // Rollback on error
                this._modules.update((modules) =>
                    modules.map((m) => (m.id === module.id ? { ...m, completed: !newCompletedState } : m))
                );
                this.recalculateProgress();
                this._updatingModuleId.set(null);
            },
        });
    }

    private recalculateProgress(): void {
        const allModules = this._modules();
        const total = allModules.length;
        const completed = allModules.filter((m) => m.completed).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        this._progress.set({ total, completed, percentage });
    }
}
