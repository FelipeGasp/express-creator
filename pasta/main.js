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

//ADD PUT DELETE ETC ENDMAPPINGS BELOW

// Server setup
const port = 3000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
