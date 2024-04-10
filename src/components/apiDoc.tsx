import Block from "./block";
import {useState} from "preact/hooks";

const ApiDoc = (props) => {
    // set tab
    const [tab, setTab] = useState("object")

    if (props.apiPage.page) {
        return(
            <div className={"api-doc"}>
                {props.apiPage.page.layout.map((e)=>{
                    return(
                        <Block data={e}/>
                    )
                })}
                {props.apiPage.page.title !== "introduction" && props.apiPage.page.title !== "images" &&
                    // todo: only show tab when there's something inside of it show.
                    <section>
                        <div className={"tabs"}>
                            <h1 id={"object"} style={{textDecoration: tab === "object" ? "underline" : "none"}}
                                onClick={() => setTab("object")}>object(s)</h1>
                            <h1 id={"agent"} style={{textDecoration: tab === "agent" ? "underline" : "none"}}
                                onClick={() => setTab("agent")}>agent(s)</h1>
                            <h1 id={"exhibition"} style={{textDecoration: tab === "exhibition" ? "underline" : "none"}}
                                onClick={() => setTab("exhibition")}>exhibition(s)</h1>
                            <h1 id={"concept"} style={{textDecoration: tab === "concept" ? "underline" : "none"}}
                                onClick={()=>setTab("concept")}>concept(s)</h1>
                        </div>
                        {tab && props.apiPage.page[tab] && props.apiPage.page[tab].layout.map((e) => {
                            return (
                                <Block data={e}/>
                            )
                        })}
                    </section>
                }
            </div>
        )

    }
}


export default ApiDoc;
