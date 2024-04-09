import {useState, useEffect} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import "../styles/api-docs.css"

import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
import ApiDoc from "../components/apiDoc";

const ApiDocs = (props) => {
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const [nav, setNav] = useState([])
    const [apiPage, setApiPage] = useState([])
    const [open, setOpen] = useState(false);

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
        if (nav.pages) {
            setApiPage(nav.pages[0])

        }
    }

    function changePage(page) {
        setApiPage(page)
        //console.log(page)
    }

    return(
        <div>
            <Header setOpen={setOpen} open={open}/>
            <section className={"api-doc__container"}>
                <Sidebar changePage={changePage} nav={nav}/>
                <ApiDoc apiPage={apiPage}/>
            </section>
            <Footer showFont={false}/>
        </div>
    )

}

export default ApiDocs