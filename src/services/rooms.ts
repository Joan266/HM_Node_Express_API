import { RoomInterface } from '../interfaces/room';
import { pool } from '../app';
import { RoomQueries } from '../utils/queries';
import { APIError } from '../app';

export class RoomService {
    
    static async getRoomList(){
        const [allRooms] = await pool.query(RoomQueries.getRooms);
        console.log("Get all rooms: ", allRooms);
        return allRooms;
    }

    static async getRoom(id: number){
        const [room] = await pool.query(RoomQueries.getSingleRoom, [id]);
        console.log("Get room: ", room);

        if (!room.length) {
            throw new APIError('Cannot find room', 404, true);
        }
        return room[0];
    }

    static async createRoom(room: RoomInterface){
        try {
            const [insertedRoom] = await pool.query(
                RoomQueries.createRoom, [
                    room.roomNumber, 
                    room.roomType, 
                    room.status, 
                    room.rate, 
                    room.price, 
                    room.description
                ]
            );
            console.log("Inserted room: ", insertedRoom);
            return insertedRoom;
        } catch (error) {
            throw new APIError('Unexpected error while creating new room', 500, true);
        }
    }

    static async updateRoom(id: number, room: RoomInterface){
        try {
            const [updatedRoom] = await pool.query(
                RoomQueries.updateRoom, [
                    room.roomNumber, 
                    room.roomType, 
                    room.status, 
                    room.rate, 
                    room.price, 
                    room.description, 
                    id
                ]
            );
            console.log("Updated room: ", updatedRoom);
            return updatedRoom;
        } catch (error) {
            throw new APIError('Unexpected error while updating room, make sure that the room exists in the Database', 500, true);
        }
    }

    static async deleteRoom(id: number){
        try {
            const [deletedRoom] = await pool.query(RoomQueries.getSingleRoom, [id]);
            if (!deletedRoom.length) {
                throw new APIError('Cannot delete room because it does not exist', 404);
            }

            await pool.query(RoomQueries.deleteRoom, [id]);
            console.log("Deleted room: ", deletedRoom);
            return deletedRoom;
        } catch (error) {
            throw new APIError('Unexpected error while deleting room', 500, true);
        }
    }
}