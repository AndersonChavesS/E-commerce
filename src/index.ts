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
