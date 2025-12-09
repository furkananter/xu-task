import { Module } from '@nestjs/common';
import { LearningModuleResolver } from './learning-module.resolver';
import { LearningModuleRepository } from './learning-module.repository';
import { ProgressService } from './progress.service';

@Module({
    providers: [
        LearningModuleResolver,
        LearningModuleRepository,
        ProgressService,
    ],
    exports: [LearningModuleRepository, ProgressService],
})
export class LearningModuleModule { }
