import Header from "../components/header";
import {fetchPayload} from "../utils/fetchPayload";
import {useEffect, useState} from "preact/hooks";
import {useLanguage} from "../utils/languageProvider";
import serialize from "../utils/serialize";


const Open = (props) => {
    const {language, setLanguage} = useLanguage()
    const [trajectory, setTrajectory] = useState([]);
    const baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run"
    //todo: move to env

    function changeLang(lang) {
        setLanguage(lang);
    }

    // fetch content
    useEffect(() => {
        fetchPayload(baseURI, "trajectory", 10, language).then((data)=>{
            for (let i =0; i<data.docs.length ;i++) {
                if (data.docs[i].trajectoryTitle=="open-collection")
                setTrajectory(data.docs[i])
            }
        })
    }, [language]);

    return(
        <div>
            <Header language={language} changeLang={changeLang}/>
            <section>
                <div className={"project-overview"}>
                    <div className={"section-label"}>
                        <p>{trajectory.trajectoryTitle}</p>
                    </div>
                    {trajectory.trajectoryDescription &&
                        <p>{serialize(trajectory.trajectoryDescription)}</p>
                    }
                </div>

            </section>

            <section className={"home-about w-100"}>
                <div className={"section-label"}>
                    <p>*PROJECTS</p>
                    <div className={"projects-grid"}>
                        {trajectory.articles && trajectory.articles.map((article)=>{
                            console.log(article)
                            return(
                                <div className={"project"}>
                                    <p className={"project-title"}>{article.article.projectTitle}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Open;