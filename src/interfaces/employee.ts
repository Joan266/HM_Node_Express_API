export interface EmployeeInterface {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  jobdesk: string;
  joindate: Date;
  status: boolean;
  password: string;
  days: string;
  hours: string;
}

export type EmployeeProperties = '_id' | 'first_name' | 'last_name' | 'email' | 'phone_number' | 'job_desk' | 'join_date' | 'status' | 'password' | 'days' | 'hours';
