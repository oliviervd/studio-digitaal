import Header from "../../components/header";
import {useCallback, useState, useEffect} from "preact/hooks";

const Exhibitions = () => {

    const BASE_URI = import.meta.env.VITE_REST_API_URL;
    const [loading, setLoading] = useState(true);
    const [exhibitions, setExhibitions] = useState([]);
    const [posters, setPosters] = useState([]);

    const fetchExhibtions = useCallback(async ()=>{
        setLoading(true);
        const url = `${BASE_URI}exhibitions`
        // todo: fetch data and return
    })

    const fetchPosters = useCallback(async ()=>{
        setLoading(true);
        const url = `${BASE_URI}id/archives`
        // todo: fetch data and set state "posters"
        try {
            const response = await fetch(url);
            const data = await response.json();
            setLoading(false)
            setPosters(data);
        } catch (error) {
            console.error(error)
        }
    })

    useEffect(() => {
        fetchPosters();
    }, [BASE_URI])

    console.log(posters)

    return(
        <div>
            <Header/>
            <div className={"main--container"}>
                <div className={"left--panel"}>
                    <p>
                        a list of exhibitions that were organised by the museum.
                    </p>
                </div>
                <div></div>
                <div className={"nest-master"}>
                    <div className={"process__bubble green"} style={{marginTop: "20px"}}>
                        <a className={""}>
                            {loading ? 'requesting' : 'displaying'} data from {BASE_URI}id/archief
                        </a>
                    </div>
                    <div className={"collection--container"}>
                        {posters["GecureerdeCollectie.bestaatUit"] && posters["GecureerdeCollectie.bestaatUit"].map((poster)=>{
                            console.log(poster)
                            return(
                                <div className={"image-container"}>
                                    <img src={poster["cidoc:P129i_is_subject_of"]["@id"].replace("/full/0/default.jpg", "/300,/0/default.jpg")}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Exhibitions;