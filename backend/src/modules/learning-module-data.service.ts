import { Injectable, NotFoundException } from '@nestjs/common';
import { ILearningModule, ModuleCategory } from './learning-module.model';
import { SEED_MODULES } from './learning-module.data';

/**
 * Data Service Layer (Layer 2)
 * Responsible for CRUD operations on the in-memory data store.
 * This service manages data persistence but contains no business logic.
 */
@Injectable()
export class LearningModuleDataService {
    private modules: ILearningModule[] = [...SEED_MODULES];

    /**
     * Returns all modules, optionally filtered by category
     * @param category - Optional category filter
     * @returns Array of learning modules
     */
    findAll(category?: string): ILearningModule[] {
        if (!category) {
            return [...this.modules];
        }

        // Validate category
        const validCategories = Object.values(ModuleCategory);
        if (!validCategories.includes(category as ModuleCategory)) {
            return [];
        }

        return this.modules.filter((module) => module.category === category);
    }

    /**
     * Finds a module by its ID
     * @param id - The module ID
     * @returns The module or null if not found
     */
    findById(id: string): ILearningModule | null {
        return this.modules.find((module) => module.id === id) || null;
    }

    /**
     * Updates the completion status of a module
     * @param id - The module ID
     * @param completed - The new completion status
     * @returns The updated module
     * @throws NotFoundException if module doesn't exist
     */
    updateCompletion(id: string, completed: boolean): ILearningModule {
        const moduleIndex = this.modules.findIndex((module) => module.id === id);

        if (moduleIndex === -1) {
            throw new NotFoundException(`Module with ID "${id}" not found`);
        }

        this.modules[moduleIndex] = {
            ...this.modules[moduleIndex],
            completed,
        };

        return { ...this.modules[moduleIndex] };
    }

    /**
     * Resets all modules to their initial state (useful for testing)
     */
    reset(): void {
        this.modules = [...SEED_MODULES];
    }
}
