import { describe, it, expect } from '@jest/globals';
import { EmployeeService } from './services/employee';

import request from 'supertest';
import { app } from './app'; 

const token = '09f26e402586e2faa4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';

describe('Employee Service API Tests', () => {

  describe('Get lists', () => {
    it('should get the employee list', async () => {
      const res = await request(app).get('/employee').set('Authorization', 'Token ' + token);
      
      expect(res.body).toMatchObject({ employees: EmployeeService.getEmployeeList() });
    });
  });

  describe('Get individual employee', () => {
    it('should get a specific employee by ID', async () => {
      const employeeId = '6582931045';
      const res = await request(app).get(`/employee/${employeeId}`).set('Authorization', 'Token ' + token);
      
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ employee: EmployeeService.getEmployee(employeeId) });
    });
  });

  describe('Employee Login', () => {
    it('should validate employee credentials', async () => {
      const email = 'carmen.perez@example.com'; 
      const password = 'password123'; 
      const res = await request(app).post('/employee/login').send({ email, password });
      
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ employee: EmployeeService.validateEmployeeCredentials(email, password) });
    });
  });

  describe('Create new employee', () => {
    it('should create a new employee', async () => {
      const newEmployee = {
        id: '1065829310', 
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '+34 123 456 789',
        join_date: '2023-07-19T00:00:00.000Z',
        job_desk: 'Handle guest inquiries and reservations',
        schedule: {
          days: 'Tuesday, Thursday',
          hours: '10:00 AM - 6:00 PM'
        },
        status: true,
        email: 'john.doe@example.com',
        password: 'securepassword',
      };
      const res = await request(app).post('/employee').send(newEmployee).set('Authorization', 'Token ' + token);
      
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ employee: newEmployee });
      expect(EmployeeService.getEmployee(newEmployee.id)).toMatchObject(newEmployee);
    });
  });

  describe('Update employee', () => {
    it('should update an existing employee', async () => {
      const updatedEmployee = {
        id: '6582931045', 
        first_name: 'Carmen',
        last_name: 'Pérez',
        phone_number: '+34 634 892 317',
        join_date: '2018-06-11T00:00:00.000Z',
        job_desk: 'Assist with administrative tasks such as handling guest inquiries and reservations',
        schedule: {
          days: 'Monday, Wednesday',
          hours: '9:00 AM - 5:00 PM'
        },
        status: true,
        email: 'carmen.perez@example.com',
        password: 'newpassword123'
      };
      const res = await request(app).put(`/employee/${updatedEmployee.id}`).send(updatedEmployee).set('Authorization', 'Token ' + token);
      
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ employee: updatedEmployee });
      expect(EmployeeService.getEmployee(updatedEmployee.id)).toMatchObject(updatedEmployee);
    });
  });

  describe('Delete employee', () => {
    it('should delete an existing employee', async () => {
      const employeeId = '6582931045';
      const res = await request(app).delete(`/employee/${employeeId}`).set('Authorization', 'Token ' + token);
      
      expect(res.status).toBe(200);
      expect(() => EmployeeService.getEmployee(employeeId)).toThrow('Cannot find employee');
    });
  });

});
