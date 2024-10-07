import { UserInterface } from '../interfaces/user';
import bcrypt from 'bcrypt';
import User from '../models/user';

export class UserService {

  static async all() {
    const userData = await User.find().select('-password');
    return userData;
  }

  static async get(id: string) {
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new Error('Cannot find user');
    }
    return user;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      throw new Error('Incorrect credentials');
    }

    const match = bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Incorrect credentials');
    }

    return user;
  }


  static async create(newUser: {
    email: string; password: string; phonenumber: string;
    firstname: string; lastname: string; joindate: Date;
    status?: boolean;
    description?: string;
    photourl?: string;
    jobdesk?: string;
  }) {
    const { email, password, phonenumber, firstname, lastname, joindate, ...rest } = newUser;

    if (!email || !password || !phonenumber || !firstname || !lastname || !joindate) {
      throw new Error('All fields must be filled');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error('email already in use');
    }

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
  }

  static async update(id: string, updateParameters: Partial<UserInterface>) {
    const updateduser = await User.findByIdAndUpdate(id, updateParameters, { new: true }).select('-password');
    if (!updateduser) {
      throw new Error('Cannot find user to update');
    }
    return updateduser as unknown as UserInterface;
  }

  static async delete(id: string) {
    const deleteduser = await User.findByIdAndDelete(id);
    if (!deleteduser) {
      throw new Error('Cannot find user to delete');
    }
    console.log(`user with id ${id} deleted`);
  }
}
