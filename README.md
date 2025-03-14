# Express-Creator-Tool

This project is an NPX script designed to scaffold a basic Node.js RESTful API using **Express** and **Prisma** with **MySQL**. The generated API includes a basic structure with routes for handling items from a MySQL database.

## Features

- Simple setup for an Express-based REST API.
- Prisma ORM integration with MySQL.
- Auto-generated project structure using ES6 modules.
- Basic routing structure prepared for customization.

## Requirements

- Node.js (v14.x or later)
- NPM
- MySQL database (local or remote)

## Installation & Usage

### 1. Global Installation via NPX (Recommended)

You can run the script directly using NPX without installing globally:

```bash
npx ep-creator-tool <project-name>
```
### 2. Local Setup (For Development)

If you want to clone this repository and work on the project locally:

1. Clone the repository:

```bash
git clone https://github.com/FelipeGasp/express-creator.git
cd /express-creator
```
2. Install dependencies:

```bash
npm install
```
3. Link the package locally for testing
```bash
npm link
```
4. Run the script locally
```bash
express-create <project-name>
```
## Generated Project Structure
When you run the script, it will generate the following structure in your project folder:
```pgsql
<project-name>/
├── main.js          # Basic Express server setup (using ES6 import syntax)
├── prisma/
│   └── schema.prisma # Prisma schema for MySQL
└── package.json      # Project dependencies
```

### Example Code
Here’s a simplified main.js file generated in your project using ES6 module syntax:
```js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Example routing structure for "items"
app.get('/items', async (req, res) => {
  res.json({ message: 'GET /items' });
});


app.post('/items', async (req, res) => {
  res.json({ message: 'POST /items' });
});

// Server setup
const port = 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
```
You can customize this structure to add your own logic for handling CRUD operations.

### Prisma Setup with MySQL
After generating the project, you'll need to set up Prisma to work with MySQL.

   1. Empty Prisma schema:

Here’s the default prisma/schema.prisma that will be generated:
```prisma
// Prisma schema file

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL") // Set your MySQL connection string in .env
}

generator client {
  provider = "prisma-client-js"
}

// Define your models here

```
2. Configure MySQL configuration:

Add your MySQL connection string to the .env file. Here’s an example .env configuration:

```mysql
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```
Replace USER, PASSWORD, HOST, PORT, and DATABASE with your MySQL configuration.

3. Initialize Prisma:

Run the following commands to initialize Prisma in your project and set up the MySQL database:
```prisma
npx prisma init
npx prisma migrate dev --name init
```

4. Generate Prisma Client:
After setting up the schema, generate the Prisma client:
```bash
npx prisma generate
```
Now you're ready to run your Express server connected to the MySQL database!

## Running the API
To run the API, use the following command:

```bash
npm run start
```
This will start the server, and your API will be accessible at http://localhost:3000.

## License
This project is licensed under the Open Source license. However, citation is required if you use or modify this project in any way.
Please include this citation in any archive you have been using:
```bash
Author: Felipe Gasparotto(FelipeGasp)
GitHub Repository: https://github.com/FelipeGasp/express-creator
Year: 2025
```