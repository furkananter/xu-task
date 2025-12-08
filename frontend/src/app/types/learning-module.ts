/**
 * Category enum for learning modules
 * Matches the backend ModuleCategory enum
 */
export type ModuleCategory = 'AI' | 'Sustainability' | 'DigitalSkills';

/**
 * Learning Module interface
 * Matches the backend LearningModule type
 */
export interface LearningModule {
    id: string;
    title: string;
    category: ModuleCategory;
    estimatedMinutes: number;
    completed: boolean;
}

/**
 * Progress statistics interface
 * Matches the backend ProgressStats type
 */
export interface ProgressStats {
    total: number;
    completed: number;
    percentage: number;
}
