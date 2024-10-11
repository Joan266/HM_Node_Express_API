import { Schema, model } from 'mongoose';
import { RoomInterface } from '../interfaces/room';

const FACILITIES_OPTIONS = [
  'WiFi',
  'Air Conditioning',
  'Breakfast Included',
  'Parking',
  'Swimming Pool',
  'Gym',
  'TV',
  'Mini Bar',
  'Room Service',
  'Laundry Service'
];

const roomSchema = new Schema<RoomInterface>({
  name: { type: String, required: true },
  bedtype: { type: String, required: true },
  facilities: {
    type: [String], 
    enum: FACILITIES_OPTIONS,  
    validate: [(val: string[]) => val.length <= 10, '{PATH} exceeds the limit of 10'],  
  }, 
  rate: { type: Number, required: true },
  offer: { 
    type: Number, 
    required: true, 
    min: 0,  
    max: 100 
  },
  status: { 
    type: String, 
    enum: ['available', 'booked', 'maintenance', 'unavailable'], 
    default: 'unavailable',
    required: true 
  },
  photourl:{
    type:String,
  },
});

const Room = model<RoomInterface>('Room', roomSchema);

export default Room;
