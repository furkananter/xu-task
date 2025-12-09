"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningModuleRepository = void 0;
const common_1 = require("@nestjs/common");
const learning_module_model_1 = require("./learning-module.model");
const data_1 = require("./data");
/**
 * Repository Layer - Handles CRUD operations on in-memory data store.
 */
let LearningModuleRepository = class LearningModuleRepository {
    modules = [...data_1.SEED_MODULES];
    findAll(category) {
        if (!category) {
            return [...this.modules];
        }
        const validCategories = Object.values(learning_module_model_1.ModuleCategory);
        if (!validCategories.includes(category)) {
            return [];
        }
        return this.modules.filter((module) => module.category === category);
    }
    findById(id) {
        return this.modules.find((module) => module.id === id) || null;
    }
    updateCompletion(id, completed) {
        const moduleIndex = this.modules.findIndex((module) => module.id === id);
        if (moduleIndex === -1) {
            throw new common_1.NotFoundException(`Module with ID "${id}" not found`);
        }
        this.modules[moduleIndex] = {
            ...this.modules[moduleIndex],
            completed,
        };
        return { ...this.modules[moduleIndex] };
    }
    reset() {
        this.modules = [...data_1.SEED_MODULES];
    }
};
exports.LearningModuleRepository = LearningModuleRepository;
exports.LearningModuleRepository = LearningModuleRepository = __decorate([
    (0, common_1.Injectable)()
], LearningModuleRepository);
//# sourceMappingURL=learning-module.repository.js.map