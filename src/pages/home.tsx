import Header from "../components/header";
import CalculateSize from "../components/fetchSize";
import {useState, useEffect} from "preact/hooks"

import "../index.css"
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import {route} from "preact-router";
import {useLanguage} from "../utils/languageProvider";
import Project from "../components/project";

const Home = () => {
    const {language, setLanguage} = useLanguage()
    const [project, setProject] = useState([])
    const [projectView, setProjectView] = useState(false)
    const [projects, setProjects] = useState([])
    const [about, setAbout] = useState([])
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

    return(
        <div>
            <Header setProjectView={setProjectView} language={language} changeLang={changeLang}/>
            <section className={"home-link--container"} >
                <nav onClick={() => route(`/collection-api`)} className="home-link">
                    <p>collection api</p>
                </nav>
                <nav onClick={() => route(`/glossary`)} className="home-link">
                    <p >glossary</p>
                </nav>
            </section>
            <section>
                <div className={"home-hero_project-grid"} style={projectView ? {display: "none"}: {}}>
                    {projects[0] && projects.map((p)=>{
                        return (
                            <img onClick={()=>openProject(p)} src={p["heroImage"]["url"]}/>
                        )

                    })}
                </div>
            </section>
            <section className={projectView ? "home-about w-50": "home-about w-100"} style={projectView ? {display: "none"}:{}}>
                <p>{about}</p>
            </section>
            {projectView &&
                <Project project={project} />
            }
            <CalculateSize />

        </div>
    )
}
export default Home;

