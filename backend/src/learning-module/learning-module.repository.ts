import { Injectable, NotFoundException } from '@nestjs/common';
import { ILearningModule, ModuleCategory } from './learning-module.model';
import { SEED_MODULES } from './data';

/**
 * Repository Layer - Handles CRUD operations on in-memory data store.
 */
@Injectable()
export class LearningModuleRepository {
    private modules: ILearningModule[] = [...SEED_MODULES];

    findAll(category?: string): ILearningModule[] {
        if (!category) {
            return [...this.modules];
        }

        const validCategories = Object.values(ModuleCategory);
        if (!validCategories.includes(category as ModuleCategory)) {
            return [];
        }

        return this.modules.filter((module) => module.category === category);
    }

    findById(id: string): ILearningModule | null {
        return this.modules.find((module) => module.id === id) || null;
    }

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

    reset(): void {
        this.modules = [...SEED_MODULES];
    }
}
