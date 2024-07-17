import employeeData from '../data/employeeData.json';
import { EmployeeInterface } from '../interfaces/employeeInterface';

export class EmployeeService {
    static getEmployeeList(): EmployeeInterface[] {
        return employeeData;
    }

    static getEmployee(id: string): EmployeeInterface {
        const employee: EmployeeInterface | undefined = employeeData.find((employee: { id: string; }) => employee.id === id);
        if (!employee) 
            throw new Error('Cannot find employee');
        return employee;
    }
    static validateEmployeeCredentials(email: string, password: string): EmployeeInterface {
        const employee: EmployeeInterface | undefined = employeeData.find((employee: { email: string; password: string; }) => employee.email === email && employee.password === password);
        if (!employee) 
            throw new Error('Cannot find employee or password is incorrect');
        return employee;
    }
    static createEmployee(employee: EmployeeInterface): EmployeeInterface {
        employeeData.push(employee);
        return employee;
    }

    static updateEmployee(updatedEmployee: EmployeeInterface): EmployeeInterface {
        const index = employeeData.findIndex((employee: { id: string; }) => employee.id === updatedEmployee.id);
        if (index === -1) 
            throw new Error('Cannot find employee to update');
        employeeData[index] = updatedEmployee;
        return updatedEmployee;
    }

    static deleteEmployee(id: string): void {
        const index = employeeData.findIndex((employee: { id: string; }) => employee.id === id);
        if (index === -1) 
            throw new Error('Cannot find employee to delete');
        employeeData.splice(index, 1);
        console.log(`Employee with id ${id} deleted`);
    }
}
