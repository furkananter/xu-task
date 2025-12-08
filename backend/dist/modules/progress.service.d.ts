import { ILearningModule, ProgressStats } from './learning-module.model';
/**
 * Business Logic Service (Pure) - Contains only calculation logic.
 * No dependencies, receives data as parameters, easily testable.
 */
export declare class ProgressService {
    calculateProgress(modules: ILearningModule[]): ProgressStats;
}
