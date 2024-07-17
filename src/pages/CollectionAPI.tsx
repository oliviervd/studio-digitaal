import {useState, useEffect} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";

import Header from "../components/header";
import Footer from "../components/footer";
import ApiDoc from "../components/apiDoc";
import serialize from "../utils/serialize";
import {useLanguage} from "../utils/languageProvider";

const ApiDocs = (props) => {
    const {language, setLanguage} = useLanguage()

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const [nav, setNav] = useState([])
    const [apiPage, setApiPage] = useState([])
    const [open, setOpen] = useState(false);
    const [scrollToID, setScrollToID] = useState(null)
    const [about, setAbout] = useState([])
    const [font, setFont] = useState("serif")



    // fetch data
    useEffect(() => {
        fetchPayload(baseURI, "studios", 10, language).then((data)=>{
            setAbout(serialize(data["docs"][3]["description"]));
        })
    }, [language]);

    // todo: fix styling
    console.log(nav)

    // fetch and parse data from CMS
    useEffect(()=>  {
        // to do change language to props;
        fetchPayload(baseURI, "navigationSD", 10, "en").then((data) => {
                for (let i = 0; i < data["docs"].length; i ++) {
                    if (data["docs"][i]["pageGroup"] === "collection-api") {
                        setNav(data["docs"][i])
                    }
                }
            }
        )

    },[])

    if (apiPage.length == 0) {
        if (nav && nav.pages) {
            setApiPage(nav.pages)
        }
    }

    function changePage(page, id) {
        setApiPage(page)
        if (id) {
            setScrollToID(id)
        }
        else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }

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
        <div>
            <Header language={language} changeLang={changeLang}
                    handleFontChange={handleFontChange} font={font}
            />
            <div className={"main--container"}>
                <div className={"left--panel"}>
                    <p style={{fontColor: "black"}}>{about}</p>
                </div>
                <div></div>
                <section className={"nest-master"}>
                    {/*  <details>`
                    <summary>articles</summary>
                    <Sidebar changePage={changePage} nav={nav}/>
                </details>*/}
                    {nav && nav.pages && nav.pages.map((article) => {
                        console.log(article)
                        return (
                            <details>
                                <summary>{article.page.title}</summary>
                                <ApiDoc apiPage={article}/>
                                {article.page.subDoc && article.page.subDoc.map((sub) => {
                                    console.log(sub)
                                    return (
                                        <>
                                        </>
                                    )
                                })}
                            </details>
                        )
                    })}
                    {/*   <details>
                    <ApiDoc apiPage={apiPage} scrollToID={scrollToID}/>
                </details>*/}
                </section>
                <Footer showFont={false}/>
            </div>
        </div>
    )

}

export default ApiDocs