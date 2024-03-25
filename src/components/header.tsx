import {useState, useEffect} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import {serialize} from "../utils/serialize";
const Header = (props) => {

    return(
        <header>
            <h1 onClick={props.scrollToTop}>Studio Digitaal</h1>
            <nav>
                <h1 onClick={props.scrollToAbout}>about</h1>
            </nav>
        </header>
    )
}

export default Header;