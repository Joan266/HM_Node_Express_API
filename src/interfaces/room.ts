import mongoose from 'mongoose';

export interface RoomInterface {
  _id?: mongoose.Types.ObjectId;  
  name: string;                 
  bedtype: string;                  
  facilities?: string[];          
  rate: number;                   
  offer: number;                   
  photourl?: string;                   
  status: 'available' | 'booked' | 'maintenance' | 'unavailable'; 
}

export type RoomProperties = keyof RoomInterface; 
