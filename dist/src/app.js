"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const user_1 = __importDefault(require("./controllers/user"));
const room_1 = __importDefault(require("./controllers/room"));
const booking_1 = __importDefault(require("./controllers/booking"));
const review_1 = __importDefault(require("./controllers/review"));
const auth_1 = __importDefault(require("./controllers/auth"));
exports.app = (0, express_1.default)();
exports.app.set('port', process.env.PORT || 5000);
const origins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://dashboard-miranda.s3-website.eu-west-3.amazonaws.com'
];
exports.app.use((0, cors_1.default)({
    origin: origins
}));
exports.app.use(express_1.default.json());
exports.app.get("/", (_req, res, _next) => {
    return res.status(200).json({
        message: "Hello from root!",
    });
});
exports.app.get("/hello", (_req, res, _next) => {
    return res.status(200).json({
        message: "Hello from path!",
    });
});
let isConnected = false;
async function connectToMongoDB() {
    if (isConnected) {
        console.log('=> Using existing MongoDB connection');
        return;
    }
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not defined in the .env file");
        process.exit(1);
    }
    try {
        console.log('Connecting to MongoDB...');
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        isConnected = true; // Set connection state to true
        console.log('=> Connected to MongoDB');
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}
connectToMongoDB();
// Middleware to ensure MongoDB connection is established
exports.app.use(async (_req, _res, next) => {
    await connectToMongoDB();
    next();
});
// Set up routes
exports.app.use('/auth', auth_1.default);
exports.app.use('/user', user_1.default);
exports.app.use('/room', room_1.default);
exports.app.use('/booking', booking_1.default);
exports.app.use('/review', review_1.default);
// Handle 404 errors
exports.app.use((_req, res, _next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});
// Custom error class for better error handling
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
// Global error handler
exports.app.use((err, _req, res, _next) => {
    console.error(err.message, err.safe, err.status);
    res.status(err.status || 500).json({ message: err.message });
});
exports.default = exports.app;
