import Header from "../components/header";
import Footer from "../components/footer";
import {useState, useEffect} from "preact/hooks"
import { getCurrentUrl, route } from 'preact-router';

import "../index.css"
import {fetchPayload} from "../utils/fetchPayload";

const Home = () => {

    const [language, setLanguage] = useState("en")
    const [projects, setProjects] = useState([]);
    const [activeProject, setActiveProject] = useState("")
    const [hero, setHero] = useState("https://d2yoaaok6mt608.cloudfront.net/Figure 20 - Prototype of Searcher")

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";

    const [isMobile, setIsMobile] = useState(false);

    const colors = ["rgb(243, 198, 198)","rgb(199, 243, 198)", "rgb(184, 94, 149)"]

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

    useEffect(()=> {
        setHero(activeProject.heroImage.url)
    }, [activeProject])

    function switchProject(p){
        setActiveProject(p)
    }

    return(
        <div>
            <Header language={language}/>

            {!isMobile &&
                <div className={"home__projects-container"}>

                    <section className={"masonry-grid"}>
                        {projects.map((p, index) => {
                            return (
                                <img className={"image-mobile"} style={`border-color:${colors[index]}`} src={p.heroImage.url}/>
                            )
                        })}
                    </section>

                    <section className={"home__index"}>
                        <div className={"index_project"}>
                            <h1>projects:</h1>

                            <div className={"sphere-in-div"}></div>

                            {projects.map((project, index) => {
                                return (
                                    <div>
                                        <div className={"pretty-circle-index"}
                                             style={`background-color:${colors[index]}`}></div>
                                        <a onMouseEnter={() => switchProject(project)}>{project.projectTitle}</a>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </section>

                </div>
            }
            {isMobile &&
                <div className={"image-container"}>
                     {projects.map((p) => {
                            return (
                               <img className={"image-mobile"} src={p.heroImage.url}/>
                            )
                        })}
                </div>
            }

            <Footer language={language} setLanguage={setLanguage}/>
        </div>
    )
}
export default Home;

