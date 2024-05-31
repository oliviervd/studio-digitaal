import { route } from 'preact-router';
import ThemeToggle from "./ThemeToggle";
import "../styles/navigation.css"
import logo from "../assets/Pixel-Logo-41-frames-transparent.gif"
import FontChanger from "./fontChanger";
import Toggle from "./toggle";

const Header = ({changeLang, openLogoDesc, logoDesc, handleFontChange}) => {

    // todo: add media-query (change header for mobile  -  logo + hamburgermenu)
    // todo: add possibility to change fonts

    return(
        <header>
            <div className={"header__logo-container"}>
                <img
                    src={logo} alt={"logo of studio digitaal"}
                    onClick={() => openLogoDesc(!logoDesc)}
                />
            </div>

            <nav>
                <FontChanger handleFontChange={handleFontChange}/>
                <div id={"lang"} className={"nav__lang-container"}>
                    <p id={'nl'} onClick={() => changeLang("nl")}>nl</p>
                    <p id={'en'} onClick={() => changeLang("en")}>en</p>
                    <p id={'fr'} onClick={() => changeLang("fr")}>fr</p>
                </div>
                {/*<ThemeToggle/>*/}
            </nav>
        </header>
    )
}

export default Header;