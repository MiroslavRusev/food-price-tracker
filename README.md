# Food Price Tracker

A modern web application for tracking and visualizing food prices over time. Built with SvelteKit, TypeScript, and Chart.js.

## Features

- Interactive price charts with multiple time ranges (30 days to 10 years)
- Track various food items including flour, cooking oil, sugar, vegetables, meat, and dairy
- Responsive design with Tailwind CSS
- Fast and lightweight SvelteKit application
- Beautiful UI with smooth animations

## Tech Stack

- **Frontend**: SvelteKit 5, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with svelte5-chartjs
- **Build Tool**: Vite
- **Package Manager**: Yarn

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd svetle
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn check` - Type check the project
- `yarn lint` - Run ESLint and Prettier
- `yarn format` - Format code with Prettier

## Project Structure

```
src/
├── components/          # Reusable Svelte components
│   ├── chart.svelte    # Chart.js integration
│   ├── dataRange.svelte # Time range selector
│   └── foodItems.svelte # Food item selector
├── lib/
│   └── data.ts         # Data models and chart generation
├── routes/             # SvelteKit pages
└── styles/             # Global styles
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
