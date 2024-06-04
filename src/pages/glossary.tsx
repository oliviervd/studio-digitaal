import {useEffect, useState, useRef} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import {route} from "preact-router";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";

const Glossary = ({expandedContainersGlossary, setExpandedContainersGlossary}) => {

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const [glossary, setGlossary] = useState<string>([]);
    const {language, setLanguage} = useLanguage()
    const refs = useRef({})

    // todo: sources expandable
    // todo: expand full article at once (with button) - with collapse all.

    // fetch data Glossary
    useEffect(()=>{
        fetchPayload(baseURI, "Glossary", 100, language).then((data)=>{
            // sort concepts alphabetically
            const sortedData = data["docs"].sort((a, b) => a.concept.localeCompare(b.concept));
            setGlossary(sortedData)
        })
    }, [language])

    // Handle hash navigation
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setTimeout(() => {
                if (refs.current[hash]) {
                    // todo: toggle container (index) — in hash?
                    refs.current[hash].scrollIntoView({ behavior: "smooth" });
                    setExpandedContainersGlossary(prevState => {
                        if (!prevState.includes(hash)) {
                            return [...prevState, hash];
                        }
                        return prevState;
                    });
                }
            }, 100); // Slight delay to ensure elements are rendered
        }
    }, [glossary, language, refs]);
    return(
        <div>
            {glossary && glossary.map((concept, index)=>{
                return (
                    <div key={concept.concept} ref={el => refs.current[concept.concept] = el}>
                        <details>
                            <summary> {concept.concept}</summary>
                            {concept.description &&
                                <div>
                                    <p>{serialize(concept.description)}</p>
                                    {concept.references && concept.references.map((ref, idx) => {
                                        return (
                                            <div key={idx}>
                                                <p style={{ textDecoration: "underline" }}>sources</p>
                                                <ol className={"index-container"}>
                                                    <li>
                                                        <a className={"source"} href={ref.url}>{ref.source}</a>
                                                    </li>
                                                </ol>
                                            </div>
                                        );
                                    })}
                                </div>
                            }
                        </details>
                    </div>
                );

            })}
        </div>
    )
}
export default Glossary;