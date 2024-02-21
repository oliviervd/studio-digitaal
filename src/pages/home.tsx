import Header from "../components/header";
import Footer from "../components/footer";
import {useState} from "preact/hooks"
import "../index.css"

const Home = () => {

    const [language, setLanguage] = useState("en")

    return(
        <div>
            <Header language={language}/>
            <Footer language={language} setLanguage={setLanguage}/>
        </div>
    )
}
export default Home;

