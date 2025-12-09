# Learning Module Tracker 🎓

A full-stack Education-as-a-Service feature that allows users to track their learning progress across different modules (AI, Sustainability, Digital Skills).

## 🚀 Tech Stack

- **Runtime:** [Bun](https://bun.sh/) (Fast all-in-one execution)
- **Backend:** NestJS + GraphQL (Apollo)
- **Frontend:** Angular 21 + Apollo Angular + [Spartan UI](https://www.spartan.ng/) (Tailwind CSS)
- **Testing:** Vitest (90+ tests covering both ends)

## 📦 Getting Started

### Prerequisites

- You need to have **[Bun](https://bun.sh/)** installed.

### Installation

```bash
bun install      # Install root dependencies
bun run install:all # Install workspace dependencies
```

### Running the App

```bash
bun run dev
```

- **Frontend:** [http://localhost:4200](http://localhost:4200)
- **Backend:** [http://localhost:4000](http://localhost:4000)
- **GraphQL Playground:** [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Running Tests

```bash
bun run test
```

## 🎯 Key Features

- **Real-time Progress:** Visual completion tracking (X/Y modules, % percentage).
- **Filtering:** Toggle between module categories instantly.
- **Glassmorphism UI:** Modern, responsive design with dark mode aesthetics.
- **Optimistic Updates:** Immediate UI feedback before server confirmation.
- **Clean Architecture:**
  - **Backend:** Separation of concerns (Resolver -> Repository -> Service).
  - **Frontend:** Facade pattern (dumb components + smart state management).

## 📁 Project Structure

```
xu-task/
├── backend/
│   └── src/
│       ├── main.ts             # Entry point
│       ├── app.module.ts       # Root module
│       └── learning-module/    # Feature Module
│           ├── learning-module.resolver.ts   # GraphQL Resolver
│           ├── learning-module.repository.ts # Data Access Layer
│           ├── learning-module.model.ts      # Domain Models
│           ├── progress.service.ts           # Business Logic
│           ├── dto/                          # Data Transfer Objects
│           └── data/                         # Seed Data
│
└── frontend/
    └── src/app/
        ├── facades/            # State Management (Facade Pattern)
        ├── services/           # API Integration
        ├── graphql/            # GraphQL Ops
        ├── components/         # Feature Components
        │   ├── module-list/    # Smart Container
        │   └── [ui-components] # Dumb Components
        └── ui/                 # Spartan UI Primitives
```

---

_Built for the XU take-home assignment._
