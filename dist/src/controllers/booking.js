"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_1 = require("../services/booking");
const router = express_1.default.Router();
router.get('/', async (_req, res, next) => {
    try {
        const bookings = await booking_1.BookingService.all();
        res.json({ bookings });
    }
    catch (e) {
        next(e);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const booking = await booking_1.BookingService.get(id);
        res.json(booking);
    }
    catch (e) {
        next(e);
    }
});
router.post('/create', async (req, res, next) => {
    try {
        const newBooking = req.body;
        const createdbooking = await booking_1.BookingService.create(newBooking);
        return res.json(createdbooking);
    }
    catch (e) {
        next(e);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const booking = req.body;
        const updatedBooking = await booking_1.BookingService.update(id, booking);
        res.json(updatedBooking);
    }
    catch (e) {
        next(e);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await booking_1.BookingService.delete(id);
        res.json(id);
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
