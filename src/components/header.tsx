import {useState, useEffect} from "react";
import {fetchPayload} from "../utils/fetchPayload.ts";
import {serialize} from "../utils/serialize.ts";
const Header = () => {

    const [about, setAbout] = useState([])
    const [language, setLanguage] = useState("en")
    let _switch = "en";
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";


    // fetch data
    useEffect(() => {
        fetchPayload(baseURI, "studios", 10, "en").then((data)=>{
            const _unserializedText = data["docs"][3]["description"][0]
            const _serializedText = serialize(_unserializedText)
            setAbout(_serializedText);
        })
    }, []);

    return(
        <header>
            <h1 className={"about"} dangerouslySetInnerHTML={{ __html: about }}></h1>
            <nav>
                <h1>
                    <a>{_switch}</a>
                </h1>
            </nav>
        </header>
    )
}

export default Header;