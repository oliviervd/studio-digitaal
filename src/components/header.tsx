import {useState, useEffect} from "react";
import {fetchPayload} from "../utils/fetchPayload.ts";
import {serialize} from "../utils/serialize.ts";
const Header = (props) => {

    const [about, setAbout] = useState([])
    let _switch = "en";
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";


    // fetch data
    useEffect(() => {
        fetchPayload(baseURI, "studios", 10, props.language).then((data)=>{
            const _unserializedText = data["docs"][3]["description"][0]
            const _serializedText = serialize(_unserializedText)
            setAbout(_serializedText);
        })
    }, [props.language]);

    return(
        <header>
            <h1 className={"about"} dangerouslySetInnerHTML={{ __html: about }}></h1>
        </header>
    )
}

export default Header;