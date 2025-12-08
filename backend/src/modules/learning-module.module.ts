import { Module } from '@nestjs/common';
import { LearningModuleResolver } from './learning-module.resolver';
import { LearningModuleDataService } from './learning-module-data.service';
import { ProgressService } from './progress.service';

@Module({
    providers: [
        LearningModuleResolver,
        LearningModuleDataService,
        ProgressService,
    ],
    exports: [LearningModuleDataService, ProgressService],
})
export class LearningModuleModule { }
