import { ILearningModule } from './learning-module.model';
/**
 * Repository Layer - Handles CRUD operations on in-memory data store.
 */
export declare class LearningModuleRepository {
    private modules;
    findAll(category?: string): ILearningModule[];
    findById(id: string): ILearningModule | null;
    updateCompletion(id: string, completed: boolean): ILearningModule;
    reset(): void;
}
