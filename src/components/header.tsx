import { route } from 'preact-router';
const Header = (props) => {

    return(
        <header>
            <h1 onClick={props.scrollToTop}>Studio Digitaal</h1>
            <nav>
                <h1 onClick={()=>route(`${props.language}/collection-api`)}>collection api</h1>
            </nav>
            <nav>
                <h1 onClick={props.scrollToAbout}>about</h1>
            </nav>
        </header>
    )
}

export default Header;