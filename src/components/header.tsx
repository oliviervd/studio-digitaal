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
                <h1 onClick={() => toggleHome()}>Studio Digitaal</h1>
                <h1>DESIGN MUSEUM GENT.</h1>
                <div id={"lang"} className={"languages"}>
                    <h1 id={'nl'} onClick={() => props.changeLang("nl")}>NL</h1> .
                    <h1 id={'en'} onClick={() => props.changeLang("en")}>EN</h1> .
                    <h1 id={'fr'} onClick={() => props.changeLang("fr")}>FR</h1> .
                </div>
            </div>
            <div className={"header-container-mobile"}>
                <img src={logo} alt={"logo of studio digitaal"}/>
            </div>
            <ThemeToggle/>
        </header>
    )
}

export default Header;