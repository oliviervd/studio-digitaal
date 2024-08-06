import serialize from "../utils/serialize";

const NestedArticle = ({id, articles}) => {
    console.log(articles)

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
                            </p>
                        </details>
                    )
                }
            })}

        </section>

    )
}

export default NestedArticle;