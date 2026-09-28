import "dotenv/config";

export const port = Number.parseInt(process.env.PORT ?? "8080", 10);
export const linkLength = Number.parseInt(process.env.LINK_LEN ?? "6", 10);
export const dbFile = process.env.DB_FILE ?? "database/database.sqlite";
export const dbSchema = process.env.DB_SCHEMA ?? "database/database.sql";
export const env = process.env.NODE_ENV ?? "development";