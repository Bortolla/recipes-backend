# Recipes API

This project is REST API built with Node.js + Express.js + TypeScript + Prisma + MongoDB (running on an Atlas instance)

# Project Structure

```txt
.
├── package.json
├── package-lock.json
├── server
│   ├── controllers
│   │   └── recipesController.ts
│   ├── data
│   │   └── recipesData.ts
│   ├── dtos
│   │   └── responseDto.ts
│   ├── infra
│   │   └── prisma
│   │       └── schema.prisma
│   ├── middlewares
│   │   └── uploadMiddleware.ts
│   ├── routes
│   │   └── recipesRoute.ts
│   ├── services
│   │   └── recipesService.ts
│   ├── server.ts
├── tsconfig.json
└── uploads
```

Basically, we have the server.ts, where the server is instantiated.

This is what the flux of data looks like:

1. we got the routes layer, where all endpoints are defined;
2. then body of requests and responses are trated in the controllers layer;
3. once the request body has been treated accordingly, then the data gets delegated to the services layer, where all the business logic lives;
4. then we got the data layer, where all the database queries are done.

# Database

- This project uses MongoDB and **Prisma** and, Prisma requires MongoDB to run with replica-set enabled, so, for convenience, I decided to host the database in a free cluster on Atlas. But, if you do decide to run the database locally, make sure to run MongoDB with replica-set enabled.

- The prisma schema is located at **/server/infra/prisma/schema.prisma**, which is a custom path, so, all Prisma commands are aliased with --schema='./server/infra/prisma/schema.prisma'

To **generate** the Prisma client, run the following command:

```bash
npm run prisma:generate
```
