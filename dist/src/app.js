"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const auth_1 = require("./middleware/auth");
const user_1 = __importDefault(require("./controllers/user"));
const room_1 = __importDefault(require("./controllers/room"));
const booking_1 = __importDefault(require("./controllers/booking"));
const review_1 = __importDefault(require("./controllers/review"));
const auth_2 = __importDefault(require("./controllers/auth"));
exports.app = (0, express_1.default)();
exports.app.set('port', process.env.PORT || 5000);
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/', (_req, res) => {
    res.send('API Miranda\nRoutes: /rooms, /bookings, /users, /reviews, /login');
});
exports.app.use('/auth', auth_2.default);
exports.app.use(auth_1.authenticateToken);
exports.app.use('/user', user_1.default);
exports.app.use('/room', room_1.default);
exports.app.use('/booking', booking_1.default);
exports.app.use('/review', review_1.default);
class APIError extends Error {
    status;
    safe;
    constructor(message, status = 500, safe = false) {
        super(message);
        this.status = status;
        this.safe = safe;
    }
}
exports.APIError = APIError;
exports.app.use((err, _req, res, _next) => {
    console.error(err.message, err.safe, err.status);
    res.status(err.status || 500).json({ message: err.safe ? err.message : 'Internal Server Error' });
});
exports.default = exports.app;
