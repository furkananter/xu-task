import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LearningModule, ProgressStats, ProgressStatsType } from './learning-module.model';
import { LearningModuleRepository } from './learning-module.repository';
import { ProgressService } from './progress.service';
import { ToggleCompletionInput } from './dto';

/**
 * GraphQL Resolver - Handles queries and mutations, delegates to services.
 */
@Resolver(() => LearningModule)
export class LearningModuleResolver {
    constructor(
        private readonly repository: LearningModuleRepository,
        private readonly progressService: ProgressService,
    ) { }

    @Query(() => [LearningModule], { name: 'modules' })
    getModules(
        @Args('category', { type: () => String, nullable: true }) category?: string,
    ): LearningModule[] {
        return this.repository.findAll(category) as LearningModule[];
    }

    @Mutation(() => LearningModule, { name: 'toggleModuleCompletion' })
    toggleModuleCompletion(
        @Args('input') input: ToggleCompletionInput,
    ): LearningModule {
        return this.repository.updateCompletion(input.id, input.completed) as LearningModule;
    }

    @Query(() => ProgressStatsType, { name: 'progress' })
    getProgress(): ProgressStats {
        const modules = this.repository.findAll();
        return this.progressService.calculateProgress(modules);
    }
}
