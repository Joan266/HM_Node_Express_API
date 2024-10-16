import { UserInterface } from '../interfaces/user';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { APIError } from '../app';

export class UserService {
  static async all() {
    const userData = await User.find().select('-password');
    return userData;
  }

  static async get(id: string) {
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new APIError('Cannot find user', 404, true);
    }
    return user;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      throw new APIError('Incorrect credentials', 401, true);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new APIError('Incorrect credentials', 401, true);
    }

    return user;
  }

  static async create(newUser: {
    email: string;
    password: string;
    phonenumber: string;
    firstname: string;
    lastname: string;
    joindate: Date;
    status?: boolean;
    description?: string;
    photourl?: string;
    jobdesk?: string;
  }) {
    const { email, password, phonenumber, firstname, lastname, joindate, ...rest } = newUser;

    if (!email || !password || !phonenumber || !firstname || !lastname || !joindate) {
      throw new APIError('All fields must be filled', 400, true);
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phonenumber }]
    });
    
    if (existingUser) {
      if (existingUser.email === email) {
        throw new APIError('Email already in use', 409, true);
      } else if (existingUser.phonenumber === phonenumber) {
        throw new APIError('Phone number already in use', 409, true);
      }
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({
        email,
        password: hash,
        phonenumber,
        firstname,
        lastname,
        joindate,
        ...rest,
      });

      return user;
    } catch (err) {
      throw new APIError('Error creating user', 500, false);
    }
  }

  static async update(id: string, updateParameters: Partial<UserInterface>) {
    const updatedUser = await User.findByIdAndUpdate(id, updateParameters, { new: true }).select('-password');
    if (!updatedUser) {
      throw new APIError('Cannot find user to update', 404, true);
    }
    return updatedUser;
  }

  static async delete(id: string) {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new APIError('Cannot find user to delete', 404, true);
    }
    console.log(`User with id ${id} deleted`);
  }
}
