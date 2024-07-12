import Header from "../components/header";
import {useState, useEffect, useRef} from "preact/hooks"

import "../index.css";
import "../styles/nesting.css";
import "../styles/typography.css"
import "../styles/ui-elements.css"

import NestedContent from "./NestedContent";

import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";
import {route} from "preact-router"
import Glossary from "./glossary";
import ButtonMoveUp from "../components/buttonMoveUp";

const Home = ({trajectory, subpage}) => {
    const {language, setLanguage} = useLanguage()
    const [subPage, setSubPage] = useState(null);
    const [previousSubPage, setPreviousSubPage] = useState(null);
    const [trajectories, setTrajectories] = useState([])
    const [projects, setProjects] = useState([])
    const [logoDesc, openLogoDesc] = useState(false)
    const [about, setAbout] = useState([])
    const [font, setFont] = useState("system-ui")
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";

    const refs = useRef({});

    console.log(logoDesc)
    //todo: add button to close all.

    useEffect(() => {
        const handleDetailsToggle = (e) => {
            if (!e.target.open) {
                setPreviousSubPage(null);
            }
        };

        const detailsElements = document.querySelectorAll("details");
        detailsElements.forEach((el) => {
            el.addEventListener("toggle", handleDetailsToggle);
        });

        return () => {
            detailsElements.forEach((el) => {
                el.removeEventListener("toggle", handleDetailsToggle);
            });
        };
    }, []);

    // if page doesn't exist show 404
    useEffect(() => {
        if (trajectory) {
            const Element = document.getElementById(trajectory);
            if (Element) {
                // Open the element
                if (Element.tagName.toLowerCase() === 'details') {
                    Element.open = true;
                }
                if (subpage) {
                    // Collapse the previous subpage if it exists
                    if (previousSubPage && refs.current[previousSubPage]) {
                        refs.current[previousSubPage].open = false;
                    }

                    // Set the new subpage
                    setPreviousSubPage(subpage.toLowerCase());
                    setSubPage(subpage);

                    // Scroll to subpage element if it exists
                    const subElement = document.getElementById(subpage.toLowerCase());
                    if (subElement) {
                        subElement.scrollIntoView({ behavior: 'smooth' });
                        if (subElement.tagName.toLowerCase() === 'details') {
                            subElement.open = true;
                        }
                    }
                }
            } else {
                // Redirect to Error page if the trajectory does not exist
                route('/error', true);
            }
        }
    }, [trajectory, subpage]);

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
        fetchPayload(baseURI,"StudioDigitalProject", 1000, language).then((data)=> {
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
                handleFontChange={handleFontChange} font={font}
            />

            <section className={"nest-master"}>

                {logoDesc &&
                    <section>
                        {projects && projects.map((p) => {
                            console.log(p)
                            if (p.projectTitle == "logo-design") {
                                console.log("found")
                                console.log(serialize(p.projectDescription))
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
                <details id={'research'} style={{paddingBottom: "10px"}}>
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
                                                <section className={"indent-border-left"}>
                                                    <details>
                                                        <summary>projects</summary>
                                                        <p>
                                                            <NestedContent
                                                                projects={traject.articles} type={"project"} sub={subPage}
                                                            ></NestedContent>
                                                        </p>
                                                    </details>
                                                    <details>
                                                        <summary>research & development</summary>
                                                        <p>
                                                            <NestedContent
                                                                projects={traject.articles} type={"RND"} sub={subpage}
                                                            ></NestedContent>
                                                        </p>
                                                    </details>
                                                </section>
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

                <details id={"glossary"} style={{paddingBottom: "10px"}}>
                    <summary>glossary</summary>
                    <section>
                        <Glossary sub={subpage}/>
                    </section>
                </details>

                <hr/>
                <hr/>

                <details id={"actors"} style={{paddingBottom: "10px"}}>
                    <summary>actors</summary>
                </details>

                <hr/>
                <hr/>
                <details id={"about"} style={{paddingBottom: "10px"}}>
                    <summary>
                        about
                    </summary>
                    {projects && projects.map((p) => {
                        if (p.projectTitle === "about") {
                            return (
                                <section className={"L1-container"}>
                                    {/*<p>{serialize(p.projectDescription)}</p>*/}
                                    {p.subProjects.map((a) => {
                                        //console.log(a)
                                        return (

                                            <details>
                                                <summary>{a.project.projectTitle}</summary>
                                                <p>{serialize(a.project.projectDescription)}</p>
                                            </details>
                                        )
                                    })}
                                </section>
                            )
                        }
                    })}
                </details>
            </section>
            <div style={{position: "fixed", right: "30px", bottom: "20px"}}>
                <ButtonMoveUp />
            </div>
        </div>
    )
}
export default Home;

