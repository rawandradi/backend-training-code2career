# ExpressProject — TypeScript Express API

## Tech Stack
- Node.js + Express + TypeScript
- Zod for DTO validation
- JWT auth (roles: `ADMIN | COACH | STUDENT`)
- GenericRepository (in-memory; resets on server restart)
- Jest + Supertest + @faker-js/faker for tests

## Quick Start


# 1) Install deps
npm install

# 2) Env (JWT secret)
# If you use dotenv in the app, create .env at repo root:
echo JWT_SECRET=supersecret > .env

# 3) Run API
npm run dev      # or: npm start

# 4) Run tests (Jest + Supertest + Faker)
npm test
