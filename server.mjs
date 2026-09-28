import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import logger from "loglevel";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "node:fs";
import { port, env } from "./config.mjs";
import { connect, close } from "./database/database.mjs";
import apiV1 from "./router/api-v1.mjs";
import favicon from "serve-favicon";

logger.setLevel(env === "development" ? logger.levels.DEBUG : logger.levels.INFO);

const app = express();

if (env === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable("x-powered-by");
app.use(favicon("static/logo_univ_16.png"));

app.use((request, response, next) => {
  response.setHeader("X-API-version", "1.0.0");
  next();
});

const openapiSpec = YAML.parse(fs.readFileSync("static/open-api.yaml", "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));


app.use("/api-v1", apiV1);

app.get("/:url", (request, response, next) => {
    return next(createError(501, "Not Implemented"));
});

app.use((request, response, next) => {
    return next(createError(404));
});

app.use((error, _request, response, _next) => {
    const status = error.status ?? 500;
    const result = { code: status, message: error.message };
    if (env === "development") result.stack = error.stack;
    return response.status(status).json(result);
});

connect();
const server = app.listen(port, () => {
    logger.info(`Server listening on http://localhost:${port}`);
});

process.on("SIGINT", () => {
    close();
    server.close(() => process.exit(0));
});
    
export { app, server };