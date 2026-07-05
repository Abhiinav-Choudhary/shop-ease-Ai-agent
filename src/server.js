import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

import getOrderStatus from "./tools/getOrderStatus.js";

console.log(getOrderStatus("ORD001"));