import {useEffect, useState} from "preact/hooks";
import {useLanguage} from "../utils/languageProvider";
import serialize from "../utils/serialize";

const L2Container = ({projects}) => {
    const {language, setLanguage} = useLanguage()
    const [expandedContainers, setExpandedContainers] = useState([])

    // todo: images lazy load and hide in details
    // todo: show filesize

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
                return(
                    <details key={project._id}>
                        <summary>
                            {project.article.projectTitle}
                        </summary>
                        {project.article.projectDescription &&
                            <div>
                                {project.article.heroImage &&
                                    <img src={project.article.heroImage.url}/>

                                }
                                <p>{serialize(project.article.projectDescription)}</p>
                            </div>
                        }
                    </details>
                )
            })}
        </section>
    )
}

export default L2Container;