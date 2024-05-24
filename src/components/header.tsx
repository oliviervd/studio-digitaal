import { route } from 'preact-router';
import ThemeToggle from "./ThemeToggle";
import "../styles/navigation.css"
import logo from "../assets/Pixel-Logo-41-frames-transparent.gif"

import Toggle from "./toggle";
const Header = (props) => {

    // todo: add mediaquery (change header for mobile  -  logo + hamburgermenu)

    function toggleHome() {
        //window.scrollTo({top: 0, left: 0, behavior: "smooth"})
        route(`/`);
        props.setProjectView(false)
    }

    return(
        <header>
            <div className={"header-container-desktop"}>
                <img src={logo} alt={"logo of studio digitaal"} onClick={() => toggleHome()}/>
            </div>
            <div className={"header-container-mobile"}>
                <img src={logo} alt={"logo of studio digitaal"}/>
            </div>
            <div className={"header-container-right"}>
                <div id={"lang"} className={"languages"}>
                    <p id={'nl'} onClick={() => props.changeLang("nl")}>NL</p>
                    <p id={'en'} onClick={() => props.changeLang("en")}>EN</p>
                    <p id={'fr'} onClick={() => props.changeLang("fr")}>FR</p>
                </div>
                <ThemeToggle/>
            </div>
        </header>
    )
}

export default Header;