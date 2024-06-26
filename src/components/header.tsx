import "../styles/navigation.css"
import logo from "../assets/Pixel-Logo-41-frames-transparent.gif"
import FontChanger from "./fontChanger";
import CalculateSize from "./fetchSize";
import {route} from "preact-router"

const Header = ({changeLang, openLogoDesc, logoDesc, handleFontChange}) => {
    // todo: add responsible design for mobile.

    function logoAction() {
        if (openLogoDesc) {
            openLogoDesc(!logoDesc);
        }
        route("")
    }

    return(
            <header className={"header__desktop"}>
                <div className={"header__logo-container"}>
                    <img
                        src={logo} alt={"logo of studio digitaal"}
                        onClick={() => logoAction()}
                    />
                </div>

                <CalculateSize/>

                <nav>
                    <FontChanger handleFontChange={handleFontChange}/>
                    <div id={"lang"} className={"nav__lang-container"}>
                        <p id={'nl'} onClick={() => changeLang("nl")}>nl</p>
                        <p id={'en'} onClick={() => changeLang("en")}>en</p>
                        <p id={'fr'} onClick={() => changeLang("fr")}>fr</p>
                    </div>
                </nav>
            </header>


    )
}

export default Header;