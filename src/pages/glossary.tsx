import {useEffect, useState, useRef} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import {route} from "preact-router";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";

const Glossary = () => {

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const [glossary, setGlossary] = useState<string>([]);
    const {language, setLanguage} = useLanguage()
    const refs = useRef({})

    // todo: expand full article at once (with button) - with collapse all.

    // fetch data Glossary
    useEffect(()=>{
        fetchPayload(baseURI, "Glossary", 100, language).then((data)=>{
            // sort concepts alphabetically
            const sortedData = data["docs"].sort((a, b) => a.concept.localeCompare(b.concept));
            setGlossary(sortedData)
        })
    }, [language])

    return(
        <div>
            {glossary && glossary.map((concept, index)=>{
                return (
                    <details key={concept.concept} ref={el => refs.current[concept.concept] = el}>
                        <summary> {concept.concept}</summary>
                        {concept.description &&
                            <div style={{borderLeft: "2px solid blue", paddingLeft: "20px"}}>
                                <p>{serialize(concept.description)}</p>
                                {concept.references && concept.references.map((ref, idx) => {
                                    return (
                                        <details key={idx}>
                                            <summary
                                                style={{textDecoration: "underline", fontWeight: "300"}}>sources
                                            </summary>
                                            <div style={{borderLeft: "2px solid pink", paddingLeft: "20px"}}>
                                                <ol className={"index-container"}>
                                                    <li>
                                                        <a className={"source"} href={ref.url}>{ref.source}</a>
                                                    </li>
                                                </ol>
                                            </div>
                                        </details>
                                    );
                                })}
                            </div>
                        }
                    </details>
                );

            })}
        </div>
    )
}
export default Glossary;