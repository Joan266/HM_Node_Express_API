"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
const start = async () => {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is not defined in the .env file");
        process.exit(1);
    }
    mongoose_1.default.connection.once('open', () => {
        console.log('Successfully connected to MongoDB');
    });
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        app_1.app.listen(app_1.app.get('port'), () => {
            console.log(`Server started on port ${app_1.app.get('port')}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};
start();
