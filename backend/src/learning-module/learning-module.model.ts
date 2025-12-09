import { registerEnumType, ObjectType, Field, ID } from '@nestjs/graphql';

/**
 * Category enum for learning modules
 */
export enum ModuleCategory {
    AI = 'AI',
    Sustainability = 'Sustainability',
    DigitalSkills = 'DigitalSkills',
}

registerEnumType(ModuleCategory, {
    name: 'ModuleCategory',
    description: 'The category of a learning module',
});

/**
 * GraphQL Object Type for Learning Module
 * Used by resolvers to define the schema
 */
@ObjectType()
export class LearningModule {
    @Field(() => ID)
    id!: string;

    @Field()
    title!: string;

    @Field(() => ModuleCategory)
    category!: ModuleCategory;

    @Field()
    estimatedMinutes!: number;

    @Field()
    completed!: boolean;
}

/**
 * Plain TypeScript interface for internal use
 * Used by services that don't need GraphQL decorators
 */
export interface ILearningModule {
    id: string;
    title: string;
    category: ModuleCategory;
    estimatedMinutes: number;
    completed: boolean;
}

/**
 * Progress statistics returned by the business logic service
 */
export interface ProgressStats {
    total: number;
    completed: number;
    percentage: number;
}

/**
 * GraphQL Object Type for Progress Stats
 */
@ObjectType()
export class ProgressStatsType implements ProgressStats {
    @Field()
    total!: number;

    @Field()
    completed!: number;

    @Field()
    percentage!: number;
}
