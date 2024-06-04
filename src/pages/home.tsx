import Header from "../components/header";
import CalculateSize from "../components/fetchSize";
import {useState, useEffect, useRef} from "preact/hooks"
import {route} from "preact-router";

import "../index.css";
import "../styles/nesting.css";
import "../styles/typography.css"

import L2Container from "./L2Container";

import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";
import Glossary from "./glossary";

const Home = ({url}) => {
    const {language, setLanguage} = useLanguage()
    const [trajectories, setTrajectories] = useState([])
    const [projects, setProjects] = useState([])
    const [logoDesc, openLogoDesc] = useState(false)
    const [about, setAbout] = useState([])
    const [expandedContainers, setExpandedContainers] = useState([])
    const [expandedContainersGlossary, setExpandedContainersGlossary] = useState([])
    const [font, setFont] = useState("courier")

    const [scrollToID, setScrollToID] = useState<number>(null)
    console.log(scrollToID)

    const researchRef = useRef(null)
    const glossaryRef = useRef(null)

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";

    //todo: add logo (white) for dark mode
    //todo: use details instead of hardcoded boxes.

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

        if (glossaryRef.current) {
            setScrollToID(glossaryRef.current)
        } else if (researchRef.current) {
            setScrollToID(researchRef.current)
            researchRef.current.scrollIntoView({behavior:"smooth"})
        }
    }, [url]);


    useEffect(()=>{
        document.body.style.fontFamily = font;
        if (font == "fantasy") {
            document.body.style.lineHeight = "1.4";
        }
    },[font])

    function changeLang(lang) {
        setLanguage(lang);
    }

    const handleFontChange = (event) => {
        setFont(event.target.value)
    }

    return(
        <div>
            <Header
                language={language} changeLang={changeLang}
                logoDesc={logoDesc} openLogoDesc={openLogoDesc}
                handleFontChange={handleFontChange}
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
                    </section>
                }

                <b>{about}</b>


                {projects && projects.map((p) => {

                    if (p.projectTitle === "format") {
                        return (
                            <p>{serialize(p.projectDescription)}</p>
                        )
                    }
                })}
                <hr/>
                <hr/>
                <details>
                    <summary>
                        research
                    </summary>
                    <br/>
                    <section className={"L1-container"}>
                        {trajectories.map((traject, index) => {
                            return (
                                <details key={traject._id}>
                                    <summary>{traject.trajectoryTitle}</summary>
                                    {traject.trajectoryDescription &&
                                        <p>
                                            {serialize(traject.trajectoryDescription)}
                                            {traject.articles &&
                                                <L2Container projects={traject.articles}></L2Container>
                                            }
                                        </p>
                                    }
                                </details>
                            )
                        })}
                        <section>
                            <L2Container></L2Container>
                        </section>
                    </section>
                </details>

                <hr/>
                <hr/>

                <details>
                    <summary>glossary</summary>
                    <br/>
                    <section>
                        <Glossary scrollToID={scrollToID} setScrollToID={setScrollToID}
                                  expandedContainersGlossary={expandedContainersGlossary}
                                  setExpandedContainersGlossary={setExpandedContainersGlossary}/>
                    </section>
                </details>

                <hr/>
                <hr/>

                <details>
                    <summary>actors</summary>
                </details>

            </section>

        </div>
    )
}
export default Home;

