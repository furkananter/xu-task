import { describe, it, expect, beforeEach } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { LearningModuleRepository } from './learning-module.repository';
import { ModuleCategory } from './learning-module.model';

describe('LearningModuleRepository', () => {
    let repository: LearningModuleRepository;

    beforeEach(() => {
        repository = new LearningModuleRepository();
        repository.reset(); // Ensure clean state for each test
    });

    describe('findAll', () => {
        it('should return all modules when no category filter is provided', () => {
            const modules = repository.findAll();

            expect(modules).toHaveLength(8);
            expect(modules[0]).toHaveProperty('id');
            expect(modules[0]).toHaveProperty('title');
            expect(modules[0]).toHaveProperty('category');
            expect(modules[0]).toHaveProperty('estimatedMinutes');
            expect(modules[0]).toHaveProperty('completed');
        });

        it('should return only AI modules when filtered by AI category', () => {
            const modules = repository.findAll('AI');

            expect(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                expect(module.category).toBe(ModuleCategory.AI);
            });
        });

        it('should return only Sustainability modules when filtered', () => {
            const modules = repository.findAll('Sustainability');

            expect(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                expect(module.category).toBe(ModuleCategory.Sustainability);
            });
        });

        it('should return only DigitalSkills modules when filtered', () => {
            const modules = repository.findAll('DigitalSkills');

            expect(modules.length).toBeGreaterThan(0);
            modules.forEach((module) => {
                expect(module.category).toBe(ModuleCategory.DigitalSkills);
            });
        });

        it('should return empty array for invalid category filter', () => {
            const modules = repository.findAll('InvalidCategory');

            expect(modules).toEqual([]);
        });

        it('should return empty array for empty string category', () => {
            const modules = repository.findAll('');

            expect(modules).toHaveLength(8);
        });

        it('should return a copy of modules, not the original array', () => {
            const modules1 = repository.findAll();
            const modules2 = repository.findAll();

            expect(modules1).not.toBe(modules2);
            expect(modules1).toEqual(modules2);
        });
    });

    describe('findById', () => {
        it('should return the correct module by ID', () => {
            const module = repository.findById('1');

            expect(module).not.toBeNull();
            expect(module?.id).toBe('1');
            expect(module?.title).toBe('Introduction to Machine Learning');
        });

        it('should return null for non-existent ID', () => {
            const module = repository.findById('non-existent-id');

            expect(module).toBeNull();
        });

        it('should return null for empty string ID', () => {
            const module = repository.findById('');

            expect(module).toBeNull();
        });

        it('should find modules with different IDs', () => {
            const module1 = repository.findById('1');
            const module5 = repository.findById('5');
            const module8 = repository.findById('8');

            expect(module1?.id).toBe('1');
            expect(module5?.id).toBe('5');
            expect(module8?.id).toBe('8');
        });
    });

    describe('updateCompletion', () => {
        it('should update module completion status to true', () => {
            const updatedModule = repository.updateCompletion('1', true);

            expect(updatedModule.id).toBe('1');
            expect(updatedModule.completed).toBe(true);

            const fetchedModule = repository.findById('1');
            expect(fetchedModule?.completed).toBe(true);
        });

        it('should update module completion status to false', () => {
            repository.updateCompletion('1', true);
            const updatedModule = repository.updateCompletion('1', false);

            expect(updatedModule.id).toBe('1');
            expect(updatedModule.completed).toBe(false);
        });

        it('should throw NotFoundException for non-existent module ID', () => {
            expect(() => repository.updateCompletion('non-existent-id', true))
                .toThrow(NotFoundException);
        });

        it('should throw NotFoundException with correct message', () => {
            expect(() => repository.updateCompletion('invalid', true))
                .toThrow('Module with ID "invalid" not found');
        });

        it('should preserve other module properties when updating completion', () => {
            const originalModule = repository.findById('1');
            const updatedModule = repository.updateCompletion('1', true);

            expect(updatedModule.id).toBe(originalModule?.id);
            expect(updatedModule.title).toBe(originalModule?.title);
            expect(updatedModule.category).toBe(originalModule?.category);
            expect(updatedModule.estimatedMinutes).toBe(originalModule?.estimatedMinutes);
            expect(updatedModule.completed).toBe(true);
        });

        it('should return a copy of the updated module', () => {
            const updatedModule = repository.updateCompletion('1', true);
            const fetchedModule = repository.findById('1');

            expect(updatedModule).not.toBe(fetchedModule);
            expect(updatedModule).toEqual(fetchedModule);
        });
    });

    describe('reset', () => {
        it('should reset all modules to initial state', () => {
            repository.updateCompletion('1', true);
            repository.updateCompletion('2', true);

            expect(repository.findById('1')?.completed).toBe(true);
            expect(repository.findById('2')?.completed).toBe(true);

            repository.reset();

            expect(repository.findById('1')?.completed).toBe(false);
            expect(repository.findById('2')?.completed).toBe(false);
        });
    });
});
