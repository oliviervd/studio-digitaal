import Header from "../components/header";
import Footer from "../components/footer";
import {useState, useEffect} from "preact/hooks"
import { getCurrentUrl } from 'preact-router';

import "../index.css"

const Home = () => {

    const [language, setLanguage] = useState("en")

    useEffect(() => {
        // Parse the current URL to find the language parameter
        const url = new URL(window.location.href);
        const pathSegments = url.pathname.split('/').filter(Boolean); // filter(Boolean) removes empty strings from the array
        if (pathSegments.length > 0) {
            // Assuming the language code is the first segment after the first '/'
            const langParam = pathSegments[0];
            setLanguage(langParam);
        }
    }, [getCurrentUrl()]); // Depend on the current URL

    return(
        <div>
            <Header language={language}/>
            <Footer language={language} setLanguage={setLanguage}/>
        </div>
    )
}
export default Home;

