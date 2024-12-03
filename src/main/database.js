import sqlite3 from "sqlite3"

import { app } from "electron"
import * as fs from "node:fs"
import { format, logError, logInfo } from "./utils/logging"

let db = null
const basePath = `${app.getPath('appData')}/hysky`

export const execute = async(sql, params = []) => {
    if (params && params.length > 0) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) reject(err)
                resolve()
            })
        })
    }
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) reject(err)
            resolve()
        })
    })
}

export const get = async(sql, params) => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err)
            resolve(row)
        })
    })
}

export const getAll = async(sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

export async function initDatabase() {
    const dbPath = `${app.getPath('appData')}/hysky/data.db`
    if (!fs.existsSync(`${app.getPath('appData')}/hysky`)) fs.mkdirSync(`${app.getPath('appData')}/hysky`)
    if (!fs.existsSync(dbPath)) {
        fs.writeFile(dbPath, "", (err) => {
            if (err) throw err
        })
    }

    db = new sqlite3.Database(dbPath)
    await execute(`CREATE TABLE IF NOT EXISTS users(
        refreshToken TEXT NOT NULL,
        username TEXT NOT NULL, 
        userID TEXT NOT NULL, 
        UNIQUE(userID));`).catch(err => logError(format("InitDatabase Error: {0}", err)))
}


export async function addAccount(refreshToken, username, userID) {
    //await execute(`INSERT INTO users(refreshToken, username, userID) VALUES(?, ?, ?);`, refreshToken, username, userID).catch(err => logError(format("AddAccount Error: {0}", err)))
    db.serialize(() => {
        db.run(`INSERT OR IGNORE INTO users(refreshToken, username, userID) VALUES(?, ?, ?);`, [refreshToken, username, userID], (err) => {
            if (err) logError(err)
        })
    })
}

export async function getAllAccounts() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`SELECT * FROM users;`, [], (err, rows) => {
                if (err) reject(err)
                resolve(rows)
            })
        })
    })
}

export function closeDB() {
    db.close()
}