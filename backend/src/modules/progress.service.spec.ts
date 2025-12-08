import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressService } from './progress.service';
import { ILearningModule, ModuleCategory } from './learning-module.model';

describe('ProgressService', () => {
    let service: ProgressService;

    beforeEach(() => {
        service = new ProgressService();
    });

    describe('calculateProgress', () => {
        it('should return zeros for an empty module list', () => {
            const result = service.calculateProgress([]);

            expect(result).toEqual({
                total: 0,
                completed: 0,
                percentage: 0,
            });
        });

        it('should return 0% when no modules are completed', () => {
            const modules: ILearningModule[] = [
                { id: '1', title: 'Module 1', category: ModuleCategory.AI, estimatedMinutes: 30, completed: false },
                { id: '2', title: 'Module 2', category: ModuleCategory.AI, estimatedMinutes: 45, completed: false },
                { id: '3', title: 'Module 3', category: ModuleCategory.Sustainability, estimatedMinutes: 20, completed: false },
            ];

            const result = service.calculateProgress(modules);

            expect(result).toEqual({
                total: 3,
                completed: 0,
                percentage: 0,
            });
        });

        it('should return 100% when all modules are completed', () => {
            const modules: ILearningModule[] = [
                { id: '1', title: 'Module 1', category: ModuleCategory.AI, estimatedMinutes: 30, completed: true },
                { id: '2', title: 'Module 2', category: ModuleCategory.Sustainability, estimatedMinutes: 45, completed: true },
            ];

            const result = service.calculateProgress(modules);

            expect(result).toEqual({
                total: 2,
                completed: 2,
                percentage: 100,
            });
        });

        it('should calculate correct percentage for partial completion', () => {
            const modules: ILearningModule[] = [
                { id: '1', title: 'Module 1', category: ModuleCategory.AI, estimatedMinutes: 30, completed: true },
                { id: '2', title: 'Module 2', category: ModuleCategory.Sustainability, estimatedMinutes: 45, completed: false },
                { id: '3', title: 'Module 3', category: ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: true },
                { id: '4', title: 'Module 4', category: ModuleCategory.AI, estimatedMinutes: 25, completed: false },
            ];

            const result = service.calculateProgress(modules);

            expect(result).toEqual({
                total: 4,
                completed: 2,
                percentage: 50,
            });
        });

        it('should round percentage to nearest integer', () => {
            const modules: ILearningModule[] = [
                { id: '1', title: 'Module 1', category: ModuleCategory.AI, estimatedMinutes: 30, completed: true },
                { id: '2', title: 'Module 2', category: ModuleCategory.AI, estimatedMinutes: 45, completed: false },
                { id: '3', title: 'Module 3', category: ModuleCategory.AI, estimatedMinutes: 20, completed: false },
            ];

            const result = service.calculateProgress(modules);

            // 1/3 = 33.33... should round to 33
            expect(result.percentage).toBe(33);
        });

        it('should handle a single completed module', () => {
            const modules: ILearningModule[] = [
                { id: '1', title: 'Single Module', category: ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: true },
            ];

            const result = service.calculateProgress(modules);

            expect(result).toEqual({
                total: 1,
                completed: 1,
                percentage: 100,
            });
        });

        it('should handle a single uncompleted module', () => {
            const modules: ILearningModule[] = [
                { id: '1', title: 'Single Module', category: ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: false },
            ];

            const result = service.calculateProgress(modules);

            expect(result).toEqual({
                total: 1,
                completed: 0,
                percentage: 0,
            });
        });

        it('should work with modules of different categories', () => {
            const modules: ILearningModule[] = [
                { id: '1', title: 'AI Module', category: ModuleCategory.AI, estimatedMinutes: 30, completed: true },
                { id: '2', title: 'Sustainability Module', category: ModuleCategory.Sustainability, estimatedMinutes: 45, completed: true },
                { id: '3', title: 'Digital Skills Module', category: ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: false },
            ];

            const result = service.calculateProgress(modules);

            expect(result).toEqual({
                total: 3,
                completed: 2,
                percentage: 67, // 2/3 = 66.67, rounds to 67
            });
        });

        it('should handle modules with various estimatedMinutes values', () => {
            const modules: ILearningModule[] = [
                { id: '1', title: 'Quick Module', category: ModuleCategory.AI, estimatedMinutes: 0, completed: true },
                { id: '2', title: 'Long Module', category: ModuleCategory.AI, estimatedMinutes: 999, completed: true },
                { id: '3', title: 'Normal Module', category: ModuleCategory.AI, estimatedMinutes: 30, completed: false },
            ];

            const result = service.calculateProgress(modules);

            // Progress calculation should not depend on estimatedMinutes
            expect(result).toEqual({
                total: 3,
                completed: 2,
                percentage: 67,
            });
        });
    });
});
