import { Link } from "react-router";
import "./Header.css";

export default function Header() {
    return (
        <header className="header-header">
            <Link to="/">NeoMall</Link>
        </header>
    )
}