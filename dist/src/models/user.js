"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: { type: String, required: true },
    status: { type: Boolean, default: false },
    phonenumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isMobilePhone(value),
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    jobdesk: { type: String },
    description: { type: String },
    photourl: { type: String },
    joindate: { type: Date, required: true },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
