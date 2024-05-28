import Header from "../components/header";
import {fetchPayload} from "../utils/fetchPayload";
import {useEffect, useState} from "preact/hooks";
import {useLanguage} from "../utils/languageProvider";
import serialize from "../utils/serialize";


const L2Container = ({projects}) => {
    const {language, setLanguage} = useLanguage()
    const [trajectory, setTrajectory] = useState([]);
    const baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run"
    //todo: move to env

    return(
        <section className={"L2-container"}>
            {projects && projects.map((project, index) => {
                    return(
                        <div>
                            <div className={"index-container"}>
                                <div className={"index-number"}>{index}</div>
                                <span className={"arrow-open"}> ▼ </span>
                                <h2 className={"L2-slug"}><p>{project.article.projectTitle}</p></h2>
                            </div>
                            <div>
                                {project.article.projectDescription &&
                                        <p className={"L2-description"}>
                                            {serialize(project.article.projectDescription)}
                                        </p>
                                }
                            </div>
                        </div>
                    )
            })}

        </section>
    )
}

export default L2Container;