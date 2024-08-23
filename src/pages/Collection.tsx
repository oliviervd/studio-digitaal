import Header from "../components/header";
import CollectionNest from "../components/collectionNest";
import {useState, useEffect, useRef, useCallback} from "preact/hooks";
import {openAllDetails} from "../utils/utils";

// re-import collections if not in cache
// todo: implement paging in UI

const Collection = ({type}) => {

    const [font, setFont] = useState("serif") //todo: make this like a context thing.
    const [color, setColor] = useState("Pullman Brown (UPS Brown)");
    const [strict, setStrict] = useState(true)
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("tiles");
    const [pageNumber, setPageNumber] = useState(1)

    const detailsRefs = useRef([]);
    const BASE_URI = import.meta.env.VITE_REST_API_URL;
    const [apiRequest, setApiRequest] = useState(`${BASE_URI}color-api/${color}?image=true`)

    const changeColor = useCallback((color, strict) => {
        setColor(color);
        setStrict(strict);
    }, []);

    const fetchObjects = useCallback(async (color, strict, page) => {
        setLoading(true); // set loading true when fetching starts
        setResults([]); // clear results before new fetch
        const url = `${BASE_URI}color-api/${color}?image=true&fuzzy=${strict}&page=${page}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setLoading(false); // set loading to false when fetch completes
            setResults(data); // update results with fetched data.
            setApiRequest(url);
        } catch (error) {
            console.log("Error fetching collection: ", error);
            setLoading(false); // ensure loading state is reset even in case of an error.
        }
    }, [BASE_URI]);

    useEffect(()=> {
        fetchObjects(color, strict, pageNumber)
    },[color, strict, pageNumber, BASE_URI])


    useEffect(()=>{
        document.body.style.fontFamily = font;
        if (font == "fantasy") {
            document.body.style.lineHeight = "1.4";
        }
    },[font])


    const handleFontChange = (event) => {
        setFont(event.target.value)
    }

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(prevPage => prevPage - 1);
        }
        console.log(pageNumber)

    }

    const handleNextPage = () => {
        setPageNumber(prevPage => prevPage + 1);
        console.log(pageNumber)
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
                        setStrict(true)
                        setPageNumber(1)
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
                                    {pageNumber > 1 && (
                                        <div className={"button__bubble"}><a onClick={handlePreviousPage}>previous set</a></div>
                                    )}
                                    {results["hydra:view"]?.["hydra:next"] && (
                                        < div className={"button__bubble"}><a onClick={handleNextPage}>next set</a></div>
                                    )}
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