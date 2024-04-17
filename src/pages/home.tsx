import Header from "../components/header";
import CalculateSize from "../components/fetchSize";
import {useState, useEffect} from "preact/hooks"

import "../index.css"
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import {route} from "preact-router";
import {useLanguage} from "../utils/languageProvider";

const Home = () => {
    const {language, setLanguage} = useLanguage()
    const [projects, setProjects] = useState([])
    const [about, setAbout] = useState([])
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";

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

    function changeLang(lang) {
        setLanguage(lang);
    }

    return(
        <div>
            <Header language={language} changeLang={changeLang}/>
            <section className={"home-link--container"} >
                <nav onClick={() => route(`/collection-api`)} className="home-link">
                    <p>collection api</p>
                </nav>
                <nav onClick={() => route(`/glossary`)} className="home-link">
                    <p >glossary</p>
                </nav>
            </section>
            <section>
                <div className={"home-hero_project-grid"}>
                    {projects[0] && projects.map((p)=>{
                        console.log(p["heroImage"]["url"]);
                        return (
                            <img src={p["heroImage"]["url"]}/>
                        )

                    })}
                </div>
            </section>
            <section className={"home-about"}>
                <p>{about}</p>
            </section>
            <CalculateSize />

        </div>
    )
}
export default Home;

