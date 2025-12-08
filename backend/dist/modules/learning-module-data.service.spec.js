"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const common_1 = require("@nestjs/common");
const learning_module_data_service_1 = require("./learning-module-data.service");
const learning_module_model_1 = require("./learning-module.model");
(0, vitest_1.describe)('LearningModuleDataService', () => {
    let service;
    (0, vitest_1.beforeEach)(() => {
        service = new learning_module_data_service_1.LearningModuleDataService();
        service.reset(); // Ensure clean state for each test
    });
    (0, vitest_1.describe)('findAll', () => {
        (0, vitest_1.it)('should return all modules when no category filter is provided', () => {
            const modules = service.findAll();
            (0, vitest_1.expect)(modules).toHaveLength(8);
            (0, vitest_1.expect)(modules[0]).toHaveProperty('id');
            (0, vitest_1.expect)(modules[0]).toHaveProperty('title');
            (0, vitest_1.expect)(modules[0]).toHaveProperty('category');
            (0, vitest_1.expect)(modules[0]).toHaveProperty('estimatedMinutes');
            (0, vitest_1.expect)(modules[0]).toHaveProperty('completed');
        });
        (0, vitest_1.it)('should return only AI modules when filtered by AI category', () => {
            const modules = service.findAll('AI');
            (0, vitest_1.expect)(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                (0, vitest_1.expect)(module.category).toBe(learning_module_model_1.ModuleCategory.AI);
            });
        });
        (0, vitest_1.it)('should return only Sustainability modules when filtered', () => {
            const modules = service.findAll('Sustainability');
            (0, vitest_1.expect)(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                (0, vitest_1.expect)(module.category).toBe(learning_module_model_1.ModuleCategory.Sustainability);
            });
        });
        (0, vitest_1.it)('should return only DigitalSkills modules when filtered', () => {
            const modules = service.findAll('DigitalSkills');
            (0, vitest_1.expect)(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                (0, vitest_1.expect)(module.category).toBe(learning_module_model_1.ModuleCategory.DigitalSkills);
            });
        });
        (0, vitest_1.it)('should return empty array for invalid category filter', () => {
            const modules = service.findAll('InvalidCategory');
            (0, vitest_1.expect)(modules).toEqual([]);
        });
        (0, vitest_1.it)('should return empty array for empty string category', () => {
            // Empty string is falsy, so it should return all modules
            const modules = service.findAll('');
            (0, vitest_1.expect)(modules).toHaveLength(8);
        });
        (0, vitest_1.it)('should return a copy of modules, not the original array', () => {
            const modules1 = service.findAll();
            const modules2 = service.findAll();
            (0, vitest_1.expect)(modules1).not.toBe(modules2);
            (0, vitest_1.expect)(modules1).toEqual(modules2);
        });
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('should return the correct module by ID', () => {
            const module = service.findById('1');
            (0, vitest_1.expect)(module).not.toBeNull();
            (0, vitest_1.expect)(module?.id).toBe('1');
            (0, vitest_1.expect)(module?.title).toBe('Introduction to Machine Learning');
        });
        (0, vitest_1.it)('should return null for non-existent ID', () => {
            const module = service.findById('non-existent-id');
            (0, vitest_1.expect)(module).toBeNull();
        });
        (0, vitest_1.it)('should return null for empty string ID', () => {
            const module = service.findById('');
            (0, vitest_1.expect)(module).toBeNull();
        });
        (0, vitest_1.it)('should find modules with different IDs', () => {
            const module1 = service.findById('1');
            const module5 = service.findById('5');
            const module8 = service.findById('8');
            (0, vitest_1.expect)(module1?.id).toBe('1');
            (0, vitest_1.expect)(module5?.id).toBe('5');
            (0, vitest_1.expect)(module8?.id).toBe('8');
        });
    });
    (0, vitest_1.describe)('updateCompletion', () => {
        (0, vitest_1.it)('should update module completion status to true', () => {
            const updatedModule = service.updateCompletion('1', true);
            (0, vitest_1.expect)(updatedModule.id).toBe('1');
            (0, vitest_1.expect)(updatedModule.completed).toBe(true);
            // Verify persistence
            const fetchedModule = service.findById('1');
            (0, vitest_1.expect)(fetchedModule?.completed).toBe(true);
        });
        (0, vitest_1.it)('should update module completion status to false', () => {
            // First set to true
            service.updateCompletion('1', true);
            // Then set to false
            const updatedModule = service.updateCompletion('1', false);
            (0, vitest_1.expect)(updatedModule.id).toBe('1');
            (0, vitest_1.expect)(updatedModule.completed).toBe(false);
        });
        (0, vitest_1.it)('should throw NotFoundException for non-existent module ID', () => {
            (0, vitest_1.expect)(() => service.updateCompletion('non-existent-id', true))
                .toThrow(common_1.NotFoundException);
        });
        (0, vitest_1.it)('should throw NotFoundException with correct message', () => {
            (0, vitest_1.expect)(() => service.updateCompletion('invalid', true))
                .toThrow('Module with ID "invalid" not found');
        });
        (0, vitest_1.it)('should preserve other module properties when updating completion', () => {
            const originalModule = service.findById('1');
            const updatedModule = service.updateCompletion('1', true);
            (0, vitest_1.expect)(updatedModule.id).toBe(originalModule?.id);
            (0, vitest_1.expect)(updatedModule.title).toBe(originalModule?.title);
            (0, vitest_1.expect)(updatedModule.category).toBe(originalModule?.category);
            (0, vitest_1.expect)(updatedModule.estimatedMinutes).toBe(originalModule?.estimatedMinutes);
            (0, vitest_1.expect)(updatedModule.completed).toBe(true);
        });
        (0, vitest_1.it)('should return a copy of the updated module', () => {
            const updatedModule = service.updateCompletion('1', true);
            const fetchedModule = service.findById('1');
            (0, vitest_1.expect)(updatedModule).not.toBe(fetchedModule);
            (0, vitest_1.expect)(updatedModule).toEqual(fetchedModule);
        });
    });
    (0, vitest_1.describe)('reset', () => {
        (0, vitest_1.it)('should reset all modules to initial state', () => {
            // Make some changes
            service.updateCompletion('1', true);
            service.updateCompletion('2', true);
            // Verify changes were made
            (0, vitest_1.expect)(service.findById('1')?.completed).toBe(true);
            (0, vitest_1.expect)(service.findById('2')?.completed).toBe(true);
            // Reset
            service.reset();
            // Verify reset
            (0, vitest_1.expect)(service.findById('1')?.completed).toBe(false);
            (0, vitest_1.expect)(service.findById('2')?.completed).toBe(false);
        });
    });
});
//# sourceMappingURL=learning-module-data.service.spec.js.map