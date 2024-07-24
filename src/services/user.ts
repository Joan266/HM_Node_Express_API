import { UserInterface } from '../interfaces/user';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user';

export class UserService {

  static async getUserList(): Promise<UserInterface[]> {
    try {
      const userData = await User.find();
      return userData as unknown as UserInterface[];
    } catch (error) {
      throw new Error('Error retrieving user list: ' + error);
    }
  }

  static async getUser(id: string): Promise<UserInterface> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('Cannot find user');
      }
      return user as unknown as UserInterface;
    } catch (error) {
      throw new Error('Error retrieving user: ' + error);
    }
  }

  static async login(email: string, password: string): Promise<UserInterface> {


    let user = await User.findOne({ 'email': email });

    if (!user) {
      throw Error('Incorrect credentials');
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error('Incorrect credentials');
    }

    return user;
  };


  static async signup(newuser: {
    email: string; password: string; phonenumber: string;
    firstname: string; lastname: string; joindate: Date;
    status?: boolean;
    days?: string;
    hours?: string;
    jobdesk?: string;
  }): Promise<UserInterface> {
    const { email, password, phonenumber, firstname, lastname, joindate, ...rest } = newuser;

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
      _id: new mongoose.Types.ObjectId(),
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

  static async updateuser(id: string, updateParameters: Partial<UserInterface>): Promise<UserInterface> {
    try {
      const updateduser = await User.findByIdAndUpdate(id, updateParameters, { new: true });
      if (!updateduser) {
        throw new Error('Cannot find user to update');
      }
      return updateduser as unknown as UserInterface;
    } catch (error) {
      throw new Error('Error updating user: ' + error);
    }
  }

  static async deleteuser(id: string): Promise<void> {
    try {
      const deleteduser = await User.findByIdAndDelete(id);
      if (!deleteduser) {
        throw new Error('Cannot find user to delete');
      }
      console.log(`user with id ${id} deleted`);
    } catch (error) {
      throw new Error('Error deleting user: ' + error);
    }
  }
}
