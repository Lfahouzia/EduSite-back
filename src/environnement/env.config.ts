import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  throw new Error("PORT is not defined in .env");
}
if (!process.env.DB_USER) {
  throw new Error("DB_USER is not defined in .env");
}
if (!process.env.DB_PASSWORD) {
  throw new Error("DB_PASSWORD is not defined in .env");
}
if (!process.env.DB_HOST) {
  throw new Error("DB_HOST is not defined in .env");
}
if (!process.env.DB_PORT) {
  throw new Error("DB_PORT is not defined in .env");
}
if (!process.env.DB_NAME) {
  throw new Error("DB_NAME is not defined in .env");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

export const config = {
  port: parseInt(process.env.PORT as string, 10),
  jwtSecret: process.env.JWT_SECRET,
  db: {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    database: process.env.DB_NAME as string,
    ssl: process.env.DB_SSLMODE === "require",
  },
};
