import express from "express";
import cors from "cors";

import sessionRoutes from "./routes/session.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "ShopEase AI Agent is running",
    });
});

app.use("/api/sessions", sessionRoutes);

export default app;