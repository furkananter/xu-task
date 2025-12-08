import { ILearningModule } from './learning-module.model';
/**
 * Data Service Layer - Handles CRUD operations on in-memory data store.
 */
export declare class LearningModuleDataService {
    private modules;
    findAll(category?: string): ILearningModule[];
    findById(id: string): ILearningModule | null;
    updateCompletion(id: string, completed: boolean): ILearningModule;
    reset(): void;
}
