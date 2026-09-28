import express from "express";
import createError from "http-errors";
import { nanoid } from "../utils.mjs";
import {
    createLink,
    countLinks,
    getLink,
    incrementVisits,
} from "../database/database.mjs";
import { linkLength } from "../config.mjs";

const router = express.Router();

// Construit l'origine (http://localhost:8080) pour le rendu HTML
function getOrigin(request) {
    return `${request.protocol}://${request.get("host")}`;
}

// GET / → JSON ou HTML
router.get("/", (request, response, next) => {
    const count = countLinks();

    response.format({
        json: () => response.json({ count }),
        html: () =>
            response.render("root", {
                count,
                origin: getOrigin(request),
            }),
        default: () => next(createError(406, "Not Acceptable")),
    });
});

// POST / → JSON ou HTML
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

    response.format({
        json: () => response.status(201).json({ url, link }),
        html: () =>
            response.status(201).render("root", {
                count: countLinks(),
                link,
                origin: getOrigin(request),
            }),
        default: () => next(createError(406, "Not Acceptable")),
    });
});

router.get("/:url", (request, response, next) => {
    const found = getLink(request.params.url);
    if (!found) return next(createError(404, "Link not found"));

    response.format({
        json: () =>
            response.json({
                url: found.url,
                link: found.link,
                visits: found.visits,
                created_at: found.created_at,
            }),
        html: () => {
            incrementVisits(request.params.url);
            return response.redirect(301, found.url);
        },
        default: () => next(createError(406, "Not Acceptable")),
    });
});

export default router;