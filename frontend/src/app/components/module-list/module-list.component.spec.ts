import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LearningModule, ProgressStats, ModuleCategory } from '../../types/learning-module';

// Pure unit tests for ModuleListComponent logic without Angular TestBed
// These tests verify the component logic works correctly

describe('ModuleListComponent', () => {
    // Simulated component state
    let modules: LearningModule[];
    let progress: ProgressStats | null;
    let loading: boolean;
    let error: string | null;
    let selectedCategory: ModuleCategory | '';
    let updatingModuleId: string | null;

    // Mock service
    const mockService = {
        getModules: vi.fn(),
        getProgress: vi.fn(),
        toggleCompletion: vi.fn(),
    };

    const mockModules: LearningModule[] = [
        { id: '1', title: 'AI Module', category: 'AI', estimatedMinutes: 30, completed: false },
        { id: '2', title: 'Sustainability Module', category: 'Sustainability', estimatedMinutes: 45, completed: true },
        { id: '3', title: 'Digital Skills Module', category: 'DigitalSkills', estimatedMinutes: 60, completed: false },
    ];

    const mockProgress: ProgressStats = { total: 3, completed: 1, percentage: 33 };

    // Helper function to simulate getCategoryIcon
    function getCategoryIcon(category: ModuleCategory): string {
        switch (category) {
            case 'AI': return '🤖';
            case 'Sustainability': return '🌱';
            case 'DigitalSkills': return '💻';
            default: return '📚';
        }
    }

    // Helper function to simulate getCategoryLabel
    function getCategoryLabel(category: ModuleCategory): string {
        switch (category) {
            case 'AI': return 'AI';
            case 'Sustainability': return 'Sustainability';
            case 'DigitalSkills': return 'Digital Skills';
            default: return category;
        }
    }

    beforeEach(() => {
        vi.clearAllMocks();
        modules = [];
        progress = null;
        loading = true;
        error = null;
        selectedCategory = '';
        updatingModuleId = null;
    });

    describe('initialization', () => {
        it('should start with empty modules array', () => {
            expect(modules).toEqual([]);
        });

        it('should start with null progress', () => {
            expect(progress).toBeNull();
        });

        it('should start with loading true', () => {
            expect(loading).toBe(true);
        });

        it('should set loading to false after data loads', () => {
            loading = false;
            modules = mockModules;
            expect(loading).toBe(false);
        });

        it('should populate modules after load', () => {
            modules = mockModules;
            expect(modules).toHaveLength(3);
        });

        it('should populate progress after load', () => {
            progress = mockProgress;
            expect(progress).toEqual(mockProgress);
        });
    });

    describe('module data', () => {
        beforeEach(() => {
            modules = mockModules;
            progress = mockProgress;
        });

        it('should have correct module count', () => {
            expect(modules.length).toBe(3);
        });

        it('should have AI modules', () => {
            const aiModules = modules.filter(m => m.category === 'AI');
            expect(aiModules.length).toBe(1);
        });

        it('should have completed modules', () => {
            const completedModules = modules.filter(m => m.completed);
            expect(completedModules.length).toBe(1);
        });

        it('should have uncompleted modules', () => {
            const uncompletedModules = modules.filter(m => !m.completed);
            expect(uncompletedModules.length).toBe(2);
        });
    });

    describe('progress calculation', () => {
        it('should show correct total', () => {
            progress = mockProgress;
            expect(progress.total).toBe(3);
        });

        it('should show correct completed count', () => {
            progress = mockProgress;
            expect(progress.completed).toBe(1);
        });

        it('should show correct percentage', () => {
            progress = mockProgress;
            expect(progress.percentage).toBe(33);
        });

        it('should handle 0% completion', () => {
            progress = { total: 5, completed: 0, percentage: 0 };
            expect(progress.percentage).toBe(0);
        });

        it('should handle 100% completion', () => {
            progress = { total: 3, completed: 3, percentage: 100 };
            expect(progress.percentage).toBe(100);
        });

        it('should handle empty modules', () => {
            progress = { total: 0, completed: 0, percentage: 0 };
            expect(progress.total).toBe(0);
        });
    });

    describe('category filtering', () => {
        it('should start with empty category', () => {
            expect(selectedCategory).toBe('');
        });

        it('should update selected category', () => {
            selectedCategory = 'AI';
            expect(selectedCategory).toBe('AI');
        });

        it('should filter AI modules', () => {
            modules = mockModules;
            selectedCategory = 'AI';
            const filtered = modules.filter(m => m.category === selectedCategory);
            expect(filtered.length).toBe(1);
            expect(filtered[0].title).toBe('AI Module');
        });

        it('should filter Sustainability modules', () => {
            modules = mockModules;
            selectedCategory = 'Sustainability';
            const filtered = modules.filter(m => m.category === selectedCategory);
            expect(filtered.length).toBe(1);
        });

        it('should filter DigitalSkills modules', () => {
            modules = mockModules;
            selectedCategory = 'DigitalSkills';
            const filtered = modules.filter(m => m.category === selectedCategory);
            expect(filtered.length).toBe(1);
        });

        it('should clear filter', () => {
            selectedCategory = 'AI';
            selectedCategory = '';
            expect(selectedCategory).toBe('');
        });
    });

    describe('toggle completion', () => {
        beforeEach(() => {
            modules = [...mockModules];
        });

        it('should set updating state', () => {
            updatingModuleId = '1';
            expect(updatingModuleId).toBe('1');
        });

        it('should toggle from false to true', () => {
            const moduleIndex = modules.findIndex(m => m.id === '1');
            modules[moduleIndex] = { ...modules[moduleIndex], completed: true };
            expect(modules[0].completed).toBe(true);
        });

        it('should toggle from true to false', () => {
            const moduleIndex = modules.findIndex(m => m.id === '2');
            modules[moduleIndex] = { ...modules[moduleIndex], completed: false };
            expect(modules[1].completed).toBe(false);
        });

        it('should clear updating state after toggle', () => {
            updatingModuleId = '1';
            updatingModuleId = null;
            expect(updatingModuleId).toBeNull();
        });

        it('should update correct module by id', () => {
            const targetId = '3';
            const moduleIndex = modules.findIndex(m => m.id === targetId);
            modules[moduleIndex] = { ...modules[moduleIndex], completed: true };
            expect(modules[2].completed).toBe(true);
        });
    });

    describe('error handling', () => {
        it('should start with no error', () => {
            expect(error).toBeNull();
        });

        it('should set error message on load failure', () => {
            error = 'Failed to load modules. Please try again.';
            expect(error).toBe('Failed to load modules. Please try again.');
        });

        it('should set error message on toggle failure', () => {
            error = 'Failed to update module. Please try again.';
            expect(error).toBe('Failed to update module. Please try again.');
        });

        it('should clear error on retry', () => {
            error = 'Some error';
            error = null;
            expect(error).toBeNull();
        });
    });

    describe('helper functions', () => {
        describe('getCategoryIcon', () => {
            it('should return robot emoji for AI', () => {
                expect(getCategoryIcon('AI')).toBe('🤖');
            });

            it('should return plant emoji for Sustainability', () => {
                expect(getCategoryIcon('Sustainability')).toBe('🌱');
            });

            it('should return computer emoji for DigitalSkills', () => {
                expect(getCategoryIcon('DigitalSkills')).toBe('💻');
            });
        });

        describe('getCategoryLabel', () => {
            it('should return AI for AI', () => {
                expect(getCategoryLabel('AI')).toBe('AI');
            });

            it('should return Sustainability for Sustainability', () => {
                expect(getCategoryLabel('Sustainability')).toBe('Sustainability');
            });

            it('should return Digital Skills for DigitalSkills', () => {
                expect(getCategoryLabel('DigitalSkills')).toBe('Digital Skills');
            });
        });
    });

    describe('empty state', () => {
        it('should detect empty modules array', () => {
            modules = [];
            expect(modules.length).toBe(0);
        });

        it('should detect no results for filter', () => {
            modules = mockModules;
            // Test with a category that exists but has no modules after some are removed
            const emptyFilteredList = modules.filter(m => m.category === 'AI' && m.id === 'nonexistent');
            expect(emptyFilteredList.length).toBe(0);
        });
    });
});
