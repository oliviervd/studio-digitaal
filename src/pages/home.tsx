import Header from "../components/header";
import Footer from "../components/footer";
import SideNav from "../pages/CollectionAPI";

import {useState, useEffect} from "preact/hooks"
import { getCurrentUrl, route } from 'preact-router';

import "../index.css"
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
const Home = () => {

    const [isMobile, setIsMobile] = useState(false);
    const [language, setLanguage] = useState("en")
    const [about, setAbout] = useState([])
    const [projects, setProjects] = useState([]);
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 600px)');
        const handleChange = () => setIsMobile(mediaQuery.matches);
        mediaQuery.addListener(handleChange);
        handleChange(); // Initial check
        return () => mediaQuery.removeListener(handleChange);
    }, []);


    useEffect(() => {
        const currentUrl = getCurrentUrl();
        const pathSegments = currentUrl.split('/').filter(Boolean); // filter(Boolean) removes empty strings from the array

        // If there are no path segments, it means we're at the root
        if (pathSegments.length === 0) {
            // Redirect to "/en"
            route('/en', true); // true for "replace" to avoid adding a new entry in the history stack
        } else {
            // Set language based on the first segment of the path
            setLanguage(pathSegments[0]);
        }
    }, []); // Empty dependency array to run only once on mount

    useEffect(()=> {
        fetchPayload(baseURI,"StudioDigitalProject", 10, language).then((data)=> {
                setProjects(data["docs"])
            }
        )
    }, [])

    const scrollToAbout = () => {
        const aboutSection = document.getElementById("about")
        if (aboutSection) {
            aboutSection.scrollIntoView({behavior:"smooth"})
        }
    }

    const scrollToTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"})
    }

    // fetch data
    useEffect(() => {
        fetchPayload(baseURI, "studios", 10, language).then((data)=>{
            const _unserializedText = data["docs"][3]["description"][0]
            console.log(_unserializedText)
            const _serializedText =  serialize(data["docs"][3]["description"][0])
            console.log(_serializedText)
            setAbout(_serializedText);
        })
    }, [language]);

    return(
        <div>
            <Header language={language} scrollToAbout={scrollToAbout} scrollToTop={scrollToTop}/>
            <section className={"home-hero"}>
                <div className={"home-hero_project-grid"}>
                </div>
            </section>
            <section id={"about"} className={"home-about"}>
            <h1 className={"about"}>{about}</h1>
            </section>
            <Footer language={language} setLanguage={setLanguage}/>
        </div>
    )
}
export default Home;

