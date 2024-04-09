import "../styles/navigation.css"
import {useEffect, useState} from "preact/hooks";
import {fetchPayload} from "../utils/fetchPayload";

const Sidebar = (props) => {

    if (props.nav.pages) {
        return(
            <div className={"sidebar__container"}>
                {props.nav["pages"].map((p, index) => {
                    return(
                        <a onClick={()=>{ props.changePage(p)}}>{p.page.title}</a>
                    )
                })}
            </div>
        )
    }

}

export default Sidebar;