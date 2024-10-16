"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const app_1 = require("../app");
class UserService {
    static async all() {
        const userData = await user_1.default.find().select('-password');
        return userData;
    }
    static async get(id) {
        const user = await user_1.default.findById(id).select('-password');
        if (!user) {
            throw new app_1.APIError('Cannot find user', 404, true);
        }
        return user;
    }
    static async login(email, password) {
        const user = await user_1.default.findOne({ email });
        if (!user || !user.password) {
            throw new app_1.APIError('Incorrect credentials', 401, true);
        }
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw new app_1.APIError('Incorrect credentials', 401, true);
        }
        return user;
    }
    static async create(newUser) {
        const { email, password, phonenumber, firstname, lastname, joindate, ...rest } = newUser;
        if (!email || !password || !phonenumber || !firstname || !lastname || !joindate) {
            throw new app_1.APIError('All fields must be filled', 400, true);
        }
        const existingUser = await user_1.default.findOne({ email });
        if (existingUser) {
            throw new app_1.APIError('Email already in use', 409, true);
        }
        try {
            const salt = await bcrypt_1.default.genSalt(10);
            const hash = await bcrypt_1.default.hash(password, salt);
            const user = await user_1.default.create({
                email,
                password: hash,
                phonenumber,
                firstname,
                lastname,
                joindate,
                ...rest,
            });
            return user;
        }
        catch (err) {
            throw new app_1.APIError('Error creating user', 500, false);
        }
    }
    static async update(id, updateParameters) {
        const updatedUser = await user_1.default.findByIdAndUpdate(id, updateParameters, { new: true }).select('-password');
        if (!updatedUser) {
            throw new app_1.APIError('Cannot find user to update', 404, true);
        }
        return updatedUser;
    }
    static async delete(id) {
        const deletedUser = await user_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new app_1.APIError('Cannot find user to delete', 404, true);
        }
        console.log(`User with id ${id} deleted`);
    }
}
exports.UserService = UserService;
