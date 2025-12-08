import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { LearningModuleResolver } from './learning-module.resolver';
import { LearningModuleDataService } from './learning-module-data.service';
import { ProgressService } from './progress.service';
import { ModuleCategory, ILearningModule } from './learning-module.model';

describe('LearningModuleResolver', () => {
    let resolver: LearningModuleResolver;
    let dataService: LearningModuleDataService;
    let progressService: ProgressService;

    const mockModules: ILearningModule[] = [
        { id: '1', title: 'Test Module 1', category: ModuleCategory.AI, estimatedMinutes: 30, completed: false },
        { id: '2', title: 'Test Module 2', category: ModuleCategory.Sustainability, estimatedMinutes: 45, completed: true },
        { id: '3', title: 'Test Module 3', category: ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: false },
    ];

    beforeEach(() => {
        dataService = new LearningModuleDataService();
        progressService = new ProgressService();
        resolver = new LearningModuleResolver(dataService, progressService);
    });

    describe('getModules', () => {
        it('should return all modules when no category is provided', () => {
            const modules = resolver.getModules();

            expect(modules).toHaveLength(8); // Default seed data has 8 modules
            expect(Array.isArray(modules)).toBe(true);
        });

        it('should return filtered modules when category is provided', () => {
            const modules = resolver.getModules('AI');

            expect(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                expect(module.category).toBe(ModuleCategory.AI);
            });
        });

        it('should return empty array for invalid category', () => {
            const modules = resolver.getModules('InvalidCategory');

            expect(modules).toEqual([]);
        });

        it('should return Sustainability modules correctly', () => {
            const modules = resolver.getModules('Sustainability');

            expect(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                expect(module.category).toBe(ModuleCategory.Sustainability);
            });
        });

        it('should return DigitalSkills modules correctly', () => {
            const modules = resolver.getModules('DigitalSkills');

            expect(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                expect(module.category).toBe(ModuleCategory.DigitalSkills);
            });
        });
    });

    describe('toggleModuleCompletion', () => {
        it('should toggle module completion to true', () => {
            const result = resolver.toggleModuleCompletion('1', true);

            expect(result.id).toBe('1');
            expect(result.completed).toBe(true);
        });

        it('should toggle module completion to false', () => {
            // First set to true
            resolver.toggleModuleCompletion('1', true);

            // Then set to false
            const result = resolver.toggleModuleCompletion('1', false);

            expect(result.id).toBe('1');
            expect(result.completed).toBe(false);
        });

        it('should throw NotFoundException for non-existent module', () => {
            expect(() => resolver.toggleModuleCompletion('non-existent', true))
                .toThrow(NotFoundException);
        });

        it('should return the updated module with all properties', () => {
            const result = resolver.toggleModuleCompletion('1', true);

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('title');
            expect(result).toHaveProperty('category');
            expect(result).toHaveProperty('estimatedMinutes');
            expect(result).toHaveProperty('completed');
        });

        it('should persist the completion status change', () => {
            resolver.toggleModuleCompletion('1', true);

            const modules = resolver.getModules();
            const updatedModule = modules.find((m) => m.id === '1');

            expect(updatedModule?.completed).toBe(true);
        });
    });

    describe('getProgress', () => {
        it('should return progress statistics', () => {
            const progress = resolver.getProgress();

            expect(progress).toHaveProperty('total');
            expect(progress).toHaveProperty('completed');
            expect(progress).toHaveProperty('percentage');
        });

        it('should return correct initial progress (no modules completed)', () => {
            dataService.reset();
            const progress = resolver.getProgress();

            expect(progress.total).toBe(8);
            expect(progress.completed).toBe(0);
            expect(progress.percentage).toBe(0);
        });

        it('should update progress when modules are completed', () => {
            dataService.reset();
            resolver.toggleModuleCompletion('1', true);
            resolver.toggleModuleCompletion('2', true);

            const progress = resolver.getProgress();

            expect(progress.total).toBe(8);
            expect(progress.completed).toBe(2);
            expect(progress.percentage).toBe(25);
        });

        it('should calculate progress using ProgressService', () => {
            const progressSpy = vi.spyOn(progressService, 'calculateProgress');

            resolver.getProgress();

            expect(progressSpy).toHaveBeenCalled();
            expect(progressSpy).toHaveBeenCalledWith(expect.any(Array));
        });
    });
});
