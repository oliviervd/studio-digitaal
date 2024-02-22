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

            <div className={"home__projects-container"}>

                <section>
                    <div className={"home__image"}>
                            <img src={hero}/>

                    </div>
                </section>

                <section className={"home__index"}>
                    <div className={"index_project"}>
                        {projects.map((project) => {
                            return (
                                <div>
                                    <a onMouseEnter={()=>switchProject(project)}>{project.projectTitle}</a>
                                </div>
                            )
                        })
                        }
                    </div>
                </section>

            </div>


            <Footer language={language} setLanguage={setLanguage}/>
        </div>
    )
}
export default Home;

