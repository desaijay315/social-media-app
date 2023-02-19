import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { validate } from 'class-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userRepository = getRepository(User);

  try {
    // Check if user with given email already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with that email already exists' });
    }

    // Create new user
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    // Validate user input
    const validationErrors = await validate(user);
    if (validationErrors.length > 0) {
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }

    // Hash password
    user.password = await bcrypt.hash(password, 10);

    // Save user to database
    await userRepository.save(user);

    // Generate JWT token and return it in response
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    return res.status(201).json({ message: 'User created', user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepository = getRepository(User);

  try {
    // Check if user with given email exists
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token and return it in response
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
    return res.status(200).json({ message: 'Logged in', user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
