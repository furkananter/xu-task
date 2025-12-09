"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const progress_service_1 = require("./progress.service");
const learning_module_model_1 = require("./learning-module.model");
(0, vitest_1.describe)('ProgressService', () => {
    let service;
    (0, vitest_1.beforeEach)(() => {
        service = new progress_service_1.ProgressService();
    });
    (0, vitest_1.describe)('calculateProgress', () => {
        (0, vitest_1.it)('should return zeros for an empty module list', () => {
            const result = service.calculateProgress([]);
            (0, vitest_1.expect)(result).toEqual({
                total: 0,
                completed: 0,
                percentage: 0,
            });
        });
        (0, vitest_1.it)('should return 0% when no modules are completed', () => {
            const modules = [
                { id: '1', title: 'Module 1', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 30, completed: false },
                { id: '2', title: 'Module 2', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 45, completed: false },
                { id: '3', title: 'Module 3', category: learning_module_model_1.ModuleCategory.Sustainability, estimatedMinutes: 20, completed: false },
            ];
            const result = service.calculateProgress(modules);
            (0, vitest_1.expect)(result).toEqual({
                total: 3,
                completed: 0,
                percentage: 0,
            });
        });
        (0, vitest_1.it)('should return 100% when all modules are completed', () => {
            const modules = [
                { id: '1', title: 'Module 1', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 30, completed: true },
                { id: '2', title: 'Module 2', category: learning_module_model_1.ModuleCategory.Sustainability, estimatedMinutes: 45, completed: true },
            ];
            const result = service.calculateProgress(modules);
            (0, vitest_1.expect)(result).toEqual({
                total: 2,
                completed: 2,
                percentage: 100,
            });
        });
        (0, vitest_1.it)('should calculate correct percentage for partial completion', () => {
            const modules = [
                { id: '1', title: 'Module 1', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 30, completed: true },
                { id: '2', title: 'Module 2', category: learning_module_model_1.ModuleCategory.Sustainability, estimatedMinutes: 45, completed: false },
                { id: '3', title: 'Module 3', category: learning_module_model_1.ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: true },
                { id: '4', title: 'Module 4', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 25, completed: false },
            ];
            const result = service.calculateProgress(modules);
            (0, vitest_1.expect)(result).toEqual({
                total: 4,
                completed: 2,
                percentage: 50,
            });
        });
        (0, vitest_1.it)('should round percentage to nearest integer', () => {
            const modules = [
                { id: '1', title: 'Module 1', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 30, completed: true },
                { id: '2', title: 'Module 2', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 45, completed: false },
                { id: '3', title: 'Module 3', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 20, completed: false },
            ];
            const result = service.calculateProgress(modules);
            // 1/3 = 33.33... should round to 33
            (0, vitest_1.expect)(result.percentage).toBe(33);
        });
        (0, vitest_1.it)('should handle a single completed module', () => {
            const modules = [
                { id: '1', title: 'Single Module', category: learning_module_model_1.ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: true },
            ];
            const result = service.calculateProgress(modules);
            (0, vitest_1.expect)(result).toEqual({
                total: 1,
                completed: 1,
                percentage: 100,
            });
        });
        (0, vitest_1.it)('should handle a single uncompleted module', () => {
            const modules = [
                { id: '1', title: 'Single Module', category: learning_module_model_1.ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: false },
            ];
            const result = service.calculateProgress(modules);
            (0, vitest_1.expect)(result).toEqual({
                total: 1,
                completed: 0,
                percentage: 0,
            });
        });
        (0, vitest_1.it)('should work with modules of different categories', () => {
            const modules = [
                { id: '1', title: 'AI Module', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 30, completed: true },
                { id: '2', title: 'Sustainability Module', category: learning_module_model_1.ModuleCategory.Sustainability, estimatedMinutes: 45, completed: true },
                { id: '3', title: 'Digital Skills Module', category: learning_module_model_1.ModuleCategory.DigitalSkills, estimatedMinutes: 60, completed: false },
            ];
            const result = service.calculateProgress(modules);
            (0, vitest_1.expect)(result).toEqual({
                total: 3,
                completed: 2,
                percentage: 67, // 2/3 = 66.67, rounds to 67
            });
        });
        (0, vitest_1.it)('should handle modules with various estimatedMinutes values', () => {
            const modules = [
                { id: '1', title: 'Quick Module', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 0, completed: true },
                { id: '2', title: 'Long Module', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 999, completed: true },
                { id: '3', title: 'Normal Module', category: learning_module_model_1.ModuleCategory.AI, estimatedMinutes: 30, completed: false },
            ];
            const result = service.calculateProgress(modules);
            // Progress calculation should not depend on estimatedMinutes
            (0, vitest_1.expect)(result).toEqual({
                total: 3,
                completed: 2,
                percentage: 67,
            });
        });
    });
});
//# sourceMappingURL=progress.service.spec.js.map