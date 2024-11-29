import * as os from "os"
import * as storage from "electron-json-storage"

import { Auth } from "msmc";
import { mainWindow } from ".";

export async function login() {
    const authManager = new Auth("select_account")
    await authManager.launch("raw").then(async xboxManager => {
        const _token = await xboxManager.getMinecraft()
        mainWindow.setToken = _token

        
    })
}