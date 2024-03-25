import {useState, useEffect} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";
import "../styles/api-docs.css"

import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/Sidebar";
import ApiDoc from "../components/apiDoc";

const ApiDocs = (props) => {
    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const [apiPages, setApiPages] = useState([])
    const [apiPage, setApiPage] = useState(apiPages[0])
    // parse data from payload

    useEffect(() => {
        fetchPayload(baseURI, "apiDoc", 10, props.language).then((data)=>{
            setApiPages(data.docs);
        })
    }, []);

    return(
        <div>
            <Header/>
            <section className={"api-doc__container"}>
                <Sidebar apiPages={apiPages} setApiPage={setApiPage}/>
                <ApiDoc apiPage={apiPage}/>
            </section>
            <Footer/>
        </div>
    )

}

export default ApiDocs