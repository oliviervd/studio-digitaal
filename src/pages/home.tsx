import Header from "../components/header";
import CalculateSize from "../components/fetchSize";
import {useState, useEffect, useRef} from "preact/hooks"

import "../index.css";
import "../styles/nesting.css";
import "../styles/typography.css"

import L2Container from "./L2Container";

import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";
import Project from "../components/project";
import GifControl from "../components/GifControl";
import Logo from "../assets/Pixel-Logo-41-frames-transparent.gif"
import Glossary from "./glossary";

const Home = ({url}) => {
    const {language, setLanguage} = useLanguage()
    const [trajectories, setTrajectories] = useState([])
    const [projects, setProjects] = useState([])
    const [logoDesc, openLogoDesc] = useState(false)
    const [about, setAbout] = useState([])
    const [animateGif, setAnimateGif] = useState(false)
    const [expandedContainers, setExpandedContainers] = useState([])
    const [expandedContainersGlossary, setExpandedContainersGlossary] = useState([])

    const researchRef = useRef(null)
    const glossaryRef = useRef(null)

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";

    //todo: add logo (white) for dark mode

    // fetch content from CMS
    useEffect(()=> {
        fetchPayload(baseURI,"trajectory", 10, language).then((data)=> {
                setTrajectories(data["docs"])
            }
        )
    }, [language])

    useEffect(()=> {
        fetchPayload(baseURI,"StudioDigitalProject", 10, language).then((data)=> {
                setProjects(data["docs"])
            }
        )
    }, [language])

    // fetch data
    useEffect(() => {
        fetchPayload(baseURI, "studios", 10, language).then((data)=>{
            setAbout(serialize(data["docs"][3]["description"]));
        })
    }, [language]);


    useEffect(() => {
        if (url === "/glossary" && glossaryRef.current) {
            glossaryRef.current.scrollIntoView({behavior:"smooth"})
        } else if (url == "/research" && researchRef.current) {
            glossaryRef.current.scrollIntoView({behavior:"smooth"})
        }
    }, [url]);

    function changeLang(lang) {
        setLanguage(lang);
    }

    function toggleContainer(index) {
        setExpandedContainers(prevState => {
            const newState = [...prevState]
            if (newState.includes(index)) {
                newState.splice(newState.indexOf(index), 1)
            } else {
                newState.push(index)
            }
            return newState
        })
    }

    function collapseAllContainers() {
        setExpandedContainers([])
    }

    function collapseAllContainersGlossary() {
        setExpandedContainersGlossary([])
    }

    return(
        <div>
            <Header
                language={language} changeLang={changeLang}
                logoDesc={logoDesc} openLogoDesc={openLogoDesc}
            />

            <section className={"nest-master"}>

                {logoDesc &&
                    <section>
                        {projects && projects.map((p) => {
                            if (p.projectTitle == "logo-design") {
                                return (
                                    <i>
                                        {serialize(p.projectDescription)}
                                    </i>
                                )
                            }
                        })
                        }
                        {/*<section>
                            <GifControl playAutomatically={false}
                                        src={Logo}
                                        width={500}
                                        height={400}>
                                frameDelay={100}
                                transitionDelay={10}
                                transitionDuration={500}
                                idleTimeout={100}
                            </GifControl>
                        </section>*/}
                    </section>
                }

                <b>{about}</b>


                {projects && projects.map((p) => {

                    if (p.projectTitle === "format"){
                        console.log(p)
                            return (
                                    <p>{serialize(p.projectDescription)}</p>
                            )
                    }
                })}


                <div className={"section-head"} id={"research"} ref={researchRef}>
                    <h1>RESEARCH</h1>
                    <a style={{paddingTop:"20px"}} onClick={()=>collapseAllContainers()}>[collapse all]</a>
                </div>

                <section className={"L1-container"}>
                    {trajectories.map((traject, index) => {
                        const isExpanded = expandedContainers.includes(index);
                        return (
                            <div key={traject._id}>
                                <div className={"index-container"}>
                                    <div className={"index-number"}>{index}</div>
                                    <span className={isExpanded ? "arrow-open" : "arrow-open _90deg"}
                                          onClick={() => toggleContainer(index)}>
                                     ▼
                                    </span>
                                    <h1 className={"L1-slug"}
                                        onClick={() => toggleContainer(index)}>{serialize(traject.trajectorySlug)}</h1>
                                </div>

                                {traject.trajectoryDescription &&
                                    <p className={`L1-description ${isExpanded ? "expanded" : "collapsed"}`}>
                                        {serialize(traject.trajectoryDescription)}
                                        {traject.articles &&
                                            <L2Container projects={traject.articles}></L2Container>
                                        }
                                    </p>
                                }


                            </div>

                        )
                    })}
                    <section>
                        <L2Container></L2Container>
                    </section>
                </section>

                <div class={"section-head"} id={"glossary"} ref={glossaryRef}>
                    <h1>GLOSSARY</h1>
                    <a onClick={() => collapseAllContainersGlossary()}>[collapse all]</a>
                </div>

                <section>
                    <Glossary  expandedContainersGlossary={expandedContainersGlossary} setExpandedContainersGlossary={setExpandedContainersGlossary} />
                </section>
            </section>

            {/*<CalculateSize/>*/}

        </div>
    )
}
export default Home;

