"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../services/user");
const router = express_1.default.Router();
router.get('/', async (_req, res, next) => {
    try {
        console.time("MongoDB Query Time");
        const users = await user_1.UserService.all();
        console.timeEnd("MongoDB Query Time");
        console.log("Fetched Users: ", users[0]);
        return res.status(200).json({
            message: "Hello from path user!",
        });
        // res.status(200).json(users[0],);
        // console.log("Log after res "); 
    }
    catch (e) {
        next(e);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await user_1.UserService.get(id);
        res.json(user);
    }
    catch (e) {
        next(e);
    }
});
router.post('/create', async (req, res, next) => {
    try {
        const newUser = req.body;
        const createduser = await user_1.UserService.create(newUser);
        return res.json(createduser);
    }
    catch (e) {
        next(e);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const updatedUser = await user_1.UserService.update(id, user);
        res.json(updatedUser);
    }
    catch (e) {
        next(e);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await user_1.UserService.delete(id);
        res.json(id);
    }
    catch (e) {
        next(e);
    }
});
exports.default = router;
