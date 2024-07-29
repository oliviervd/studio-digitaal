import "../styles/navigation.css"
import logo from "../assets/Pixel-Logo-41-frames-transparent.gif"
import FontChanger from "./fontChanger";
import CalculateSize from "./fetchSize";
import {route} from "preact-router"
import {Component} from "preact";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMobile: window.innerWidth < 600,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => {
        this.setState({isMobile: window.innerWidth <= 600});
    }

    render() {
        const {isMobile} = this.state;
        const { changeLang, openLogoDesc, logoDesc, handleFontChange, font } = this.props;

        function logoAction() {
            if (openLogoDesc) {
                openLogoDesc(!logoDesc);
            }
            route("")
        }

        return isMobile ? (
            <header className={"header__mobile"}>
                <div className={"header__logo-container"}>
                    <img
                        src={logo} alt={"logo of studio digitaal"}
                        onClick={() => logoAction()}
                    />
                </div>

                {/*<CalculateSize/>*/}

            </header>
        ) : (
            <header className={"header__desktop"}>
                <div className={"header__logo-container"}>
                    <img
                        src={logo} alt={"logo of studio digitaal"}
                        onClick={() => logoAction()}
                    />
                </div>

                {/*<CalculateSize/>*/}

                <nav>
                    <FontChanger handleFontChange={handleFontChange}/>
                    <div id={"lang"} className={"nav__lang-container"}>
                        <p id={'nl'} className={"disabled-link"}>nl</p>
                        <p id={'en'} onClick={() => changeLang("en")}>en</p>
                        <p id={'fr'} className={"disabled-link"}>fr</p>
                    </div>
                </nav>
            </header>
        )
    };
}

export default Header