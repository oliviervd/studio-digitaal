const Footer = (props) => {

    function changeLang(lang) {
        props.setLanguage(lang)
        const newUrl = `${window.location.protocol}//${window.location.host}/${lang}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        // set nav
    }

    return(
            <footer>
                <div className={"fonts"}>
                    <p>fonts: </p>
                    <div>
                        <p>Anthony by Sun Young Oh. Distributed by velvetyne.fr.</p>
                        <p>Ruda by Mariela Monsalve and Angelina Sánchez</p>
                    </div>
                </div>
                {props.showFont &&
                    <div className={"languages"}>
                        <p onClick={() => changeLang("nl")}>NL</p>
                        <p onClick={() => changeLang("en")}>EN</p>
                        <p onClick={() => changeLang("fr")}>FR</p>
                    </div>
                }
            </footer>
    )
}

export default Footer