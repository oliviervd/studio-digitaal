import { route } from 'preact-router';
const Header = (props) => {

    function toggleHome() {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"})
        route(`${props.language}/`)
    }

    function changeLang(lang) {
        props.setLanguage(lang)
        const newUrl = `${window.location.protocol}//${window.location.host}/${lang}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        // set nav

        const parent = document.getElementById("lang")
        const children = parent.children;
        for (let i = 0; i < children.length; i ++) {
            children[i].classList.remove("selected")
        }
        // style selected item
        const element = document.getElementById(lang)
        element.className="selected"
    }

    return(
        <header>
            <div>
                <h1 onClick={() => toggleHome()}>Studio Digitaal</h1>
                <h1>booting.</h1>
                <div id={"lang"} className={"languages"}>
                    <h1 id={'nl'} onClick={() => changeLang("nl")}>NL</h1> .
                    <h1 id={'en'} onClick={() => changeLang("en")}>EN</h1> .
                    <h1 id={'fr'} onClick={() => changeLang("fr")}>FR</h1> .
                </div>
            </div>
            {/* <nav>
                <h1 onClick={() =>route(`${props.language}/collection-api`)}>collection api</h1>
            </nav>
            <nav>
                <h1 onClick={props.scrollToAbout}>about</h1>
            </nav>*/}
        </header>
    )
}

export default Header;