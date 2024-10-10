import { RoomInterface } from '../interfaces/room';
import Room from '../models/room';
import { APIError } from '../app';

export class RoomService {
  static async all() {
    const roomData = await Room.find();
    return roomData;
  }

  static async get(id: string) {
    const room = await Room.findById(id);
    if (!room) {
      throw new APIError('Cannot find room', 404, true);
    }
    return room;
  }

  static async create(newRoom: {
    name: string;
    bedtype: string;
    code: string;
    facilities?: string[]; 
    rate: number;
    offer: number;
    status: 'available' | 'booked' | 'maintenance' | 'unavailable'; 
  }) {
    const { name, bedtype, code, rate, offer, facilities, status } = newRoom;

    if (!name || !bedtype || !code || rate === undefined || offer === undefined || !status) {
      throw new APIError('All required fields must be filled', 400, true);
    }

    try {
      const room = await Room.create({
        name,
        bedtype,
        code,
        facilities,
        rate,
        offer,
        status,
      });

      return room;
    } catch (err) {
      throw new APIError('Error creating Room', 500, false);
    }
  }

  static async update(id: string, updateParameters: Partial<RoomInterface>) {
    const updatedRoom = await Room.findByIdAndUpdate(id, updateParameters, { new: true });
    if (!updatedRoom) {
      throw new APIError('Cannot find Room to update', 404, true);
    }
    return updatedRoom;
  }

  static async delete(id: string) {
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      throw new APIError('Cannot find Room to delete', 404, true);
    }
    console.log(`Room with id ${id} deleted`);
  }
}
