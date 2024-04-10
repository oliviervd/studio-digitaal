import { route } from 'preact-router';
const Header = (props) => {

    function toggleHome() {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"})
        route(`/${props.language}/`);    }


    return(
        <header>
            <div>
                <h1 onClick={() => toggleHome()}>Studio Digitaal</h1>
                <h1>booting.</h1>
                <div id={"lang"} className={"languages"}>
                    <h1 id={'nl'} onClick={() => props.changeLang("nl")}>NL</h1> .
                    <h1 id={'en'} onClick={() => props.changeLang("en")}>EN</h1> .
                    <h1 id={'fr'} onClick={() => props.changeLang("fr")}>FR</h1> .
                </div>
            </div>
        </header>
    )
}

export default Header;