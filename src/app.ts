import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { Comment } from './entities/Comment';
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
import { postRoutes } from './routes/postRoutes';
import { commentRoutes } from './routes/commentRoutes';

createConnection({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: true,
  entities: [User, Post, Comment],
}).then(() => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/comments', commentRoutes);

  // Start server
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
