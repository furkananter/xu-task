import { Resolver, Query, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { LearningModule, ProgressStats } from './learning-module.model';
import { LearningModuleDataService } from './learning-module-data.service';
import { ProgressService } from './progress.service';

/**
 * GraphQL Object Type for Progress Statistics
 */
@ObjectType()
export class ProgressStatsType {
    @Field()
    total!: number;

    @Field()
    completed!: number;

    @Field()
    percentage!: number;
}

/**
 * Resolver Layer (Layer 1)
 * 
 * Handles GraphQL queries and mutations.
 * Delegates all logic to the appropriate services.
 * Contains NO business logic - only GraphQL interface concerns.
 */
@Resolver(() => LearningModule)
export class LearningModuleResolver {
    constructor(
        private readonly dataService: LearningModuleDataService,
        private readonly progressService: ProgressService,
    ) { }

    /**
     * Returns all learning modules, optionally filtered by category
     * @param category - Optional category filter (AI, Sustainability, DigitalSkills)
     */
    @Query(() => [LearningModule], {
        name: 'modules',
        description: 'Fetches all learning modules, optionally filtered by category',
    })
    getModules(
        @Args('category', { type: () => String, nullable: true }) category?: string,
    ): LearningModule[] {
        return this.dataService.findAll(category) as LearningModule[];
    }

    /**
     * Toggles or sets the completion status of a module
     * @param id - The module ID
     * @param completed - The new completion status
     */
    @Mutation(() => LearningModule, {
        name: 'toggleModuleCompletion',
        description: 'Updates the completion status of a learning module',
    })
    toggleModuleCompletion(
        @Args('id', { type: () => String }) id: string,
        @Args('completed', { type: () => Boolean }) completed: boolean,
    ): LearningModule {
        return this.dataService.updateCompletion(id, completed) as LearningModule;
    }

    /**
     * Returns progress statistics for all modules
     */
    @Query(() => ProgressStatsType, {
        name: 'progress',
        description: 'Fetches progress statistics for all modules',
    })
    getProgress(): ProgressStats {
        const modules = this.dataService.findAll();
        return this.progressService.calculateProgress(modules);
    }
}
