import { Schema, model } from 'mongoose';
import validator from 'validator';
import { RoomsInterface } from '../interfaces/Rooms';

const RoomsSchema = new Schema<RoomsInterface>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
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

const Rooms = model<RoomsInterface>('Rooms', RoomsSchema);

export default Rooms;
