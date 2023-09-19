const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./online-store.db");
const { v4: uuidv4 } = require("uuid");
