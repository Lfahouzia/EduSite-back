import { Pool } from "pg";
import { config } from "../../environnement/env.config";

const dbConfig = { ...config.db, ssl: { rejectUnauthorized: false } };

// Create a new Pool instance with the database configuration
const db = new Pool(dbConfig);

export default db;
