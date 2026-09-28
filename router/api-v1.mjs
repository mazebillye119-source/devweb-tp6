import express from "express";
import createError from "http-errors";
import { nanoid } from "../utils.mjs";
import { createLink, countLinks, getLink, getStatus, incrementVisits,
} from "../database/database.mjs";
import { linkLength } from "../config.mjs";

const router = express.Router();

// GET / → nombre de liens
router.get("/", (request, response) => {
    return response.json({ count: countLinks() });
});

// POST / → créer un lien
router.post("/", (request, response, next) => {
    const { url } = request.body ?? {};
    if (!url) return next(createError(400, "URL is required"));

    try {
        new URL(url);
    } catch {
        return next(createError(400, "Invalid URL"));
    }

    const link = nanoid(linkLength);
    createLink(url, link);
    return response.status(201).json({ url, link });
});

// GET /error → test erreur 500
router.get("/error", (request, response, next) => {
    return next(createError(500, "Test error"));
});

router.get("/status/:url", (request, response, next) => {
    const status = getStatus(request.params.url);
    if (!status) return next(createError(404, "Link not found"));
    return response.json(status);
});


router.get("/:url", (request, response, next) => {
    const link = getLink(request.params.url);
    if (!link) return next(createError(404, "Link not found"));
    incrementVisits(request.params.url);
    return response.redirect(301, link.url);
});

export default router;