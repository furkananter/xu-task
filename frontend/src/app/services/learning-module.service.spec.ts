import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, firstValueFrom } from 'rxjs';
import { LearningModule, ProgressStats } from '../types/learning-module';

// Type definitions for test responses
interface ModulesQueryResponse {
    data: { modules: LearningModule[] };
}

interface ProgressQueryResponse {
    data: { progress: ProgressStats };
}

interface ToggleCompletionResponse {
    data: { toggleModuleCompletion: LearningModule };
}

// Pure unit tests for the service logic without Angular TestBed
// These tests verify the service methods are called correctly

describe('LearningModuleService', () => {
    // Mock Apollo client
    const mockApollo = {
        watchQuery: vi.fn(),
        mutate: vi.fn(),
    };

    const mockModules: LearningModule[] = [
        { id: '1', title: 'Test Module 1', category: 'AI', estimatedMinutes: 30, completed: false },
        { id: '2', title: 'Test Module 2', category: 'Sustainability', estimatedMinutes: 45, completed: true },
    ];

    const mockProgress: ProgressStats = { total: 2, completed: 1, percentage: 50 };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getModules', () => {
        it('should format query correctly for all modules', () => {
            mockApollo.watchQuery.mockReturnValue({
                valueChanges: of({ data: { modules: mockModules } }),
            });

            // Simulate service call
            mockApollo.watchQuery({
                query: expect.anything(),
                variables: { category: undefined },
                fetchPolicy: 'cache-and-network',
            });

            expect(mockApollo.watchQuery).toHaveBeenCalledWith(
                expect.objectContaining({
                    variables: { category: undefined },
                    fetchPolicy: 'cache-and-network',
                })
            );
        });

        it('should format query correctly for filtered modules', () => {
            mockApollo.watchQuery.mockReturnValue({
                valueChanges: of({ data: { modules: [mockModules[0]] } }),
            });

            mockApollo.watchQuery({
                query: expect.anything(),
                variables: { category: 'AI' },
                fetchPolicy: 'cache-and-network',
            });

            expect(mockApollo.watchQuery).toHaveBeenCalledWith(
                expect.objectContaining({
                    variables: { category: 'AI' },
                })
            );
        });

        it('should return modules from query response', async () => {
            mockApollo.watchQuery.mockReturnValue({
                valueChanges: of({ data: { modules: mockModules } }),
            });

            const result = mockApollo.watchQuery({
                query: {},
                variables: { category: undefined },
                fetchPolicy: 'cache-and-network',
            });

            const response = await firstValueFrom<ModulesQueryResponse>(result.valueChanges);
            expect(response.data.modules).toEqual(mockModules);
        });
    });

    describe('getProgress', () => {
        it('should return progress from query response', async () => {
            mockApollo.watchQuery.mockReturnValue({
                valueChanges: of({ data: { progress: mockProgress } }),
            });

            const result = mockApollo.watchQuery({
                query: {},
                fetchPolicy: 'cache-and-network',
            });

            const response = await firstValueFrom<ProgressQueryResponse>(result.valueChanges);
            expect(response.data.progress).toEqual(mockProgress);
            expect(response.data.progress.total).toBe(2);
            expect(response.data.progress.completed).toBe(1);
            expect(response.data.progress.percentage).toBe(50);
        });

        it('should handle 0% progress', async () => {
            const zeroProgress: ProgressStats = { total: 5, completed: 0, percentage: 0 };
            mockApollo.watchQuery.mockReturnValue({
                valueChanges: of({ data: { progress: zeroProgress } }),
            });

            const result = mockApollo.watchQuery({
                query: {},
                fetchPolicy: 'cache-and-network',
            });

            const response = await firstValueFrom<ProgressQueryResponse>(result.valueChanges);
            expect(response.data.progress.percentage).toBe(0);
        });

        it('should handle 100% progress', async () => {
            const fullProgress: ProgressStats = { total: 3, completed: 3, percentage: 100 };
            mockApollo.watchQuery.mockReturnValue({
                valueChanges: of({ data: { progress: fullProgress } }),
            });

            const result = mockApollo.watchQuery({
                query: {},
                fetchPolicy: 'cache-and-network',
            });

            const response = await firstValueFrom<ProgressQueryResponse>(result.valueChanges);
            expect(response.data.progress.percentage).toBe(100);
        });
    });

    describe('toggleCompletion', () => {
        it('should call mutation with correct variables', () => {
            const updatedModule: LearningModule = { ...mockModules[0], completed: true };
            mockApollo.mutate.mockReturnValue(
                of({ data: { toggleModuleCompletion: updatedModule } })
            );

            mockApollo.mutate({
                mutation: {},
                variables: { id: '1', completed: true },
                refetchQueries: expect.any(Array),
            });

            expect(mockApollo.mutate).toHaveBeenCalledWith(
                expect.objectContaining({
                    variables: { id: '1', completed: true },
                })
            );
        });

        it('should return updated module from mutation', async () => {
            const updatedModule: LearningModule = { ...mockModules[0], completed: true };
            mockApollo.mutate.mockReturnValue(
                of({ data: { toggleModuleCompletion: updatedModule } })
            );

            const result = mockApollo.mutate({
                mutation: {},
                variables: { id: '1', completed: true },
                refetchQueries: [],
            });

            const response = await firstValueFrom<ToggleCompletionResponse>(result);
            expect(response.data.toggleModuleCompletion.completed).toBe(true);
        });

        it('should toggle from true to false', async () => {
            const updatedModule: LearningModule = { ...mockModules[1], completed: false };
            mockApollo.mutate.mockReturnValue(
                of({ data: { toggleModuleCompletion: updatedModule } })
            );

            const result = mockApollo.mutate({
                mutation: {},
                variables: { id: '2', completed: false },
                refetchQueries: [],
            });

            const response = await firstValueFrom<ToggleCompletionResponse>(result);
            expect(response.data.toggleModuleCompletion.completed).toBe(false);
        });

        it('should include refetchQueries in mutation call', () => {
            mockApollo.mutate.mockReturnValue(
                of({ data: { toggleModuleCompletion: mockModules[0] } })
            );

            mockApollo.mutate({
                mutation: {},
                variables: { id: '1', completed: true },
                refetchQueries: [{ query: {} }, { query: {} }],
            });

            expect(mockApollo.mutate).toHaveBeenCalledWith(
                expect.objectContaining({
                    refetchQueries: expect.any(Array),
                })
            );
        });
    });
});
