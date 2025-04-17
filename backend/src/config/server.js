import express from "express";
import cors from "cors";
import fs from 'fs';
import routes from "../routes/index.js";
import cookieParser from "cookie-parser";
import { redirectUrl } from "../middleware/redirectUrl.js";

const app = express();

const uploadDir = 'uploads/profile-photos';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Servir archivos estáticos
app.use('/cashflow/api/profile-photos', express.static(uploadDir));

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // Allow request of differents sites
app.use(express.json()); // Parse the request body to JSON

app.use(redirectUrl);

app.use("/", routes);






export default app;