"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningModuleResolver = exports.ProgressStatsType = void 0;
const graphql_1 = require("@nestjs/graphql");
const learning_module_model_1 = require("./learning-module.model");
const learning_module_data_service_1 = require("./learning-module-data.service");
const progress_service_1 = require("./progress.service");
let ProgressStatsType = class ProgressStatsType {
    total;
    completed;
    percentage;
};
exports.ProgressStatsType = ProgressStatsType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ProgressStatsType.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ProgressStatsType.prototype, "completed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ProgressStatsType.prototype, "percentage", void 0);
exports.ProgressStatsType = ProgressStatsType = __decorate([
    (0, graphql_1.ObjectType)()
], ProgressStatsType);
/**
 * GraphQL Resolver - Handles queries and mutations, delegates to services.
 */
let LearningModuleResolver = class LearningModuleResolver {
    dataService;
    progressService;
    constructor(dataService, progressService) {
        this.dataService = dataService;
        this.progressService = progressService;
    }
    getModules(category) {
        return this.dataService.findAll(category);
    }
    toggleModuleCompletion(id, completed) {
        return this.dataService.updateCompletion(id, completed);
    }
    getProgress() {
        const modules = this.dataService.findAll();
        return this.progressService.calculateProgress(modules);
    }
};
exports.LearningModuleResolver = LearningModuleResolver;
__decorate([
    (0, graphql_1.Query)(() => [learning_module_model_1.LearningModule], { name: 'modules' }),
    __param(0, (0, graphql_1.Args)('category', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], LearningModuleResolver.prototype, "getModules", null);
__decorate([
    (0, graphql_1.Mutation)(() => learning_module_model_1.LearningModule, { name: 'toggleModuleCompletion' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __param(1, (0, graphql_1.Args)('completed', { type: () => Boolean })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", learning_module_model_1.LearningModule)
], LearningModuleResolver.prototype, "toggleModuleCompletion", null);
__decorate([
    (0, graphql_1.Query)(() => ProgressStatsType, { name: 'progress' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], LearningModuleResolver.prototype, "getProgress", null);
exports.LearningModuleResolver = LearningModuleResolver = __decorate([
    (0, graphql_1.Resolver)(() => learning_module_model_1.LearningModule),
    __metadata("design:paramtypes", [learning_module_data_service_1.LearningModuleDataService,
        progress_service_1.ProgressService])
], LearningModuleResolver);
//# sourceMappingURL=learning-module.resolver.js.map