"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEED_MODULES = void 0;
const learning_module_model_1 = require("./learning-module.model");
/**
 * Seed data with 8 sample learning modules covering all categories
 */
exports.SEED_MODULES = [
    {
        id: '1',
        title: 'Introduction to Machine Learning',
        category: learning_module_model_1.ModuleCategory.AI,
        estimatedMinutes: 45,
        completed: false,
    },
    {
        id: '2',
        title: 'Neural Networks Fundamentals',
        category: learning_module_model_1.ModuleCategory.AI,
        estimatedMinutes: 60,
        completed: false,
    },
    {
        id: '3',
        title: 'Carbon Footprint Reduction Strategies',
        category: learning_module_model_1.ModuleCategory.Sustainability,
        estimatedMinutes: 30,
        completed: false,
    },
    {
        id: '4',
        title: 'Sustainable Supply Chain Management',
        category: learning_module_model_1.ModuleCategory.Sustainability,
        estimatedMinutes: 40,
        completed: false,
    },
    {
        id: '5',
        title: 'Renewable Energy Basics',
        category: learning_module_model_1.ModuleCategory.Sustainability,
        estimatedMinutes: 25,
        completed: false,
    },
    {
        id: '6',
        title: 'Web Development with TypeScript',
        category: learning_module_model_1.ModuleCategory.DigitalSkills,
        estimatedMinutes: 90,
        completed: false,
    },
    {
        id: '7',
        title: 'Cloud Computing Essentials',
        category: learning_module_model_1.ModuleCategory.DigitalSkills,
        estimatedMinutes: 55,
        completed: false,
    },
    {
        id: '8',
        title: 'Data Visualization Techniques',
        category: learning_module_model_1.ModuleCategory.DigitalSkills,
        estimatedMinutes: 35,
        completed: false,
    },
];
//# sourceMappingURL=learning-module.data.js.map