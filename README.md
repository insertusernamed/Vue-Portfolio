# Daniel Portfolio Frontend

Vue 3 + TypeScript frontend for my personal portfolio.

## Features

- Dynamic project list from a GraphQL backend
- Separate featured and additional project sections
- Client-side caching for GitHub project data
- Optional live screenshots for project demo URLs

## Environment Variables

Create `.env`:

```env
VITE_GRAPHQL_ENDPOINT=https://your-domain/graphql
VITE_SCREENSHOT_API_BASE=http://localhost:8080
```

`VITE_SCREENSHOT_API_BASE` is optional and defaults to `http://localhost:8080`.

## Scripts

```sh
npm install
npm run dev
npm run build
npm run lint
```

## Stack

- Vue 3 + Vue Router
- Pinia
- TypeScript
- Vite
