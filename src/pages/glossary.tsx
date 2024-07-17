import {useEffect, useState, useRef} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";

const Glossary = ({sub, glossary}) => {

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const {language, setLanguage} = useLanguage()
    const refs = useRef({})

    // todo: expand full article at once (with button) - with collapse all.
    // todo: add reading time.


    // Scroll to the element when sub prop is updated
    useEffect(() => {
        if (sub && refs.current[sub]) {
            refs.current[sub].scrollIntoView({ behavior: 'smooth' });
            refs.current[sub].open = true;  // Automatically open the details element
        }
    }, [sub, glossary]);

    return(
        <div className={"L1-container"}>
            {glossary && glossary.map((concept, index)=> {
                return (
                    <details id={concept.url} key={concept.concept} ref={el => refs.current[concept.concept] = el}>
                        <summary> {concept.concept}</summary>
                        {concept.description &&
                            <div className={"indent-border-left"}>
                                <p>{serialize(concept.description)}</p>
                                {concept.references && concept.references.map((ref, idx) => {
                                    return (
                                        <details key={idx}>
                                            <summary
                                                style={{textDecoration: "underline", fontWeight: "300"}}>sources
                                            </summary>
                                            <div className={"indent-border-left"}>
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