import Header from "../components/header";
import CollectionNest from "../components/collectionNest";
import {useState, useEffect, useRef} from "preact/hooks";
import {openAllDetails} from "../utils/utils";

// re-import collections if not in cache
// todo: implement paging in UI
// todo: add input container for fuzzy search.

const Collection = ({type}) => {

    const [font, setFont] = useState("serif") //todo: make this like a context thing.
    const [color, setColor] = useState("Pullman Brown (UPS Brown)");
    const [strict, setStrict] = useState(true)
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [collapse, setCollapse] = useState(true); // todo: add this to the collapse button.
    const [view, setView] = useState("tiles");
    const [pageNumber, setPageNumber] = useState(1)
    const detailsRefs = useRef([]);
    const BASE_URI = import.meta.env.VITE_REST_API_URL;
    const [apiRequest, setApiRequest] = useState(`${BASE_URI}color-api/${color}?image=true`)

    function changeColor(color, strict) {
        setColor(color);
        setStrict(strict);
    }

    useEffect(()=>{
        const fetchObjects = async() => {
            setLoading(true)
            setResults([])
            const currentApiRequest = `${BASE_URI}color-api/${color}?image=true&fuzzy=${strict}&pageNumber=${pageNumber}`;
            setApiRequest(currentApiRequest);
            try {
                const response = await fetch(apiRequest)
                const data = await response.json()
                setLoading(false)
                setResults(data)
            } catch(error) {
                console.log("Error fetching collection: ", error);
            }
        }
        fetchObjects()
    },[color, pageNumber, strict])


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
                            are used to color-tag digital reproductions of the collection. Choose one of the colors in the list below, or search with a personalized color in the input box above.</p>
                    }
                    <hr/>
                    <hr/>

                    <form  onSubmit={(e) => {
                        e.preventDefault();
                        setColor(e.target.elements.colorInput.value);
                    }}>
                        <input name={"colorInput"} type={"text"} placeholder={"what color comes to mind?"} style={{fontFamily: font}}/>
                    </form>

                    <hr/>
                    <hr/>
                    <CollectionNest collection={type} color={color} setColor={changeColor}/>
                    <hr style={{marginTop: "20px"}}/>
                    <hr/>
                </div>
                <div></div>
                <div className={"nest-master"}>

                    <div className={"process__bubble"} style={{marginTop: "20px"}}>
                        <a href={loading ? apiRequest : `${BASE_URI}color-api/${color}`}>
                            {loading ? "requesting" : "displaying"} data from {apiRequest}
                        </a>
                    </div>

                    {!loading && (results.length === 0) &&
                        <p>there are no objects with that color in the collection</p>
                    }

                    <div>
                        <nav style={{display: "flex", justifyContent: "space-between", gap: "10px", flexFlow: "row"}}>
                            <div className={"button__bubble"} style={{justifyContent: "start"}}>
                                <a>{loading ? "counting" : results['hydra:totalItems']} total entities</a>
                            </div>
                            {!loading &&
                                <div style={{display: "flex", justifyContent: "space-between", gap: "10px", flexFlow: "row"}}>
                                    <div className={"button__bubble"}><a>previous set</a></div>
                                    <div className={"button__bubble"}><a>next set</a></div>
                                </div>
                            }

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "10px",
                                flexFlow: "row"
                            }}>
                                <div className={"button__bubble"}>
                                    <a onClick={() => {
                                        setView('tiles')
                                    }}>show grid</a>
                                </div>
                                <div className={"button__bubble"}>
                                    <a onClick={() => {
                                        setView('list')
                                    }}>show list</a>
                                </div>
                                {!loading && (results.length !== 0) && (view === "list") &&
                                    <div className={"button__bubble"}>
                                        <a onClick={() => openAllDetails(detailsRefs)}> open all </a>
                                    </div>
                                }
                            </div>
                        </nav>

                        <hr style={{marginTop: "20px"}}/>
                        <hr/>

                        <div className={view === "tiles" ? "collection--container" : ""}>
                            {results["GecureerdeCollectie.bestaatUit"] && results["GecureerdeCollectie.bestaatUit"].map((object, index) => (
                                <div id={index}>
                                    {object && (
                                        view === "tiles" ? (
                                            object['@id'] &&
                                            <img
                                                src={object['@id'].replace("/full/0/default.jpg", "/300,/0/default.jpg")}
                                                style={{height: "100px", width: "auto", margin: "auto"}}/>
                                        ) : (
                                            object['cidoc:P138_represents'] &&
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
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Collection;