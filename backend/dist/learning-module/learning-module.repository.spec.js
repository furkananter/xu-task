"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const common_1 = require("@nestjs/common");
const learning_module_repository_1 = require("./learning-module.repository");
const learning_module_model_1 = require("./learning-module.model");
(0, vitest_1.describe)('LearningModuleRepository', () => {
    let repository;
    (0, vitest_1.beforeEach)(() => {
        repository = new learning_module_repository_1.LearningModuleRepository();
        repository.reset(); // Ensure clean state for each test
    });
    (0, vitest_1.describe)('findAll', () => {
        (0, vitest_1.it)('should return all modules when no category filter is provided', () => {
            const modules = repository.findAll();
            (0, vitest_1.expect)(modules).toHaveLength(8);
            (0, vitest_1.expect)(modules[0]).toHaveProperty('id');
            (0, vitest_1.expect)(modules[0]).toHaveProperty('title');
            (0, vitest_1.expect)(modules[0]).toHaveProperty('category');
            (0, vitest_1.expect)(modules[0]).toHaveProperty('estimatedMinutes');
            (0, vitest_1.expect)(modules[0]).toHaveProperty('completed');
        });
        (0, vitest_1.it)('should return only AI modules when filtered by AI category', () => {
            const modules = repository.findAll('AI');
            (0, vitest_1.expect)(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                (0, vitest_1.expect)(module.category).toBe(learning_module_model_1.ModuleCategory.AI);
            });
        });
        (0, vitest_1.it)('should return only Sustainability modules when filtered', () => {
            const modules = repository.findAll('Sustainability');
            (0, vitest_1.expect)(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                (0, vitest_1.expect)(module.category).toBe(learning_module_model_1.ModuleCategory.Sustainability);
            });
        });
        (0, vitest_1.it)('should return only DigitalSkills modules when filtered', () => {
            const modules = repository.findAll('DigitalSkills');
            (0, vitest_1.expect)(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                (0, vitest_1.expect)(module.category).toBe(learning_module_model_1.ModuleCategory.DigitalSkills);
            });
        });
        (0, vitest_1.it)('should return empty array for invalid category filter', () => {
            const modules = repository.findAll('InvalidCategory');
            (0, vitest_1.expect)(modules).toEqual([]);
        });
        (0, vitest_1.it)('should return empty array for empty string category', () => {
            const modules = repository.findAll('');
            (0, vitest_1.expect)(modules).toHaveLength(8);
        });
        (0, vitest_1.it)('should return a copy of modules, not the original array', () => {
            const modules1 = repository.findAll();
            const modules2 = repository.findAll();
            (0, vitest_1.expect)(modules1).not.toBe(modules2);
            (0, vitest_1.expect)(modules1).toEqual(modules2);
        });
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('should return the correct module by ID', () => {
            const module = repository.findById('1');
            (0, vitest_1.expect)(module).not.toBeNull();
            (0, vitest_1.expect)(module?.id).toBe('1');
            (0, vitest_1.expect)(module?.title).toBe('Introduction to Machine Learning');
        });
        (0, vitest_1.it)('should return null for non-existent ID', () => {
            const module = repository.findById('non-existent-id');
            (0, vitest_1.expect)(module).toBeNull();
        });
        (0, vitest_1.it)('should return null for empty string ID', () => {
            const module = repository.findById('');
            (0, vitest_1.expect)(module).toBeNull();
        });
        (0, vitest_1.it)('should find modules with different IDs', () => {
            const module1 = repository.findById('1');
            const module5 = repository.findById('5');
            const module8 = repository.findById('8');
            (0, vitest_1.expect)(module1?.id).toBe('1');
            (0, vitest_1.expect)(module5?.id).toBe('5');
            (0, vitest_1.expect)(module8?.id).toBe('8');
        });
    });
    (0, vitest_1.describe)('updateCompletion', () => {
        (0, vitest_1.it)('should update module completion status to true', () => {
            const updatedModule = repository.updateCompletion('1', true);
            (0, vitest_1.expect)(updatedModule.id).toBe('1');
            (0, vitest_1.expect)(updatedModule.completed).toBe(true);
            const fetchedModule = repository.findById('1');
            (0, vitest_1.expect)(fetchedModule?.completed).toBe(true);
        });
        (0, vitest_1.it)('should update module completion status to false', () => {
            repository.updateCompletion('1', true);
            const updatedModule = repository.updateCompletion('1', false);
            (0, vitest_1.expect)(updatedModule.id).toBe('1');
            (0, vitest_1.expect)(updatedModule.completed).toBe(false);
        });
        (0, vitest_1.it)('should throw NotFoundException for non-existent module ID', () => {
            (0, vitest_1.expect)(() => repository.updateCompletion('non-existent-id', true))
                .toThrow(common_1.NotFoundException);
        });
        (0, vitest_1.it)('should throw NotFoundException with correct message', () => {
            (0, vitest_1.expect)(() => repository.updateCompletion('invalid', true))
                .toThrow('Module with ID "invalid" not found');
        });
        (0, vitest_1.it)('should preserve other module properties when updating completion', () => {
            const originalModule = repository.findById('1');
            const updatedModule = repository.updateCompletion('1', true);
            (0, vitest_1.expect)(updatedModule.id).toBe(originalModule?.id);
            (0, vitest_1.expect)(updatedModule.title).toBe(originalModule?.title);
            (0, vitest_1.expect)(updatedModule.category).toBe(originalModule?.category);
            (0, vitest_1.expect)(updatedModule.estimatedMinutes).toBe(originalModule?.estimatedMinutes);
            (0, vitest_1.expect)(updatedModule.completed).toBe(true);
        });
        (0, vitest_1.it)('should return a copy of the updated module', () => {
            const updatedModule = repository.updateCompletion('1', true);
            const fetchedModule = repository.findById('1');
            (0, vitest_1.expect)(updatedModule).not.toBe(fetchedModule);
            (0, vitest_1.expect)(updatedModule).toEqual(fetchedModule);
        });
    });
    (0, vitest_1.describe)('reset', () => {
        (0, vitest_1.it)('should reset all modules to initial state', () => {
            repository.updateCompletion('1', true);
            repository.updateCompletion('2', true);
            (0, vitest_1.expect)(repository.findById('1')?.completed).toBe(true);
            (0, vitest_1.expect)(repository.findById('2')?.completed).toBe(true);
            repository.reset();
            (0, vitest_1.expect)(repository.findById('1')?.completed).toBe(false);
            (0, vitest_1.expect)(repository.findById('2')?.completed).toBe(false);
        });
    });
});
//# sourceMappingURL=learning-module.repository.spec.js.map