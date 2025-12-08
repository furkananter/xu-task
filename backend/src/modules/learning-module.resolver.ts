import { Resolver, Query, Mutation, Args, ObjectType, Field } from '@nestjs/graphql';
import { LearningModule, ProgressStats } from './learning-module.model';
import { LearningModuleDataService } from './learning-module-data.service';
import { ProgressService } from './progress.service';

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
 * GraphQL Resolver - Handles queries and mutations, delegates to services.
 */
@Resolver(() => LearningModule)
export class LearningModuleResolver {
    constructor(
        private readonly dataService: LearningModuleDataService,
        private readonly progressService: ProgressService,
    ) { }

    @Query(() => [LearningModule], { name: 'modules' })
    getModules(
        @Args('category', { type: () => String, nullable: true }) category?: string,
    ): LearningModule[] {
        return this.dataService.findAll(category) as LearningModule[];
    }

    @Mutation(() => LearningModule, { name: 'toggleModuleCompletion' })
    toggleModuleCompletion(
        @Args('id', { type: () => String }) id: string,
        @Args('completed', { type: () => Boolean }) completed: boolean,
    ): LearningModule {
        return this.dataService.updateCompletion(id, completed) as LearningModule;
    }

    @Query(() => ProgressStatsType, { name: 'progress' })
    getProgress(): ProgressStats {
        const modules = this.dataService.findAll();
        return this.progressService.calculateProgress(modules);
    }
}
