import "../styles/navigation.css"
import {useEffect, useState} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";

const Sidebar = (props) => {

    const baseURI:string = "https://p01--admin-cms--qbt6mytl828m.code.run";
    const [nav, setNav] = useState([])

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

    if (nav.pages) {
        return(
            <div className={"sidebar__container"}>
                {nav["pages"].map((p, index) => {
                    return(
                        <a onClick={()=>{ props.changePage(p)}}>{p.page.title}</a>
                    )
                })}
            </div>
        )
    }

}

export default Sidebar;