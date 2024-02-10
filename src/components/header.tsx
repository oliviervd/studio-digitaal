import {useState, useEffect} from "react";
import {fetchPayload} from "../utils/fetchPayload.ts";
import {serialize} from "../utils/serialize.ts";
const Header = () => {

    const [about, setAbout] = useState("")
    const [language, setLanguage] = useState("en")
    let _switch = "en";
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";


    // fetch data
    useEffect(() => {
        fetchPayload(baseURI, "studios", 10, "en").then((data)=>{
            const _unserializedText = data["docs"][3]["description"][0]
            console.log(_unserializedText)
            const _serializedText = serialize(_unserializedText)
            console.log(_serializedText)
            const section = document.querySelector(".about");
            section.innerHTML = _serializedText;
            setAbout(_serializedText);
        })
    }, []);

    return(
        <header>
            <h1 className={"about"}>{about}</h1>
            <nav>
                <a>{_switch}</a>
            </nav>
        </header>
    )
}

export default Header;