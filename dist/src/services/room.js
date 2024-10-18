"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const room_1 = __importDefault(require("../models/room"));
const app_1 = require("../app");
class RoomService {
    static async all() {
        const roomData = await room_1.default.find();
        return roomData;
    }
    static async get(id) {
        const room = await room_1.default.findById(id);
        if (!room) {
            throw new app_1.APIError('Cannot find room', 404, true);
        }
        return room;
    }
    static async create(newRoom) {
        const { name, bedtype, rate, offer, facilities, status } = newRoom;
        if (!name || !bedtype || rate === undefined || offer === undefined || !status) {
            throw new app_1.APIError('All required fields must be filled', 400, true);
        }
        try {
            const room = await room_1.default.create({
                name,
                bedtype,
                facilities,
                rate,
                offer,
                status,
            });
            return room;
        }
        catch (err) {
            throw new app_1.APIError('Error creating Room', 500, false);
        }
    }
    static async update(id, updateParameters) {
        const updatedRoom = await room_1.default.findByIdAndUpdate(id, updateParameters, { new: true });
        if (!updatedRoom) {
            throw new app_1.APIError('Cannot find Room to update', 404, true);
        }
        return updatedRoom;
    }
    static async delete(id) {
        const deletedRoom = await room_1.default.findByIdAndDelete(id);
        if (!deletedRoom) {
            throw new app_1.APIError('Cannot find Room to delete', 404, true);
        }
        console.log(`Room with id ${id} deleted`);
    }
}
exports.RoomService = RoomService;
