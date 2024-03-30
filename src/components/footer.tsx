const Footer = (props) => {

    function changeLang(lang) {
        props.setLanguage(lang)
        const newUrl = `${window.location.protocol}//${window.location.host}/${lang}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        // set nav
    }

    return(
        <footer>
            {/*{props.showFont &&
                <div className={"fonts"}>
                    <p>fonts: </p>
                    <div>
                        <p>Anthony by Sun Young Oh. Distributed by velvetyne.fr.</p>
                        <p>Ruda by Mariela Monsalve and Angelina Sánchez</p>
                    </div>
                </div>
            }
            */}

        </footer>
    )
}

export default Footer