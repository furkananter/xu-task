/**
 * Category enum for learning modules
 */
export declare enum ModuleCategory {
    AI = "AI",
    Sustainability = "Sustainability",
    DigitalSkills = "DigitalSkills"
}
/**
 * GraphQL Object Type for Learning Module
 * Used by resolvers to define the schema
 */
export declare class LearningModule {
    id: string;
    title: string;
    category: ModuleCategory;
    estimatedMinutes: number;
    completed: boolean;
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
