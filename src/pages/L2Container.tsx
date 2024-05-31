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
                    //console.log(project.article)
                    return(
                        <div key={project._id}>
                            <div className={"index-container"}>
                                <div className={"index-number"}>{index}</div>
                                <div className={"arrow-container"}>
                                    <span className={isExpanded ? "arrow-open" : "arrow-open _90deg"}
                                          onClick={() => toggleContainer(index)}> ▼ </span>
                                </div>
                                <h2 className={"L2-slug"} onClick={() => toggleContainer(index)}>
                                    <p>{project.article.projectTitle}</p></h2>
                            </div>

                                {project.article.projectDescription &&
                                        <div className={`L2-description ${isExpanded ? "expanded" : "collapsed"}`}>
                                            {project.article.heroImage &&
                                                <img src={project.article.heroImage.url}/>
                                            }
                                            <p>{serialize(project.article.projectDescription)}</p>
                                        </div>
                                }
                        </div>
                    )
            })}
        </section>
    )
}

export default L2Container;