import { Request, Response } from 'express';
import User from '../models/userModel';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email } = req.body;

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user' });
  }
};
