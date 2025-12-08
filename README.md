# Learning Module Tracker

A full-stack Education-as-a-Service feature allowing users to view learning modules, track completion, and see progress statistics.

## 🚀 Tech Stack

| Layer          | Technology                                   |
| -------------- | -------------------------------------------- |
| **Runtime**    | Bun                                          |
| **Backend**    | NestJS + GraphQL (Apollo Server, code-first) |
| **Frontend**   | Angular 21 + Apollo Angular                  |
| **Language**   | TypeScript end-to-end                        |
| **Data Store** | In-memory                                    |
| **Testing**    | Vitest                                       |

## 📦 Installation

```bash
# Install root dependencies
bun install

# Install all workspace dependencies
bun run install:all
```

## 🏃 Running the Application

### Development Mode (Both Apps Concurrently)

```bash
bun run dev
```

This starts:

- **Backend**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000/graphql
- **Frontend**: http://localhost:4200

### Run Individually

```bash
# Backend only
bun run dev:backend

# Frontend only
bun run dev:frontend
```

## 🧪 Testing

### Run All Tests

```bash
bun run test
```

### Run Tests Individually

```bash
# Backend tests (41 tests)
bun run test:backend

# Frontend tests (49 tests)
bun run test:frontend
```

**Total: 90 tests** covering all services, components, and edge cases.

## 📁 Project Structure

```
xu-task/
├── backend/                    # NestJS GraphQL API
│   └── src/
│       ├── main.ts             # App bootstrap with CORS
│       ├── app.module.ts       # Root module with GraphQL config
│       └── modules/
│           ├── learning-module.model.ts      # Types & GraphQL decorators
│           ├── learning-module.data.ts       # Seed data (8 modules)
│           ├── learning-module-data.service.ts    # Layer 2: CRUD operations
│           ├── progress.service.ts           # Layer 3: PURE business logic
│           ├── learning-module.resolver.ts   # Layer 1: GraphQL interface
│           └── *.spec.ts                     # Unit tests
│
├── frontend/                   # Angular 21 SPA
│   └── src/app/
│       ├── types/              # TypeScript interfaces
│       ├── graphql/            # GraphQL queries & mutations
│       ├── services/           # Apollo Angular wrapper
│       └── components/         # UI components
│
└── package.json                # Root monorepo config
```

## 🏗️ Architecture

### Three-Layer Backend (SRP)

```
┌─────────────────────────────────────────────────┐
│               GraphQL Resolver                   │
│        (Layer 1 - Interface only)               │
└──────────────────────┬──────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
┌────────────────────┐    ┌────────────────────┐
│   Data Service     │    │  Progress Service  │
│ (Layer 2 - CRUD)   │    │ (Layer 3 - PURE)   │
└────────────────────┘    └────────────────────┘
```

- **Resolver Layer**: Only GraphQL interface concerns
- **Data Service Layer**: CRUD operations on in-memory store
- **Progress Service**: **PURE** business logic - no dependencies, receives data as parameters

### GraphQL API

**Queries:**

- `modules(category: String): [LearningModule!]!` - Fetch modules with optional filter
- `progress: ProgressStats!` - Get completion statistics

**Mutation:**

- `toggleModuleCompletion(id: String!, completed: Boolean!): LearningModule!`

## 🎯 Features

- ✅ View 8 sample learning modules across 3 categories
- ✅ Toggle completion status for any module
- ✅ Real-time progress summary (X of Y completed, Z%)
- ✅ Filter modules by category (AI, Sustainability, Digital Skills)
- ✅ Beautiful dark theme UI with animations
- ✅ Loading and error states
- ✅ 100% test pass rate

## ⚖️ Trade-offs & Assumptions

1. **In-memory data**: Data resets on server restart (as specified)
2. **Spartan UI**: Used vanilla CSS for the UI instead of Spartan as Angular 21 compatibility was uncertain
3. **Pure unit tests**: Frontend tests use pure unit tests instead of Angular TestBed due to Vitest compatibility with Angular 21
4. **No authentication**: Simplified for the assignment scope

## 🔮 What I Would Improve With More Time

1. **Database persistence**: Add MongoDB with Mongoose
2. **Authentication**: Implement JWT-based auth
3. **E2E tests**: Add Playwright or Cypress tests
4. **Pagination**: For larger module lists
5. **Real-time updates**: WebSocket subscription for multi-user sync
6. **Accessibility**: Full WCAG compliance
7. **Animation polish**: More micro-interactions
8. **Error boundaries**: More granular error handling

## 📝 Sample GraphQL Queries

```graphql
# Get all modules
query GetModules {
  modules {
    id
    title
    category
    estimatedMinutes
    completed
  }
}

# Get AI modules only
query GetAIModules {
  modules(category: "AI") {
    id
    title
    completed
  }
}

# Get progress
query GetProgress {
  progress {
    total
    completed
    percentage
  }
}

# Toggle completion
mutation ToggleModule {
  toggleModuleCompletion(id: "1", completed: true) {
    id
    completed
  }
}
```

---

Built with ❤️ for the XU take-home assignment
