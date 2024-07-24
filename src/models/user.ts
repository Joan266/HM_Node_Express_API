import mongoose, { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { UserInterface } from '../interfaces/user';

interface UserModel extends Model<UserInterface> {
  signup(newEmployee: {
    email: string;
    password: string;
    phonenumber: string;
    firstname: string;
    lastname: string;
    joindate: Date;
    status?: boolean;
    days?: string;
    hours?: string;
    jobdesk?: string;
  }): Promise<UserInterface>;
  login(data: {
    credentials: string;
    password: string;
  }): Promise<UserInterface>;
}

const userSchema = new Schema<UserInterface, UserModel>({
  _id: { type: Schema.Types.ObjectId },
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

userSchema.statics.signup = async function (newUser: {
  email: string;
  password: string;
  phonenumber: string;
  firstname: string;
  lastname: string;
  joindate: Date;
  status?: boolean;
  days?: string;
  hours?: string;
  jobdesk?: string;
}): Promise<UserInterface> {
  const { email, password, phonenumber, firstname, lastname, joindate, ...rest } = newUser;

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

  const existingUser = await this.findOne({ $or: [{ email }, { phonenumber }] });

  if (existingUser) {
    throw new Error('Credentials already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
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
};

userSchema.statics.login = async function ({ credentials, password }) {
  if (!credentials || !password) {
    throw Error('All fields must be filled');
  }

  const isEmail = validator.isEmail(credentials);

  let user = await this.findOne({
    [isEmail ? 'email' : 'phonenumber']: credentials
  });

  if (!user) {
    throw Error('Incorrect credentials');
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect credentials');
  }

  return user;
};

const User = model<UserInterface, UserModel>('User', userSchema);

export default User;
