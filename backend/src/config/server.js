import express from "express";
import cors from "cors";
import routes from "../routes/index.js";
import cookieParser from "cookie-parser";
import { redirectUrl } from "../middleware/redirectUrl.js";

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
})); // Allow request of differents sites
app.use(express.json()); // Parse the request body to JSON

app.use(redirectUrl);

app.use("/", routes);

export default app;