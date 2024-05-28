import { route } from 'preact-router';
import ThemeToggle from "./ThemeToggle";
import "../styles/navigation.css"
import logo from "../assets/Pixel-Logo-41-frames-transparent.gif"

import Toggle from "./toggle";
const Header = ({changeLang, openLogoDesc, logoDesc}) => {

    // todo: add media-query (change header for mobile  -  logo + hamburgermenu)
    // todo: add possibility to change fonts

    return(
        <header>
            <div className={"header-container-desktop"}>
                <img
                    src={logo} alt={"logo of studio digitaal"}
                    onClick={() => openLogoDesc(!logoDesc)}
                />
            </div>
            <div className={"header-container-mobile"}>
                <img
                    src={logo} alt={"logo of studio digitaal"}
                    onClick={() => openLogoDesc(!logoDesc)}
                />
            </div>
            <div className={"header-container-right"}>
                <div id={"lang"} className={"languages"}>
                    <p id={'nl'} onClick={() => changeLang("nl")}>NL</p>
                    <p id={'en'} onClick={() => changeLang("en")}>EN</p>
                    <p id={'fr'} onClick={() => changeLang("fr")}>FR</p>
                </div>
                <ThemeToggle/>
            </div>
        </header>
    )
}

export default Header;