import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import taskRouter from './routes/taskRouter.js';
import { errorAwareness } from './middleware/error.js';
import { dbConnection } from './database/dbConnection.js';

dotenv.config({ path: "./config/config.env" });

const app = express();

//  CORS
app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:5173"],
  methods: ["GET", "PUT", "DELETE", "POST"],
  credentials: true,
}));

// Cookies
app.use(cookieParser());

// JSON Parsing (MUST be before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to debug
//app.post("/api/v1/test-body", (req, res) => {
  //console.log("REQ.BODY:", req.body);
  //res.json({ success: true, body: req.body });
//});

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

// Database
dbConnection();

// Error handler
app.use(errorAwareness);

export default app;