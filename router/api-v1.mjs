import express from "express";
import createError from "http-errors";
import { nanoid } from "../utils.mjs";
import { createLink, countLinks } from "../database/database.mjs";
import { linkLength } from "../config.mjs";

const router = express.Router();

router.get("/", (request, response) => {
    const count = countLinks();
    return response.json({ count });
});

router.post("/", (request, response, next) => {
  const { url } = request.body ?? {};
  if (!url) return next(createError(400, "URL is required"));

  try {
    new URL(url);
  } 
  catch {
    return next(createError(400, "Invalid URL"));
  }

  const link = nanoid(linkLength);
  createLink(url, link);
  return response.status(201).json({ url, link });
});

router.get("/status/:url", (request, response, next) => {
    return next(createError(501, "Not Implemented"));
});

router.get("/error", (request, response, next) => {
    return next(createError(500, "Test error"));
});

export default router;