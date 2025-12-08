import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map, filter } from 'rxjs';
import { LearningModule, ProgressStats, ModuleCategory } from '../types/learning-module';
import { GET_MODULES, GET_PROGRESS, TOGGLE_MODULE_COMPLETION } from '../graphql/queries';

/**
 * Response type for modules query
 */
interface ModulesQueryResponse {
    modules: LearningModule[];
}

/**
 * Response type for progress query
 */
interface ProgressQueryResponse {
    progress: ProgressStats;
}

/**
 * Response type for toggle completion mutation
 */
interface ToggleCompletionResponse {
    toggleModuleCompletion: LearningModule;
}

/**
 * Angular service that wraps Apollo GraphQL operations.
 * 
 * This service acts as the interface between Angular components and the GraphQL API.
 * It keeps all GraphQL logic in one place, following separation of concerns.
 */
@Injectable({
    providedIn: 'root'
})
export class LearningModuleService {
    private readonly apollo = inject(Apollo);

    /**
     * Fetches all learning modules, optionally filtered by category
     * @param category - Optional category filter
     * @returns Observable of LearningModule array
     */
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

    /**
     * Fetches progress statistics for all modules
     * @returns Observable of ProgressStats
     */
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

    /**
     * Toggles the completion status of a module
     * @param id - The module ID
     * @param completed - The new completion status
     * @returns Observable of the updated LearningModule
     */
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
