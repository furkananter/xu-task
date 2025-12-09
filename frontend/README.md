# 🎓 Learning Platform Frontend

A modern, responsive web application built with **Angular**, **TypeScript**, and **Tailwind CSS**. This project features a unique **Glassmorphism** UI design, powered by **Spartan UI** primitives for accessibility and robust interactions.

## ✨ Features

- **📚 Module Management**: View a list of available learning modules with details like category and duration.
- **✅ Progress Tracking**: Mark modules as completed/incomplete with instant visual feedback and optimistic UI updates.
- **📊 Real-time Statistics**: View completion percentage and module counts dynamically.
- **🎨 Modern UI/UX**:
  - **Glassmorphism Design**: Translucent cards, subtle gradients, and blur effects atop a deep, rich background.
  - **Responsive Layout**: Optimized for various screen sizes using Tailwind's utility-first approach.
  - **Interactive Elements**: Hover effects, smooth transitions, and accessible focus states.
  - **Category Branding**: Unique color indicators for 'AI', 'Sustainability', and 'Digital Skills'.
- **🔌 GraphQL Integration**: Efficient data fetching using **Apollo Angular**.

## 🛠️ Tech Stack

- **Framework**: [Angular](https://angular.io/) (v21)
- **Runtime**: [Bun](https://bun.sh/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/) (Utility-first framework)
  - Custom CSS Variables for Glassmorphism effects
- **UI Component Primitives**: [Spartan UI](https://www.spartan.ng/) (brain)
- **State Management**: Facade Pattern with Signals
- **API Client**: Apollo Angular (GraphQL)
- **Testing**: Vitest

## 🚀 Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** (Recommended) or Node.js v18+

### Installation

Navigate to the project root and install dependencies:

```bash
bun install
```

### Running the Application

Start the frontend development server:

```bash
cd frontend
bun run start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The app requires the backend execution (GraphQL API) to function fully.

## 🧪 Testing

Run unit tests with Vitest:

```bash
bun run test
```

## 📂 Project Structure

```
src/
├── app/
│   ├── components/         # Feature Components
│   │   ├── module-list/    # Smart Container (integrates Facade)
│   │   └── ui/             # Dumb/UI Components (Cards, Pills)
│   ├── facades/            # State Management & Business Logic
│   ├── graphql/            # GraphQL Queries & Mutations
│   ├── services/           # Api Services
│   └── ui/                 # Spartan UI primitives (headless)
├── assets/                 # Static resources
└── styles.css              # Global styles & Glassmorphism overrides
```

## 🎨 Design System

The application combines Tailwind's utility classes with custom CSS for the glass effect:

- **Primary Colors**: Deep purples and blues (`bg-slate-900` variations).
- **Glass Effect**: `backdrop-blur-xl` combined with `bg-white/10` and `border-white/20`.
- **Status Indicators**:
  - 🟢 **Success**: Green for completed items.
  - 🟠 **Warmth**: Orange for 'Sustainability'.
  - 🔵 **Tech**: Blue for 'AI'.
  - 🟣 **Core**: Purple for 'Digital Skills'.

---

_Built as part of the Full-Stack Take-Home Assignment._
