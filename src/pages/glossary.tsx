import {useEffect, useState} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";

const Glossary = ({expandedContainersGlossary, setExpandedContainersGlossary}) => {

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const [glossary, setGlossary] = useState<string>([]);
    const {language, setLanguage} = useLanguage()

    // fetch data Glossary
    useEffect(()=>{
        fetchPayload(baseURI, "Glossary", 100, language).then((data)=>{
            // sort concepts alphabetically
            const sortedData = data["docs"].sort((a, b) => a.concept.localeCompare(b.concept));
            setGlossary(sortedData)
        })
    }, [language])

    function toggleContainer(index) {
        setExpandedContainersGlossary(prevState => {
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
        <div>
            {glossary && glossary.map((concept, index)=>{
                console.log(concept)
                const isExpanded = expandedContainersGlossary.includes(index);
                return(
                    <div>
                        <div className={"index-container"}>
                            <div className={"index-number"}>{index}</div>
                            <span className={isExpanded ? "arrow-open" : "arrow-open _90deg"}>▼</span>
                            <h1 className={"glossary-concept"} id={concept.concept} onClick={() => toggleContainer(index)}>{concept.concept}</h1>
                        </div>
                        {concept.description &&
                            <div className={`L1-description ${isExpanded? "expanded" : "collapsed"}`}>
                                <p>{serialize(concept.description)}</p>
                                {concept.references && concept.references.map((ref, index)=>{
                                    console.log(ref)
                                    return(
                                        <div>
                                            <p style={{textDecoration: "underline"}}>sources</p>
                                            <ol className={"index-container"}>
                                                <li>
                                                    <a className={"source"} href={ref.url}>{ref.source}</a>
                                                </li>
                                            </ol>
                                        </div>
                                    )
                                })
                                }

                            </div>
                        }

                    </div>
                )
            })}
        </div>
    )

}
export default Glossary;