"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./src/app");
app_1.app.listen(app_1.app.get('port'), () => {
    console.log(`Server started on port ${app_1.app.get('port')}`);
});
