import { EmployeeInterface } from '../interfaces/employee';
import  Employee from '../models/employee';

export class EmployeeService {

  static async getEmployeeList(): Promise<EmployeeInterface[]> {
    try {
      const employeeData = await Employee.find();
      return employeeData as unknown as EmployeeInterface[];
    } catch (error) {
      throw new Error('Error retrieving employee list: ' + error);
    }
  }

  static async getEmployee(id: string): Promise<EmployeeInterface> {
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error('Cannot find employee');
      }
      return employee as unknown as EmployeeInterface;
    } catch (error) {
      throw new Error('Error retrieving employee: ' + error);
    }
  }

  static async login(credentials: string, password: string): Promise<EmployeeInterface> {
    try {
      const employee = await Employee.login({ credentials, password });
      if (!employee) {
        throw new Error('Cannot find employee or password is incorrect');
      }
      return employee as unknown as EmployeeInterface;
    } catch (error) {
      throw new Error('Error logging in: ' + error);
    }
  }

  static async signup({ email, password, phonenumber, firstname, lastname, joindate }:
    { email: string; password: string; phonenumber: string; firstname: string; lastname: string; joindate: Date }): Promise<EmployeeInterface> {
    try {
      const employee = await Employee.signup({ email, password, phonenumber, firstname, lastname, joindate });
      if (!employee) {
        throw new Error('Error signing up');
      }
      return employee as unknown as EmployeeInterface;
    } catch (error) {
      throw new Error('Error signing up: ' + error);
    }
  }

  static async updateEmployee(id: string, updateParameters: Partial<EmployeeInterface>): Promise<EmployeeInterface> {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(id, updateParameters, { new: true });
      if (!updatedEmployee) {
        throw new Error('Cannot find employee to update');
      }
      return updatedEmployee as unknown as EmployeeInterface;
    } catch (error) {
      throw new Error('Error updating employee: ' + error);
    }
  }

  static async deleteEmployee(id: string): Promise<void> {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if (!deletedEmployee) {
        throw new Error('Cannot find employee to delete');
      }
      console.log(`Employee with id ${id} deleted`);
    } catch (error) {
      throw new Error('Error deleting employee: ' + error);
    }
  }
}
