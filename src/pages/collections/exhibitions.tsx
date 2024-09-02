import Header from "../../components/header";
import {useCallback, useState} from "preact/hooks";

const Exhibitions = () => {

    const BASE_URI = import.meta.env.VITE_REST_API_URL;
    const [loading, setLoading] = useState(true);
    const [exhibitions, setExhibitions] = useState([]);

    const fetchExhibtions = useCallback(async ()=>{
        setLoading(true);
        const url = `${BASE_URI}exhibitions`

    })


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
                            {loading ? 'requesting' : 'displaying'} data from {BASE_URI}exhibitions.
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Exhibitions;