import { UserInterface } from '../interfaces/user';
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

  static async login(credentials: string, password: string): Promise<UserInterface> {
    try {
      const user = await User.login({ credentials, password });
      if (!user) {
        throw new Error('Cannot find user or password is incorrect');
      }
      return user as unknown as UserInterface;
    } catch (error) {
      throw new Error('Error logging in: ' + error);
    }
  }

  static async signup(newuser: {
    email: string; password: string; phonenumber: string; 
    firstname: string; lastname: string; joindate: Date; 
    status?: boolean;
    days?: string;
    hours?: string;
    jobdesk?: string;
  }): Promise<UserInterface> {
    try {
      const user = await User.signup(newuser);
      return user as unknown as UserInterface;
    } catch (error) {
      throw new Error('Error signing up: ' + error);
    }
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
