import {useLanguage} from "../utils/languageProvider";
import serialize from "../utils/serialize";

const NestedContent = ({projects}) => {
    const {language, setLanguage} = useLanguage()

    return(
        <section style={{borderLeft: "2px solid blue"}} className={"L2-container"}>
            {projects && projects.map((project, index) => {
                if (project.article.subProjects[0] && project.article.subProjects[0].project !== null){
                    console.log(project.article.subProjects)
                }
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
                                {project.article.subProjects[0] && project.article.subProjects[0].project !== null && project.article.subProjects.map((project)=> {
                                    console.log(project.project)
                                    return (
                                        <details>
                                            <summary>{project.project.projectTitle}</summary>
                                            <div style={{borderLeft: "2px solid pink", paddingLeft: "20px"}}>
                                                <p>{serialize(project.project.projectDescription)}</p>
                                            </div>
                                        </details>
                                    )

                                })
                                }
                            </div>
                        }
                    </details>
                )
            })}
        </section>
    )
}

export default NestedContent;