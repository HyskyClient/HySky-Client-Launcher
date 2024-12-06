import * as os from "os"
import * as db from "./database"
import Cryptr from "cryptr";

import { Auth } from "msmc";
import { mainWindow } from ".";
import { format, logError, logInfo, logWarning } from "./utils/logging";

export async function attemptLogin() {
    db.initDatabase()

    db.getAllAccounts().then(accounts => {
        if (!Array.isArray(accounts) || !accounts.length) {
            return
        } else {
            refreshLogin(accounts[0].refreshToken)
        }
    })
}

export async function getAccounts() {
    db.getAllAccounts().then(accounts => {
        mainWindow.getWindow.webContents.send("onAccounts", accounts)
    })
}

export async function login() {
    const authManager = new Auth("select_account")
    await authManager.launch("raw").then(async xboxManager => {
        const _token = await xboxManager.getMinecraft()
        mainWindow.setToken = _token

        const dKey = format("{0} - {1} - {2}", os.cpus()[0].model, os.hostname(), os.type())
        const cryptr = new Cryptr(dKey)
        const eToken = cryptr.encrypt(xboxManager.msToken.refresh_token)
        
        await db.addAccount(eToken, _token.profile.name, _token.profile.id)
    })
}

export async function refreshLogin(refreshToken) {
    const authManager = new Auth("login")
    const dKey = format("{0} - {1} - {2}", os.cpus()[0].model, os.hostname(), os.type())
    const cryptr = new Cryptr(dKey)

    await authManager.refresh(cryptr.decrypt(refreshToken)).then(async xboxManager => {
        const _token = await xboxManager.getMinecraft()
        mainWindow.setToken = _token
    })
}