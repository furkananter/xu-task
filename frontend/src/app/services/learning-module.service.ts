import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map, filter } from 'rxjs';
import { LearningModule, ProgressStats, ModuleCategory } from '../types/learning-module';
import { GET_MODULES, GET_PROGRESS, TOGGLE_MODULE_COMPLETION } from '../graphql/queries';

interface ModulesQueryResponse {
    modules: LearningModule[];
}

interface ProgressQueryResponse {
    progress: ProgressStats;
}

interface ToggleCompletionResponse {
    toggleModuleCompletion: LearningModule;
}

/**
 * Service that wraps Apollo GraphQL operations for learning modules.
 */
@Injectable({ providedIn: 'root' })
export class LearningModuleService {
    private readonly apollo = inject(Apollo);

    getModules(category?: ModuleCategory): Observable<LearningModule[]> {
        return this.apollo
            .watchQuery<ModulesQueryResponse>({
                query: GET_MODULES,
                variables: { category },
                fetchPolicy: 'cache-and-network',
            })
            .valueChanges.pipe(
                filter((result) => !!result.data),
                map((result) => (result.data as ModulesQueryResponse).modules)
            );
    }

    getProgress(): Observable<ProgressStats> {
        return this.apollo
            .watchQuery<ProgressQueryResponse>({
                query: GET_PROGRESS,
                fetchPolicy: 'cache-and-network',
            })
            .valueChanges.pipe(
                filter((result) => !!result.data),
                map((result) => (result.data as ProgressQueryResponse).progress)
            );
    }

    toggleCompletion(id: string, completed: boolean): Observable<LearningModule> {
        return this.apollo
            .mutate<ToggleCompletionResponse>({
                mutation: TOGGLE_MODULE_COMPLETION,
                variables: { id, completed },
                refetchQueries: [{ query: GET_MODULES }, { query: GET_PROGRESS }],
            })
            .pipe(
                filter((result) => !!result.data),
                map((result) => (result.data as ToggleCompletionResponse).toggleModuleCompletion)
            );
    }
}
