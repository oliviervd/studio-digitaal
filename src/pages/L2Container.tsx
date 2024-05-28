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
            {projects && projects.map((project) => {
                console.log(project)
                    return(
                        < div >
                            {project.article.projectTitle}
                        </div>
                        )
            })}

        </section>
    )
}

export default L2Container;