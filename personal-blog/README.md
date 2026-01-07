# Personal Blog Application

A full-stack personal blog application built with modern web technologies. Users can browse blogs, manage favorites, and admins can create, update, and delete blog posts.

## Features

- **Blog Management**
  - Browse paginated blog posts
  - View individual blog details
  - Admin-only create, update, and delete operations

- **Favorites System**
  - Authenticated users can favorite/unfavorite blogs
  - View all favorited blogs in a dedicated page
  - Remove blogs from favorites

- **Authentication**
  - User registration and sign-in
  - Session-based authentication with BetterAuth
  - Admin role-based access control

- **Real-time Data Management**
  - TanStack Query for caching and synchronization
  - Automatic cache invalidation on mutations
  - Loading and error states throughout

## Tech Stack

### Frontend
- **Framework**: React 19
- **Routing**: TanStack Router
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

### Backend
- **Framework**: Hono (lightweight REST API)
- **Database**: Drizzle ORM with SQL
- **Authentication**: BetterAuth
- **Type Safety**: TypeScript
- **Runtime**: Bun

### Shared
- **Type System**: Shared TypeScript types and Zod schemas across frontend/backend
- **Package Manager**: Bun workspaces

## Project Structure

```
personal-blog/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── routes/       # TanStack Router pages
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks (useBlog, useFavourite, useAuth)
│   │   └── lib/          # API client and utilities
│   └── package.json
├── server/               # Hono backend API
│   ├── src/
│   │   ├── routes/       # API routes (blog, admin, favorites)
│   │   ├── db/           # Database schema and connection
│   │   └── utils/        # Auth and utilities
│   └── package.json
├── shared/              # Shared types and schemas
│   └── types.ts        # TypeScript types and Zod schemas
└── package.json        # Root workspace configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ or Bun 1.0+
- SQLite (included in Drizzle setup)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd personal-blog
```

2. Install dependencies
```bash
bun install
```

`.env` add the following
```bash
DATABASE_URL=<your_postgresql_url>
BETTER_AUTH_SECRET=<your_better_auth_secret_key>
NODE_ENV=development # for development
NODE_ENV=production # for production
```

### Development

Run frontend and backend concurrently:

```bash
# Terminal 1 - Frontend (port 5000)
cd frontend
bun run dev

# Terminal 2 - Backend (port 3000)
cd server
bun run dev
```

### Build

```bash
# Build frontend
cd frontend
bun run build

# Build server
cd server
bun run build
```

## API Endpoints

### Blog Routes (`/api/blog`)
- `GET /` - Get paginated blog list
- `GET /:id` - Get single blog by ID
- `POST /:id/fav` - Toggle favorite status (requires auth)

### Admin Routes (`/api/admin`)
- `POST /blog` - Create blog (admin only)
- `PATCH /blog/:id` - Update blog (admin only)
- `DELETE /blog/:id` - Delete blog (admin only)

### Favorites Routes (`/api/fav`)
- `GET /` - Get user's favorite blogs (requires auth)

### Auth Routes (`/api/auth`)
- Handled by BetterAuth integration

## Frontend Routes

- `/` - Home page with blog list
- `/signin` - User sign-in
- `/signup` - User registration
- `/favourites` - Favorite blogs (protected route)
- `/admin` - Create blog form (admin only)

## Database Schema

### Tables
- `user` - User accounts
- `session` - User sessions
- `blog` - Blog posts
- `favourite_blogs` - User's favorite blog mappings

## Type Safety

All components, hooks, and API calls use shared types from `@repo/shared`:
- `Blog` - Blog post type
- `FavouriteBlog` - Favorite blog type
- `SuccessResponse<T>` - API response wrapper
- `PaginatedSuccessResponse<T>` - Paginated API response

Zod schemas validate:
- Blog creation/updates
- Pagination parameters
- API responses

## Error Handling

- **Frontend**: Loading states, error boundaries, user-friendly error messages
- **Backend**: HTTP exception handling with consistent error responses
- **Validation**: Client-side form validation + server-side Zod validation

## Learn More

This project is based on the [Personal Blog Roadmap](https://roadmap.sh/projects/personal-blog). Check out the roadmap for learning objectives and project requirements.
