import "../styles/components/AccountCell.scss"

export default function AccountCell({ accountName, accountID }) {
    return (
        <div className="account-cell">
            <img src={"https://mc-heads.net/avatar/" + accountID} width={100} className="account-image"></img>
            <h1>{accountName}</h1>
        </div>
    )
}