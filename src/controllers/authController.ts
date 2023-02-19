// auth.controller.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../database/entities/User';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Check if user with given email already exists
  const userRepository = getRepository(User);
  const existingUser = await userRepository.findOne({ email });
  if (existingUser) {
    res.status(400).send({ message: 'User with that email already exists' });
    return;
  }

  // Create a new user and save to database
  const user = new User();
  user.email = email;
  user.password = password;
  await userRepository.save(user);

  // Return success message
  res.status(201).send({ message: 'User created successfully' });
};
