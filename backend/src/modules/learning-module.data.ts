import { ILearningModule, ModuleCategory } from './learning-module.model';

/**
 * Seed data with 8 sample learning modules covering all categories
 */
export const SEED_MODULES: ILearningModule[] = [
    {
        id: '1',
        title: 'Introduction to Machine Learning',
        category: ModuleCategory.AI,
        estimatedMinutes: 45,
        completed: false,
    },
    {
        id: '2',
        title: 'Neural Networks Fundamentals',
        category: ModuleCategory.AI,
        estimatedMinutes: 60,
        completed: false,
    },
    {
        id: '3',
        title: 'Carbon Footprint Reduction Strategies',
        category: ModuleCategory.Sustainability,
        estimatedMinutes: 30,
        completed: false,
    },
    {
        id: '4',
        title: 'Sustainable Supply Chain Management',
        category: ModuleCategory.Sustainability,
        estimatedMinutes: 40,
        completed: false,
    },
    {
        id: '5',
        title: 'Renewable Energy Basics',
        category: ModuleCategory.Sustainability,
        estimatedMinutes: 25,
        completed: false,
    },
    {
        id: '6',
        title: 'Web Development with TypeScript',
        category: ModuleCategory.DigitalSkills,
        estimatedMinutes: 90,
        completed: false,
    },
    {
        id: '7',
        title: 'Cloud Computing Essentials',
        category: ModuleCategory.DigitalSkills,
        estimatedMinutes: 55,
        completed: false,
    },
    {
        id: '8',
        title: 'Data Visualization Techniques',
        category: ModuleCategory.DigitalSkills,
        estimatedMinutes: 35,
        completed: false,
    },
];
