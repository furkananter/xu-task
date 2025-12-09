"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
/**
 * Business Logic Service (Pure) - Contains only calculation logic.
 * No dependencies, receives data as parameters, easily testable.
 */
let ProgressService = class ProgressService {
    calculateProgress(modules) {
        const total = modules.length;
        if (total === 0) {
            return { total: 0, completed: 0, percentage: 0 };
        }
        const completed = modules.filter((module) => module.completed).length;
        const percentage = Math.round((completed / total) * 100);
        return { total, completed, percentage };
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)()
], ProgressService);
//# sourceMappingURL=progress.service.js.map