import { createClient } from "@libsql/client";
import { envs } from './dotenv.js'

export const turso = createClient({
  url: envs.TURSO_DB_URL,
  authToken: envs.TURSO_TOKEN,
});