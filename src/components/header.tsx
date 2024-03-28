import { route } from 'preact-router';
const Header = (props) => {

    function toggleHome() {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"})
        route(`${props.language}/`)
    }

    return(
        <header>
            <div>
                <div className={"boxIcon"} onClick={()=> {props.setOpen(!props.open)}}/>
                <h1 onClick={() => toggleHome()}>Studio Digitaal</h1>
            </div>
            <nav>
                <h1 onClick={() =>route(`${props.language}/collection-api`)}>collection api</h1>
            </nav>
            <nav>
                <h1 onClick={props.scrollToAbout}>about</h1>
            </nav>
        </header>
    )
}

export default Header;