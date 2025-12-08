import { describe, it, expect, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { LearningModuleDataService } from './learning-module-data.service';
import { ModuleCategory } from './learning-module.model';

describe('LearningModuleDataService', () => {
    let service: LearningModuleDataService;

    beforeEach(() => {
        service = new LearningModuleDataService();
        service.reset(); // Ensure clean state for each test
    });

    describe('findAll', () => {
        it('should return all modules when no category filter is provided', () => {
            const modules = service.findAll();

            expect(modules).toHaveLength(8);
            expect(modules[0]).toHaveProperty('id');
            expect(modules[0]).toHaveProperty('title');
            expect(modules[0]).toHaveProperty('category');
            expect(modules[0]).toHaveProperty('estimatedMinutes');
            expect(modules[0]).toHaveProperty('completed');
        });

        it('should return only AI modules when filtered by AI category', () => {
            const modules = service.findAll('AI');

            expect(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                expect(module.category).toBe(ModuleCategory.AI);
            });
        });

        it('should return only Sustainability modules when filtered', () => {
            const modules = service.findAll('Sustainability');

            expect(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                expect(module.category).toBe(ModuleCategory.Sustainability);
            });
        });

        it('should return only DigitalSkills modules when filtered', () => {
            const modules = service.findAll('DigitalSkills');

            expect(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                expect(module.category).toBe(ModuleCategory.DigitalSkills);
            });
        });

        it('should return empty array for invalid category filter', () => {
            const modules = service.findAll('InvalidCategory');

            expect(modules).toEqual([]);
        });

        it('should return empty array for empty string category', () => {
            // Empty string is falsy, so it should return all modules
            const modules = service.findAll('');

            expect(modules).toHaveLength(8);
        });

        it('should return a copy of modules, not the original array', () => {
            const modules1 = service.findAll();
            const modules2 = service.findAll();

            expect(modules1).not.toBe(modules2);
            expect(modules1).toEqual(modules2);
        });
    });

    describe('findById', () => {
        it('should return the correct module by ID', () => {
            const module = service.findById('1');

            expect(module).not.toBeNull();
            expect(module?.id).toBe('1');
            expect(module?.title).toBe('Introduction to Machine Learning');
        });

        it('should return null for non-existent ID', () => {
            const module = service.findById('non-existent-id');

            expect(module).toBeNull();
        });

        it('should return null for empty string ID', () => {
            const module = service.findById('');

            expect(module).toBeNull();
        });

        it('should find modules with different IDs', () => {
            const module1 = service.findById('1');
            const module5 = service.findById('5');
            const module8 = service.findById('8');

            expect(module1?.id).toBe('1');
            expect(module5?.id).toBe('5');
            expect(module8?.id).toBe('8');
        });
    });

    describe('updateCompletion', () => {
        it('should update module completion status to true', () => {
            const updatedModule = service.updateCompletion('1', true);

            expect(updatedModule.id).toBe('1');
            expect(updatedModule.completed).toBe(true);

            // Verify persistence
            const fetchedModule = service.findById('1');
            expect(fetchedModule?.completed).toBe(true);
        });

        it('should update module completion status to false', () => {
            // First set to true
            service.updateCompletion('1', true);

            // Then set to false
            const updatedModule = service.updateCompletion('1', false);

            expect(updatedModule.id).toBe('1');
            expect(updatedModule.completed).toBe(false);
        });

        it('should throw NotFoundException for non-existent module ID', () => {
            expect(() => service.updateCompletion('non-existent-id', true))
                .toThrow(NotFoundException);
        });

        it('should throw NotFoundException with correct message', () => {
            expect(() => service.updateCompletion('invalid', true))
                .toThrow('Module with ID "invalid" not found');
        });

        it('should preserve other module properties when updating completion', () => {
            const originalModule = service.findById('1');
            const updatedModule = service.updateCompletion('1', true);

            expect(updatedModule.id).toBe(originalModule?.id);
            expect(updatedModule.title).toBe(originalModule?.title);
            expect(updatedModule.category).toBe(originalModule?.category);
            expect(updatedModule.estimatedMinutes).toBe(originalModule?.estimatedMinutes);
            expect(updatedModule.completed).toBe(true);
        });

        it('should return a copy of the updated module', () => {
            const updatedModule = service.updateCompletion('1', true);
            const fetchedModule = service.findById('1');

            expect(updatedModule).not.toBe(fetchedModule);
            expect(updatedModule).toEqual(fetchedModule);
        });
    });

    describe('reset', () => {
        it('should reset all modules to initial state', () => {
            // Make some changes
            service.updateCompletion('1', true);
            service.updateCompletion('2', true);

            // Verify changes were made
            expect(service.findById('1')?.completed).toBe(true);
            expect(service.findById('2')?.completed).toBe(true);

            // Reset
            service.reset();

            // Verify reset
            expect(service.findById('1')?.completed).toBe(false);
            expect(service.findById('2')?.completed).toBe(false);
        });
    });
});
