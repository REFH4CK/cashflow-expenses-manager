import dotenv from "dotenv";

dotenv.config();

export const envs = {
  PORT: process.env.PORT,
  TURSO_TOKEN: process.env.TURSO_TOKEN,
  TURSO_DB_URL: process.env.TURSO_DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
