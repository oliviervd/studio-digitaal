import Header from "../components/header";
import {fetchPayload} from "../utils/fetchPayload";
import {useEffect, useState} from "preact/hooks";
import {useLanguage} from "../utils/languageProvider";
import serialize from "../utils/serialize";


const L2Container = ({projects}) => {
    const {language, setLanguage} = useLanguage()
    const [expandedContainers, setExpandedContainers] = useState([])

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

    return(
        <section className={"L2-container"}>
            {projects && projects.map((project, index) => {
                const isExpanded = expandedContainers.includes(index)
                    return(
                        <div key={project._id}>
                            <div className={"index-container"}>
                                <div className={"index-number"}>{index}</div>
                                <span className={isExpanded? "arrow-open" : "arrow-open _90deg"} onClick={()=>toggleContainer(index)}> ▼ </span>
                                <h2 className={"L2-slug"} onClick={()=>toggleContainer(index)}><p>{project.article.projectTitle}</p></h2>
                            </div>

                                {project.article.projectDescription &&
                                        <p className={`L2-description ${isExpanded ? "expanded" : "collapsed"}`}>
                                            {serialize(project.article.projectDescription)}
                                        </p>
                                }
                        </div>
                    )
            })}
        </section>
    )
}

export default L2Container;