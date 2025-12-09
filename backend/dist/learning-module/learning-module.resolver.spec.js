"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const common_1 = require("@nestjs/common");
const learning_module_resolver_1 = require("./learning-module.resolver");
const learning_module_repository_1 = require("./learning-module.repository");
const progress_service_1 = require("./progress.service");
const learning_module_model_1 = require("./learning-module.model");
(0, vitest_1.describe)('LearningModuleResolver', () => {
    let resolver;
    let repository;
    let progressService;
    const mockModules = [
        { id: '1', title: 'Test Module 1', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 30, completed: false },
        { id: '2', title: 'Test Module 2', category: learning_module_model_1.ModuleCategory.Sustainability, estimatedMinutes: 45, completed: true },
        { id: '3', title: 'Test Module 3', category: learning_module_model_1.ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: false },
    ];
    (0, vitest_1.beforeEach)(() => {
        repository = new learning_module_repository_1.LearningModuleRepository();
        progressService = new progress_service_1.ProgressService();
        resolver = new learning_module_resolver_1.LearningModuleResolver(repository, progressService);
    });
    (0, vitest_1.describe)('getModules', () => {
        (0, vitest_1.it)('should return all modules when no category is provided', () => {
            const modules = resolver.getModules();
            (0, vitest_1.expect)(modules).toHaveLength(8);
            (0, vitest_1.expect)(Array.isArray(modules)).toBe(true);
        });
        (0, vitest_1.it)('should return filtered modules when category is provided', () => {
            const modules = resolver.getModules('AI');
            (0, vitest_1.expect)(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                (0, vitest_1.expect)(module.category).toBe(learning_module_model_1.ModuleCategory.AI);
            });
        });
        (0, vitest_1.it)('should return empty array for invalid category', () => {
            const modules = resolver.getModules('InvalidCategory');
            (0, vitest_1.expect)(modules).toEqual([]);
        });
        (0, vitest_1.it)('should return Sustainability modules correctly', () => {
            const modules = resolver.getModules('Sustainability');
            (0, vitest_1.expect)(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                (0, vitest_1.expect)(module.category).toBe(learning_module_model_1.ModuleCategory.Sustainability);
            });
        });
        (0, vitest_1.it)('should return DigitalSkills modules correctly', () => {
            const modules = resolver.getModules('DigitalSkills');
            (0, vitest_1.expect)(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                (0, vitest_1.expect)(module.category).toBe(learning_module_model_1.ModuleCategory.DigitalSkills);
            });
        });
    });
    (0, vitest_1.describe)('toggleModuleCompletion', () => {
        (0, vitest_1.it)('should toggle module completion to true', () => {
            const result = resolver.toggleModuleCompletion({ id: '1', completed: true });
            (0, vitest_1.expect)(result.id).toBe('1');
            (0, vitest_1.expect)(result.completed).toBe(true);
        });
        (0, vitest_1.it)('should toggle module completion to false', () => {
            resolver.toggleModuleCompletion({ id: '1', completed: true });
            const result = resolver.toggleModuleCompletion({ id: '1', completed: false });
            (0, vitest_1.expect)(result.id).toBe('1');
            (0, vitest_1.expect)(result.completed).toBe(false);
        });
        (0, vitest_1.it)('should throw NotFoundException for non-existent module', () => {
            (0, vitest_1.expect)(() => resolver.toggleModuleCompletion({ id: 'non-existent', completed: true }))
                .toThrow(common_1.NotFoundException);
        });
        (0, vitest_1.it)('should return the updated module with all properties', () => {
            const result = resolver.toggleModuleCompletion({ id: '1', completed: true });
            (0, vitest_1.expect)(result).toHaveProperty('id');
            (0, vitest_1.expect)(result).toHaveProperty('title');
            (0, vitest_1.expect)(result).toHaveProperty('category');
            (0, vitest_1.expect)(result).toHaveProperty('estimatedMinutes');
            (0, vitest_1.expect)(result).toHaveProperty('completed');
        });
        (0, vitest_1.it)('should persist the completion status change', () => {
            resolver.toggleModuleCompletion({ id: '1', completed: true });
            const modules = resolver.getModules();
            const updatedModule = modules.find((m) => m.id === '1');
            (0, vitest_1.expect)(updatedModule?.completed).toBe(true);
        });
    });
    (0, vitest_1.describe)('getProgress', () => {
        (0, vitest_1.it)('should return progress statistics', () => {
            const progress = resolver.getProgress();
            (0, vitest_1.expect)(progress).toHaveProperty('total');
            (0, vitest_1.expect)(progress).toHaveProperty('completed');
            (0, vitest_1.expect)(progress).toHaveProperty('percentage');
        });
        (0, vitest_1.it)('should return correct initial progress (no modules completed)', () => {
            repository.reset();
            const progress = resolver.getProgress();
            (0, vitest_1.expect)(progress.total).toBe(8);
            (0, vitest_1.expect)(progress.completed).toBe(0);
            (0, vitest_1.expect)(progress.percentage).toBe(0);
        });
        (0, vitest_1.it)('should update progress when modules are completed', () => {
            repository.reset();
            resolver.toggleModuleCompletion({ id: '1', completed: true });
            resolver.toggleModuleCompletion({ id: '2', completed: true });
            const progress = resolver.getProgress();
            (0, vitest_1.expect)(progress.total).toBe(8);
            (0, vitest_1.expect)(progress.completed).toBe(2);
            (0, vitest_1.expect)(progress.percentage).toBe(25);
        });
        (0, vitest_1.it)('should calculate progress using ProgressService', () => {
            const progressSpy = vitest_1.vi.spyOn(progressService, 'calculateProgress');
            resolver.getProgress();
            (0, vitest_1.expect)(progressSpy).toHaveBeenCalled();
            (0, vitest_1.expect)(progressSpy).toHaveBeenCalledWith(vitest_1.expect.any(Array));
        });
    });
});
//# sourceMappingURL=learning-module.resolver.spec.js.map