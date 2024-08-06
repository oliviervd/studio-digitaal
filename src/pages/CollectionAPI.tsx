import {useState, useEffect} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";

import Header from "../components/header";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";
import {i} from "@tanstack/query-core/build/legacy/queryClient-Ho-z40Sw";
import NestedArticle from "../components/nestedArticle";

const ApiDocs = (props) => {
    const {language, setLanguage} = useLanguage()
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const [font, setFont] = useState("serif")
    const [docs, setDocs] = useState([])
    const [articles, setArticles] = useState([])
    const [about, setAbout] = useState([])

    // fetch data
    useEffect(() => {
        fetchPayload(baseURI, "studios", 10, language).then((data)=>{
            setAbout(serialize(data["docs"][3]["description"]));
        })
    }, [language]);

    useEffect(()=> {
        const fetchDocumentation = async() => {
            try {
                const response = await fetch("https://p01--admin-cms--qbt6mytl828m.code.run/api/trajectory/66a8f54f4d72ff7ba84e46e6?locale=en&draft=false&depth=1")
                const data = await response.json()
                setDocs(data)
            } catch(e) {
                console.log("Error fetching collection: ", e)
            }
        }
        fetchDocumentation()
    }, [language])

    useEffect(()=>{
        const fetchArticles = async() => {
            try {
                const data = await fetchPayload(baseURI, "StudioDigitalProject", 1000, "en")
                setArticles(data)
            } catch(e) {
                console.log(e)
            }
        }
        fetchArticles();
    },[language])

    useEffect(()=>{
        document.body.style.fontFamily = font;
        if (font == "fantasy") {
            document.body.style.lineHeight = "1.4";
        }
    },[font])

    function changeLang(lang) {
        setLanguage(lang);
    }

    const handleFontChange = (event) => {
        setFont(event.target.value)
    }

    return(
        <div className={"API-DOC"}>
            <Header language={language} changeLang={changeLang}
                    handleFontChange={handleFontChange} font={font}
            />
            <div className={"main--container"}>
                <div className={"left--panel"}>
                    <p style={{fontColor: "black"}}>{about}</p>
                </div>
                <div/>
                <section className={"nest-master"}>
                    {docs["articles"] && docs["articles"].map((doc) => {
                        if (doc.article.projectTitle == "about") {
                            return (
                                <p>{serialize(doc.article.projectDescription)}</p>
                            )
                        }
                    })}
                    {docs["articles"] && docs["articles"].map((doc) => {
                        if (doc.article.projectTitle !== "about") {
                            return (
                                <details>
                                    <summary>{doc.article.projectTitle}</summary>
                                    <p className={"L1-container"}>{serialize(doc.article.projectDescription)}
                                        {doc.article.subProjects.map((sub) => {
                                            return(
                                                <NestedArticle articles={articles} id={sub.project}/>
                                            )
                                        })}

                                    </p>
                                </details>
                            )
                        }
                    })}
                </section>
            </div>
        </div>
    )

}

export default ApiDocs