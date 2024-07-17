export interface EmployeeInterface {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  job_desk: string;
  join_date: string;
  status: boolean;
  password: string;
  schedule: {
    days: string;
    hours: string;
  };
}

export type EmployeeProperties = 'id' | 'first_name' | 'last_name' | 'email' | 'phone_number' | 'job_desk' | 'join_date' | 'status' | 'password' | 'schedule';
