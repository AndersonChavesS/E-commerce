// src/index.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/register', async (req, res) => {
  const { name, cpf, email, password, userType } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      cpf,
      email,
      password: hashedPassword,
      userType,
    },
  });
  res.json(user);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// src/index.ts
app.post('/products', async (req, res) => {
  const { name, description, price, stock } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      stock,
    },
  });
  res.json(product);
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
      price,
      stock,
    },
  });
  res.json(product);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.product.delete({
    where: { id: Number(id) },
  });
  res.json({ message: 'Product deleted' });
});