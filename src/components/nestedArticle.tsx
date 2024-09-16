import serialize from "../utils/serialize";
import NestedContent from "../pages/NestedContent";

const NestedArticle = ({id, articles}) => {
    return(
        <section>
            {articles.docs && articles.docs.map((doc, i) => {
                //console.log(doc.id)
                if (doc.id === id) {
                    console.log(doc)
                    return (
                        <details>
                            <summary>{doc.projectTitle}</summary>
                            <p className={"indent-border-left"}>
                                {serialize(doc.projectDescription)}
                                {doc.subProjects[0] && doc.subProjects[0].project !== null && doc.subProjects.map((project)=> {
                                    console.log(project)
                                    return(
                                        <NestedArticle articles={articles} id={project.project.id} />
                                    )
                                })}
                            </p>

                        </details>
                    )
                }
            })}

        </section>

    )
}

export default NestedArticle;