"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedEmployees = void 0;
const user_1 = require("../services/user");
const user_2 = __importDefault(require("../models/user"));
const faker_1 = require("@faker-js/faker");
const jobDesk = [
    "Handle guest complaints and ensure satisfactory resolution",
    "Manage front desk operations and staff",
    "Coordinate housekeeping activities and schedules",
    "Oversee kitchen and dining room staff",
    "Maintain hotel inventory and supplies",
    "Plan and execute events and conferences",
    "Ensure compliance with health and safety regulations",
    "Manage hotel finances and budgets",
    "Handle guest check-ins and check-outs",
    "Provide concierge services and local information"
];
const generateFakeEmployees = (EMPLOYEES_NUM) => {
    const fakeEmployees = [];
    for (let i = 0; i < EMPLOYEES_NUM; i++) {
        const fakeEmployee = {
            email: faker_1.faker.internet.email(),
            phonenumber: faker_1.faker.string.numeric({ length: 9 }),
            password: faker_1.faker.internet.password() + "?5A!@",
            jobdesk: jobDesk[Math.floor(Math.random() * jobDesk.length)],
            joindate: faker_1.faker.date.between({ from: '1990-01-01', to: '2024-01-01' }),
            status: Math.random() >= 0.5,
            firstname: faker_1.faker.person.firstName(),
            lastname: faker_1.faker.person.lastName(),
            description: faker_1.faker.lorem.sentence(),
            photoUrl: ""
        };
        fakeEmployees.push(fakeEmployee);
    }
    return fakeEmployees;
};
const createEmployees = async (EMPLOYEES_NUM) => {
    const fakeEmployeesData = generateFakeEmployees(EMPLOYEES_NUM);
    const fakeDemoUserData = {
        firstname: "Admin",
        lastname: "Admin",
        email: "admin@example.com",
        phonenumber: "645765609",
        password: "securepassword?5A!@",
        joindate: new Date("2023-01-01"),
        status: true,
        jobdesk: "Software Developer",
        description: faker_1.faker.lorem.sentence(),
        photoUrl: ""
    };
    await user_1.UserService.create(fakeDemoUserData);
    for (let i = 0; i < EMPLOYEES_NUM; i++) {
        await user_1.UserService.create(fakeEmployeesData[i]);
    }
};
const seedEmployees = async () => {
    try {
        await user_2.default.deleteMany({});
        console.log('All existing employees deleted.');
        const EMPLOYEES_NUM = 35;
        console.log('Creating employees...');
        await createEmployees(EMPLOYEES_NUM);
        console.log('Employees created successfully.');
        console.log('Seed data successfully added!');
    }
    catch (error) {
        console.error('Error seeding employees:', error);
    }
};
exports.seedEmployees = seedEmployees;
