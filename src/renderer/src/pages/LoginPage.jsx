import { useEffect } from "react";
import AccountCell from "../components/AccountCell";
import Navbar from "../components/Navbar"

import "../styles/LoginPage.scss"

export default function LoginPage() {
    const ipcHandle = (ipcRoute) => window.electron.ipcRenderer.send(ipcRoute);

    useEffect(() => {
        ipcHandle("getAccounts")
    }, [])

    return (
        <>
            <Navbar />
            <br />
            <br />
            <h1>login page</h1>
            <div className="accounts-list">
                <AccountCell accountID={1}/>
                <div className="add-account" onClick={() => ipcHandle("login")}>
                    <h1>add account</h1>
                </div>
            </div>
        </>
    )
}