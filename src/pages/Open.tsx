import Header from "../components/header";
import {fetchPayload} from "../utils/fetchPayload";
import {useEffect, useState} from "preact/hooks";
import {useLanguage} from "../utils/languageProvider";
import serialize from "../utils/serialize";


const Open = (props) => {
    const {language, setLanguage} = useLanguage()
    const [trajectory, setTrajectory] = useState([]);
    const baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run"
    //todo: move to env


    // fetch content
    useEffect(() => {
        fetchPayload(baseURI, "trajectory", 10, language).then((data)=>{
            for (let i =0; i<data.docs.length ;i++) {
                if (data.docs[i].trajectoryTitle=="open-collection")
                setTrajectory(data.docs[i])
            }
        })
    }, []);

    console.log(trajectory)

    return(
        <div>
            <Header/>
            <h1>{trajectory.trajectoryTitle}</h1>
            <section>
                <p>{serialize(trajectory.trajectoryDescription)}</p>
            </section>
        </div>
    )
}

export default Open;