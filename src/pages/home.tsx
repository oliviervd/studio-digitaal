import Header from "../components/header";
import CalculateSize from "../components/fetchSize";
import {useState, useEffect} from "preact/hooks"

import "../index.css"
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";
import Project from "../components/project";
import GifControl from "../components/GifControl";
import Logo from "../assets/Pixel-Logo-41-frames-transparent.gif"

const Home = () => {
    const {language, setLanguage} = useLanguage()
    const [project, setProject] = useState([])
    const [projectView, setProjectView] = useState(false)
    const [projects, setProjects] = useState([])
    const [about, setAbout] = useState([])
    const [animateGif, setAnimateGif] = useState(false)
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";

    console.log(project)

    useEffect(()=> {
        fetchPayload(baseURI,"StudioDigitalProject", 10, language).then((data)=> {
                setProjects(data["docs"])
            }
        )
    }, [])

    // fetch data
    useEffect(() => {
        fetchPayload(baseURI, "studios", 10, language).then((data)=>{
            setAbout(serialize(data["docs"][3]["description"]));
        })
    }, [language]);

    function openProject(project) {
        setProject(project);
        setProjectView(true);
    }

    function changeLang(lang) {
        setLanguage(lang);
    }

    const handleToggleChange = (newState) => {
        setAnimateGif(newState);
    }

    return(
        <div>
            <Header handleToggleChange={handleToggleChange} setProjectView={setProjectView} language={language} changeLang={changeLang}/>
            <section>
                <GifControl playAutomatically={animateGif}
                            src={Logo}
                            width={500}
                            height={400}>
                            frameDelay={100}
                            transitionDelay={10}
                            transitionDuration={500}
                            idleTimeout={100}
                </GifControl>
            </section>
            <section>
                <div className={"home-hero_project-grid"} style={projectView ? {display: "none"} : {}}>
                {projects[0] && projects.map((p) => {
                        if (p["heroImage"] && p["heroImage"]["url"]) {
                            return (
                                <img src={p["heroImage"]["url"]}/>
                            )
                        }
                    })}
                </div>

            </section>

            <div>
                {projects[0] && projects.map((p) => {
                    if (p.projectTitle == "overview") {
                        return (
                            <div className={"project-overview"}>
                                <div className={"section-label"}>
                                    <p>*RESEARCH</p>
                                </div>
                                <p>{serialize(p.projectDescription)}</p>
                                <p> * * * * </p>
                            </div>
                        )
                    }
                })}
            </div>
            <section className={projectView ? "home-about w-50" : "home-about w-100"}
                         style={projectView ? {display: "none"} : {}}>
                    <div className={"section-label"}>
                        <p>*ABOUT</p>
                    </div>
                    <p>{about}</p>
                </section>
            {projectView &&
                <Project project={project}/>
            }
            <CalculateSize/>

        </div>
    )
}
export default Home;

