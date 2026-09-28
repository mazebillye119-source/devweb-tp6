import Database from "better-sqlite3";
import fs from "node:fs";
import { dbFile, dbSchema } from "../config.mjs";

let db;

export function connect() {
    if (db) return db;

    const isNew = !fs.existsSync(dbFile);
    db = new Database(dbFile);

    if (isNew) {
        const schema = fs.readFileSync(dbSchema, "utf8");
        db.exec(schema);
    }

    return db;
}


export function close() {
    if (db) {
        db.close();
        db = undefined;
    }
}

export function getLink(link) {
    return connect().prepare("SELECT * FROM links WHERE link = ?").get(link);
}

export function getStatus(link) {
    return connect()
        .prepare("SELECT url, link, visits, created_at FROM links WHERE link = ?")
        .get(link);
}

export function createLink(url, link) {
    connect().prepare("INSERT INTO links (url, link) VALUES (?, ?)").run(url, link);
    return { url, link };
}

export function incrementVisits(link) {
    connect().prepare("UPDATE links SET visits = visits + 1 WHERE link = ?").run(link);
}

export function countLinks() {
    return connect().prepare("SELECT COUNT(*) AS count FROM links").get().count;
}