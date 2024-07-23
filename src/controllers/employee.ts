import express, { Request, Response } from 'express';
import { EmployeeService } from '../services/employee';
import { EmployeeInterface } from '../interfaces/employee';
import { generateAccessToken } from '../utils/generateAccesToken';

const router = express.Router();

router.get('/employees', async (req: Request, res: Response) => {

  try {
    const employees = await EmployeeService.getEmployeeList();
    res.json({ employees });
  } catch (error) {
    res.status(500).json({ errorMessage: error });
  }
});

router.get('/employees/:id', async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    const employee = await EmployeeService.getEmployee(id);
    res.json({ employee });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
});

router.post('/employees/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const employee = await EmployeeService.login(email, password);
    if (!employee) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateAccessToken(employee.password);
    return res.json({ ...employee, token });
  } catch (error) {
    res.status(400).json({
      error: 'Bad Request',
      message: error,
    });
  }
});

router.post('/employees', async (req: Request, res: Response) => {
  const newEmployee: EmployeeInterface = req.body;
  try {
    const createdEmployee = await EmployeeService.signup(newEmployee);
    res.status(201).json({ createdEmployee });
  } catch (error) {
    res.status(400).json({ errorMessage: error });
  }
});

router.put('/employees/:id', async (req: Request, res: Response) => {

  const id = req.params.id;
  const updateParameters = req.body;
  try {
    const updatedEmployee = await EmployeeService.updateEmployee(id, updateParameters);
    res.json({ updatedEmployee });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
});

router.delete('/employees/:id', async (req: Request, res: Response) => {

  const id = req.params.id;
  try {
    await EmployeeService.deleteEmployee(id);
    res.json({ message: `Employee with id ${id} deleted` });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
});

export default router;
