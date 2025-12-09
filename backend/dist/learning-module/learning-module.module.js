"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningModuleModule = void 0;
const common_1 = require("@nestjs/common");
const learning_module_resolver_1 = require("./learning-module.resolver");
const learning_module_repository_1 = require("./learning-module.repository");
const progress_service_1 = require("./progress.service");
let LearningModuleModule = class LearningModuleModule {
};
exports.LearningModuleModule = LearningModuleModule;
exports.LearningModuleModule = LearningModuleModule = __decorate([
    (0, common_1.Module)({
        providers: [
            learning_module_resolver_1.LearningModuleResolver,
            learning_module_repository_1.LearningModuleRepository,
            progress_service_1.ProgressService,
        ],
        exports: [learning_module_repository_1.LearningModuleRepository, progress_service_1.ProgressService],
    })
], LearningModuleModule);
//# sourceMappingURL=learning-module.module.js.map