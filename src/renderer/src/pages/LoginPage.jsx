import { createElement, useEffect, useRef, useState } from "react";
import AccountCell from "../components/AccountCell";
import Navbar from "../components/Navbar"

import "../styles/LoginPage.scss"

export default function LoginPage() {
    const ipcHandle = (ipcRoute) => window.electron.ipcRenderer.send(ipcRoute);

    const [accountArr, setAccountArr] = useState([])

    window.electron.ipcRenderer.on("onAccounts", (event, accounts) => {
        accounts.forEach((acc) => {
            if (!accountArr.includes(acc))
                setAccountArr([...accountArr, acc])
        })
    })

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
                {accountArr.map((account, index) => (
                    <>
                        <AccountCell accountName={account.username} accountID={account.userID} key={index} />
                        <br />
                    </>
                ))}
                <div className="add-account" onClick={() => ipcHandle("login")}>
                    <h1>add account</h1>
                </div>
            </div>
        </>
    )
}