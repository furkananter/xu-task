import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { LearningModuleModule } from './learning-module/learning-module.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true, // Code-first approach
            playground: true,     // Enable GraphQL Playground
            sortSchema: true,
        }),
        LearningModuleModule,
    ],
})
export class AppModule { }
