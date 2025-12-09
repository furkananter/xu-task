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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressStatsType = exports.LearningModule = exports.ModuleCategory = void 0;
const graphql_1 = require("@nestjs/graphql");
/**
 * Category enum for learning modules
 */
var ModuleCategory;
(function (ModuleCategory) {
    ModuleCategory["AI"] = "AI";
    ModuleCategory["Sustainability"] = "Sustainability";
    ModuleCategory["DigitalSkills"] = "DigitalSkills";
})(ModuleCategory || (exports.ModuleCategory = ModuleCategory = {}));
(0, graphql_1.registerEnumType)(ModuleCategory, {
    name: 'ModuleCategory',
    description: 'The category of a learning module',
});
/**
 * GraphQL Object Type for Learning Module
 * Used by resolvers to define the schema
 */
let LearningModule = class LearningModule {
    id;
    title;
    category;
    estimatedMinutes;
    completed;
};
exports.LearningModule = LearningModule;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], LearningModule.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], LearningModule.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => ModuleCategory),
    __metadata("design:type", String)
], LearningModule.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], LearningModule.prototype, "estimatedMinutes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], LearningModule.prototype, "completed", void 0);
exports.LearningModule = LearningModule = __decorate([
    (0, graphql_1.ObjectType)()
], LearningModule);
/**
 * GraphQL Object Type for Progress Stats
 */
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
//# sourceMappingURL=learning-module.model.js.map