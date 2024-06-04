import {useLanguage} from "../utils/languageProvider";
import serialize from "../utils/serialize";

const L2Container = ({projects}) => {
    const {language, setLanguage} = useLanguage()

    // todo: images lazy load and hide in details

    return(
        <section style={{borderLeft: "2px solid blue"}} className={"L2-container"}>
            {projects && projects.map((project, index) => {
                return(
                    <details key={project._id}>
                        <summary>
                            {project.article.projectTitle}
                        </summary>
                        {project.article.projectDescription &&
                            <div style={{borderLeft: "2px solid pink", paddingLeft: "20px"}}>
                                {project.article.heroImage &&
                                    <details>
                                        <summary>image</summary>
                                        {project.article.heroImage &&
                                            <img loading="lazy" src={project.article.heroImage.url}/>
                                        }
                                    </details>
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