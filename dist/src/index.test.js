"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("./app");
(0, globals_1.describe)('API Endpoints', () => {
    let userToken;
    let userId;
    (0, globals_1.it)('should create a new user', async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .post('/auth/signup')
            .send({
            "firstname": "juan",
            "lastname": "alemany",
            "password": "$2be$10$QlKU5P",
            "status": true,
            "gmail": "joanalemany26@gmail.com",
            "phonenumber": "645324709",
            "joindate": "2023-12-04T00:00:00.000Z",
            "jobdesk": "Provide concierge services and local information",
            "days": "Monday, Tuesday, Thursday",
            "hours": "9:00 AM - 5:00 PM"
        });
        (0, globals_1.expect)(res.statusCode).toEqual(201);
        const { createduser } = res.body;
        (0, globals_1.expect)(createduser.firstname).toEqual("juan");
        userId = createduser._id;
    });
    (0, globals_1.it)('should login with new user', async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .post('/auth/login')
            .send({
            "password": "$2be$10$QlKU5P",
            "gmail": "joanalemany26@gmail.com"
        });
        (0, globals_1.expect)(res.statusCode).toEqual(200);
        const { token, user } = res.body;
        (0, globals_1.expect)(user.firstname).toEqual("juan");
        userToken = token;
    });
    (0, globals_1.it)('should retrieve the user by ID', async () => {
        const res = await (0, supertest_1.default)(app_1.app)
            .get(`/user/${userId}`)
            .set('Authorization', `Bearer ${userToken}`);
        (0, globals_1.expect)(res.statusCode).toEqual(200);
        const { user } = res.body;
        (0, globals_1.expect)(user.firstname).toEqual("juan");
    });
});
