"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const room_1 = require("../services/room");
const router = express_1.default.Router();
router.get('/', async (_req, res, next) => {
    try {
        const rooms = await room_1.RoomService.all();
        res.json({ rooms });
    }
    catch (e) {
        next(e);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const room = await room_1.RoomService.get(id);
        res.json(room);
    }
    catch (e) {
        next(e);
    }
});
router.post('/create', async (req, res, next) => {
    try {
        const newRoom = req.body;
        const createdroom = await room_1.RoomService.create(newRoom);
        return res.json(createdroom);
    }
    catch (e) {
        next(e);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const room = req.body;
        const updatedRoom = await room_1.RoomService.update(id, room);
        res.json(updatedRoom);
    }
    catch (e) {
        next(e);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await room_1.RoomService.delete(id);
        res.json(id);
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
