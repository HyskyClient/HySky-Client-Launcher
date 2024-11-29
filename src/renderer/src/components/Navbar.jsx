import "../styles/components/Navbar.scss"

export default function Navbar() {
    return (
        <nav className="navbar">
            <a href="/">Home</a>
            <a href="#">Mods</a>
            <a href="#">Settings</a>
            <a className="navbar-right" href="/login">Login</a>
        </nav>
    )
}