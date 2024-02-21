import Header from "../components/header.tsx";
import Footer from "../components/footer.tsx";
import {useState} from "react"

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

