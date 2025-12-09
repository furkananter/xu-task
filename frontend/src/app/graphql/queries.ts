import { gql } from 'apollo-angular';

/**
 * GraphQL query to fetch all modules with optional category filter
 */
export const GET_MODULES = gql`
  query GetModules($category: String) {
    modules(category: $category) {
      id
      title
      category
      estimatedMinutes
      completed
    }
  }
`;

/**
 * GraphQL query to fetch progress statistics
 */
export const GET_PROGRESS = gql`
  query GetProgress {
    progress {
      total
      completed
      percentage
    }
  }
`;

/**
 * GraphQL mutation to toggle module completion
 */
export const TOGGLE_MODULE_COMPLETION = gql`
  mutation ToggleModuleCompletion($id: ID!, $completed: Boolean!) {
    toggleModuleCompletion(input: { id: $id, completed: $completed }) {
      id
      title
      category
      estimatedMinutes
      completed
    }
  }
`;
