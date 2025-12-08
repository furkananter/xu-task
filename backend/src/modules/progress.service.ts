import { Injectable } from '@nestjs/common';
import { ILearningModule, ProgressStats } from './learning-module.model';

/**
 * Business Logic Service (Layer 3) - PURE SERVICE
 * 
 * This service is intentionally PURE:
 * - Has NO injected dependencies
 * - Does NOT access HTTP, database, or external APIs
 * - Receives data as function parameters
 * - Contains only business logic calculations
 * - Easily unit-testable in isolation
 * 
 * This design follows the Single Responsibility Principle (SRP)
 * and makes the business logic framework-agnostic.
 */
@Injectable()
export class ProgressService {
    /**
     * Calculates progress statistics from an array of learning modules
     * 
     * @param modules - Array of learning modules to calculate progress from
     * @returns ProgressStats object containing total, completed count, and percentage
     * 
     * @example
     * const stats = progressService.calculateProgress([
     *   { id: '1', title: 'Test', category: 'AI', estimatedMinutes: 30, completed: true },
     *   { id: '2', title: 'Test 2', category: 'AI', estimatedMinutes: 45, completed: false },
     * ]);
     * // Returns: { total: 2, completed: 1, percentage: 50 }
     */
    calculateProgress(modules: ILearningModule[]): ProgressStats {
        const total = modules.length;

        if (total === 0) {
            return {
                total: 0,
                completed: 0,
                percentage: 0,
            };
        }

        const completed = modules.filter((module) => module.completed).length;
        const percentage = Math.round((completed / total) * 100);

        return {
            total,
            completed,
            percentage,
        };
    }
}
