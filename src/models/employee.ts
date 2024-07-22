import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { EmployeeInterface } from '../interfaces/employee';

interface EmployeeModel extends Model<EmployeeInterface> {
  signup(data: {
    email: string;
    password: string;
    phonenumber: string;
    firstname: string;
    lastname: string;
    joindate: Date;
  }): Promise<EmployeeInterface>;
  login(data: {
    emailOrPhonenumber: string;
    password: string;
  }): Promise<EmployeeInterface>;
}

const employeeSchema = new Schema<EmployeeInterface, EmployeeModel>({
  _id: Schema.Types.ObjectId,
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
  },
  days: {
    type: String,
  },
  hours: {
    type: String,
  },
  jobdesk: {
    type: String,
  },
  joindate: {
    type: Date,
    required: true,
  },
});

employeeSchema.statics.signup = async function (data: {
  email: string;
  password: string;
  phonenumber: string;
  firstname: string;
  lastname: string;
  joindate: Date;
}): Promise<EmployeeInterface> {
  const { email, password, phonenumber, firstname, lastname, joindate } = data;

  if (!email || !password || !phonenumber || !firstname || !lastname || !joindate) {
    throw new Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error('Password not strong enough');
  }
  if (!validator.isMobilePhone(phonenumber, 'any', { strictMode: false })) {
    throw new Error('Phone number not valid');
  }

  const existingEmployee = await this.findOne({ $or: [{ email }, { phonenumber }] });

  if (existingEmployee) {
    if (existingEmployee.email === email) {
      throw new Error('Email already in use');
    } else {
      throw new Error('Phone number already in use');
    }
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const employee = await this.create({
    _id: new mongoose.Types.ObjectId(),
    email,
    password: hash,
    phonenumber,
    firstname,
    lastname,
    joindate
  });

  return employee;
};

export const Employee = mongoose.model('Employee', employeeSchema);