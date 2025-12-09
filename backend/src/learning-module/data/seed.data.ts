import { ILearningModule, ModuleCategory } from '../learning-module.model';

/**
 * Seed data for learning modules.
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
        title: 'Sustainable Energy Solutions',
        category: ModuleCategory.Sustainability,
        estimatedMinutes: 30,
        completed: false,
    },
    {
        id: '4',
        title: 'Carbon Footprint Reduction',
        category: ModuleCategory.Sustainability,
        estimatedMinutes: 40,
        completed: false,
    },
    {
        id: '5',
        title: 'Circular Economy Principles',
        category: ModuleCategory.Sustainability,
        estimatedMinutes: 35,
        completed: false,
    },
    {
        id: '6',
        title: 'Cloud Computing Essentials',
        category: ModuleCategory.DigitalSkills,
        estimatedMinutes: 50,
        completed: false,
    },
    {
        id: '7',
        title: 'Cybersecurity Basics',
        category: ModuleCategory.DigitalSkills,
        estimatedMinutes: 55,
        completed: false,
    },
    {
        id: '8',
        title: 'Data Analytics with Python',
        category: ModuleCategory.DigitalSkills,
        estimatedMinutes: 65,
        completed: false,
    },
];
