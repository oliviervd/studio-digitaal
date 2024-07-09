import Header from "../components/header";
import {useState, useEffect, useRef} from "preact/hooks"

import "../index.css";
import "../styles/nesting.css";
import "../styles/typography.css"

import NestedContent from "./NestedContent";

import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";
import Glossary from "./glossary";

const Home = ({trajectory}) => {
    const {language, setLanguage} = useLanguage()
    const [trajectories, setTrajectories] = useState([])
    const [projects, setProjects] = useState([])
    const [logoDesc, openLogoDesc] = useState(false)
    const [about, setAbout] = useState([])
    const [font, setFont] = useState("courier")

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";

    // fetch content from CMS
    // trajectory
    useEffect(()=> {
        fetchPayload(baseURI,"trajectory", 10, language).then((data)=> {
                setTrajectories(data["docs"])
            }
        )
    }, [language])

    // projects
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
        const Element = document.getElementById(trajectory);
        if (Element) {
            // open the element
            if (Element.tagName.toLowerCase() === 'details') {
                Element.open = true;
            }
        } else {
            // return 404
        }
    }, []);

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

                <hr/>
                <hr/>
                <details id={'research'}>
                    <summary>
                        research
                    </summary>
                    <section className={"L1-container"}>
                        {trajectories.map((traject, index) => {
                            return (
                                <details id={traject._id} key={traject}>
                                    <summary>{traject.trajectoryTitle}</summary>
                                    {traject.trajectoryDescription &&
                                        <p>
                                            {serialize(traject.trajectoryDescription)}
                                            {traject.articles &&
                                                <NestedContent
                                                    projects={traject.articles}
                                                ></NestedContent>
                                            }
                                        </p>
                                    }
                                </details>
                            )
                        })}
                    </section>
                </details>

                <hr/>
                <hr/>

                <details id={"glossary"}>
                    <summary>glossary</summary>
                    <section>
                        <Glossary/>
                    </section>
                </details>

                <hr/>
                <hr/>

                <details id={"actors"}>
                    <summary>actors</summary>
                </details>

                <hr/>
                <hr/>

                {projects && projects.map((p) => {
                    if (p.projectTitle === "about") {
                        return (
                            <details>
                                <summary>
                                    about
                                </summary>
                                <section className={"L1-container"}>
                                    {/*<p>{serialize(p.projectDescription)}</p>*/}
                                    {p.subProjects.map((a) => {
                                        console.log(a)
                                        return (

                                            <details>
                                                <summary>{a.project.projectTitle}</summary>
                                                <p>{serialize(a.project.projectDescription)}</p>
                                            </details>
                                        )
                                    })}
                                </section>
                            </details>
                    )
                    }
                })}
            </section>

        </div>
    )
}
export default Home;

