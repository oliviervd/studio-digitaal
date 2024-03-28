import Block from "./block";
import {useState} from "preact/hooks";

const ApiDoc = (props) => {
    // set tab
    const [tab, setTab] = useState("object")
    //console.log(props.apiPage)
    if (props.apiPage && props.apiPage[tab]){
        console.log(props.apiPage)
    }

    if (props.apiPage) {
        return(
            <div className={"api-doc"}>
                {props.apiPage.layout.map((e)=>{
                    return(
                        <Block data={e}/>
                    )
                })}
                {props.apiPage.title !== "introduction" &&
                    <section>
                        <div className={"tabs"}>
                            <h1 id={"object"} style={{textDecoration: tab === "object" ? "underline" : "none"}}
                                onClick={() => setTab("object")}>object</h1>
                            <h1 id={"agent"} style={{textDecoration: tab === "agent" ? "underline" : "none"}}
                                onClick={() => setTab("agent")}>agent</h1>
                            <h1 id={"exhibition"} style={{textDecoration: tab === "exhibition" ? "underline" : "none"}}
                                onClick={() => setTab("exhibition")}>exhibition</h1>
                        </div>
                        {tab && props.apiPage && props.apiPage[tab].layout.map((e) => {
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
