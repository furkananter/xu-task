import { LearningModule, ProgressStats } from './learning-module.model';
import { LearningModuleRepository } from './learning-module.repository';
import { ProgressService } from './progress.service';
import { ToggleCompletionInput } from './dto';
/**
 * GraphQL Resolver - Handles queries and mutations, delegates to services.
 */
export declare class LearningModuleResolver {
    private readonly repository;
    private readonly progressService;
    constructor(repository: LearningModuleRepository, progressService: ProgressService);
    getModules(category?: string): LearningModule[];
    toggleModuleCompletion(input: ToggleCompletionInput): LearningModule;
    getProgress(): ProgressStats;
}
