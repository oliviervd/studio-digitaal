import {useLanguage} from "../utils/languageProvider";
import serialize from "../utils/serialize";
import {useEffect} from "preact/hooks";

const NestedContent = ({projects}) => {
    const {language, setLanguage} = useLanguage()

    useEffect(() => {
        // fetch ID
        const id = window.location.hash.substring(1)

        const elem = document.getElementById(id);
        if (elem) {
            //console.log(id)
            //console.log(elem)
        } else  {
            //console.log("no such element")
        }

    }, []);

    return(
        <section style={{borderLeft: "2px solid blue"}} className={"L2-container"}>
            {projects && projects.map((project, index) => {
                console.log(project.article.path)
                return(
                    <details id={project.article.path}>
                        <summary>
                            {project.article.projectTitle}
                        </summary>
                        {project.article.projectDescription &&
                            <div style={{borderLeft: "2px solid pink", paddingLeft: "30px"}}>
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
                                    return (
                                        <details>
                                            <summary>{project.project.projectTitle}</summary>
                                            <div style={{borderLeft: "2px solid pink", paddingLeft: "30px"}}>
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