import { Injectable } from '@nestjs/common';
import { ILearningModule, ProgressStats } from './learning-module.model';

/**
 * Business Logic Service (Pure) - Contains only calculation logic.
 * No dependencies, receives data as parameters, easily testable.
 */
@Injectable()
export class ProgressService {
    calculateProgress(modules: ILearningModule[]): ProgressStats {
        const total = modules.length;

        if (total === 0) {
            return { total: 0, completed: 0, percentage: 0 };
        }

        const completed = modules.filter((module) => module.completed).length;
        const percentage = Math.round((completed / total) * 100);

        return { total, completed, percentage };
    }
}
