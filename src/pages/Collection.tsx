import Header from "../components/header";
import CollectionNest from "../components/collectionNest";
import {useState, useEffect, useRef} from "preact/hooks";
import {openAllDetails} from "../utils/utils";

// re-import collections if not in cache

const Collection = ({type}) => {

    const [font, setFont] = useState("serif") //todo: make this like a context thing.
    const [color, setColor] = useState("Artichoke");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [collapse, setCollapse] = useState(true); // todo: add this to the collapse button.
    const [view, setView] = useState("tiles");
    const detailsRefs = useRef([]);
    const BASE_URI = import.meta.env.VITE_REST_API_URL;
    console.log(BASE_URI)

    useEffect(()=>{
        const fetchObjects = async() => {
            setLoading(true)
            setResults([])
            try {
                const response = await fetch(`${BASE_URI}color-api/${color}?image=true`)
                const data = await response.json()
                setLoading(false)
                setResults(data)
            } catch(error) {
                console.log("Error fetching collection: ", error);
            }
        }
        fetchObjects()
    },[color])

    console.log(results)

    useEffect(()=>{
        document.body.style.fontFamily = font;
        if (font == "fantasy") {
            document.body.style.lineHeight = "1.4";
        }
    },[font])


    const handleFontChange = (event) => {
        setFont(event.target.value)
    }

    return (
        <div>
            <Header handleFontChange={handleFontChange} font={font} />
            <div className={"main--container"}>
                <div className={"left--panel"}>
                    {type === "colors" &&
                        <p>the list of <span><a href={"https://www.w3.org/wiki/CSS/Properties/color/keywords"}>CSS colors</a></span> below
                            are used to color-tag digital reproductions of the collection. This list can also be
                            retrieved via the following endpoint:</p>
                    }
                    <hr/>
                    <hr/>
                    <CollectionNest collection={type} color={color} setColor={setColor}/>
                    <hr style={{marginTop: "20px"}}/>
                    <hr/>
                </div>
                <div></div>
                <div className={"nest-master"}>
                    {loading &&
                        <div>
                            <div className={"process__bubble"} style={{backgroundColor:"#02dc00", borderColor:"white", marginTop: "20px"}}>
                                <a href={`${BASE_URI}color-api/${color}`} style={{color:"white"}}>requesting data
                                    from {`${BASE_URI}color-api/${color}`}</a>
                            </div>
                        </div>
                    }

                    {!loading &&
                        <div className={"process__bubble"} style={{marginTop: "20px"}}>
                            <a href={`${BASE_URI}color-api/${color}`}> displaying data from {`${BASE_URI}color-api/${color}`}</a>
                        </div>

                    }

                    {!loading && (results.length === 0) &&
                        <p>there are no objects with that color in the collection</p>
                    }

                    <div>
                        <nav style={{display: "flex", justifyContent: "end", gap: "10px", flexFlow: "row"}}>
                            <div className={"button__bubble"}>
                                <a onClick={()=>{setView('tiles')}}>show grid</a>
                            </div>
                            <div className={"button__bubble"}>
                                <a onClick={()=>{setView('list')}}>show list</a>
                            </div>
                            {!loading && (results.length !== 0) && (view === "list") &&
                                <div className={"button__bubble"}>
                                    <a onClick={() => openAllDetails(detailsRefs)}> open all </a>
                                </div>
                            }
                        </nav>

                        <hr style={{marginTop: "20px"}}/>
                        <hr/>

                        {view === "tiles" &&
                            <div className={"collection--container"}>
                                {results["GecureerdeCollectie.bestaatUit"] && results["GecureerdeCollectie.bestaatUit"][0].map((object, index) => {
                                    console.log(object)
                                    return (
                                        <div id={index}>
                                            {object['@id'] &&
                                                <img
                                                    src={object['@id'].replace("/full/0/default.jpg", "/300,/0/default.jpg")}
                                                    style={{height: "100px", width: "auto", margin: "auto"}}/>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        }

                        {view === "list" &&
                            <div>
                                {results["GecureerdeCollectie.bestaatUit"] && results["GecureerdeCollectie.bestaatUit"][0].map((object, index) => {
                                    return (
                                        <section key={index}>
                                            <details id={index} ref={(el) => (detailsRefs.current[index] = el)}>
                                                <summary>{object["cidoc:P138_represents"]["@id"]}</summary>
                                                <section className={"indent-border-left"}>
                                                    <details>
                                                        <summary>image</summary>
                                                        {object["@id"] &&
                                                            <img
                                                                src={object["@id"].replace("/full/0/default.jpg", "/1000,/0/default.jpg")}/>
                                                        }
                                                    </details>
                                                </section>
                                            </details>
                                        </section>
                                    )
                                })}
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Collection;