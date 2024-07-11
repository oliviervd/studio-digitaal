import {useState, useEffect} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";

import Header from "../components/header";
import Footer from "../components/footer";
import ApiDoc from "../components/apiDoc";

const ApiDocs = (props) => {
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const [nav, setNav] = useState([])
    const [apiPage, setApiPage] = useState([])
    const [open, setOpen] = useState(false);
    const [scrollToID, setScrollToID] = useState(null)

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


    return(
        <div>
            <Header setOpen={setOpen} open={open}/>
            <section className={"nest-master"}>
                {/*  <details>`
                    <summary>articles</summary>
                    <Sidebar changePage={changePage} nav={nav}/>
                </details>*/}
                {nav && nav.pages && nav.pages.map((article)=>{
                    console.log(article)
                    return(
                        <details>
                            <summary>{article.page.title}</summary>
                            <ApiDoc apiPage={article}/>
                            {article.page.subDoc && article.page.subDoc.map((sub)=>{
                                console.log(sub)
                                return(
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
    )

}

export default ApiDocs