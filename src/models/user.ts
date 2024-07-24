import { Schema, model } from 'mongoose';
import validator from 'validator';
import { UserInterface } from '../interfaces/user';

const userSchema = new Schema<UserInterface>({
  _id: { type: Schema.Types.ObjectId },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: { type: String, required: true },
  status: { type: Boolean, default: false },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isMobilePhone(value),
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  days: { type: String },
  hours: { type: String },
  jobdesk: { type: String },
  joindate: { type: Date, required: true },
});

const User = model<UserInterface>('User', userSchema);

export default User;
