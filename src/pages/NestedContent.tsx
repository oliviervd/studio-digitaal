import {useLanguage} from "../utils/languageProvider";
import serialize from "../utils/serialize";
import {useEffect} from "preact/hooks";

const NestedContent = ({projects, type}) => {
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
        <section className={"indent-border-left"}>
            {projects && projects.map((project, index) => {
                if (project.article.postType === type){
                    return(
                        <details id={project.article.path}>
                            <summary>
                                {project.article.projectTitle}
                            </summary>
                            {project.article.projectDescription &&
                                <div className={"indent-border-left"}>
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
                                                <div className={"indent-border-left"}>
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
                }
            })}
        </section>
    )
}

export default NestedContent;