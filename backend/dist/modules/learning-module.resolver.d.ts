import { LearningModule, ProgressStats } from './learning-module.model';
import { LearningModuleDataService } from './learning-module-data.service';
import { ProgressService } from './progress.service';
export declare class ProgressStatsType {
    total: number;
    completed: number;
    percentage: number;
}
/**
 * GraphQL Resolver - Handles queries and mutations, delegates to services.
 */
export declare class LearningModuleResolver {
    private readonly dataService;
    private readonly progressService;
    constructor(dataService: LearningModuleDataService, progressService: ProgressService);
    getModules(category?: string): LearningModule[];
    toggleModuleCompletion(id: string, completed: boolean): LearningModule;
    getProgress(): ProgressStats;
}
