import {ApiResponse} from "./ApiResponse";
import serialize from "../utils/serialize";

const Block = (props) => {
    // if title parse as title
    if (props.data.type === "title") {
        return(
            <h1 id={props.data.text}>{props.data.text}</h1>
        )
    }


    // if subtitle parse as subtitle
    if (props.data.type === "subtitle") {
        return(
            <h2 id={props.data.text}>{props.data.text}</h2>
        )
    }


    // if endpoint use to generate api response
    if (props.data.type === "endpoint") {
        return(
            <ApiResponse endpoint={props.data.text}/>
        )
    }

    // if richtext
    if (props.data.blockType === "RichTextBlock") {
        let text = serialize(props.data.richText)
        return(
            <div>{text}</div>
        )
    }
    // if code snippet

    if (props.data.blockType === "codeSnippet") {
        return (
            <div>
                <div>
                    {props.data.Curl.snippet &&
                        <div className={"snippet"}>
                            <p>curl</p>
                            <pre className={"codeBox"}>{props.data.Curl.snippet}</pre>
                        </div>
                    }
                </div>
                <div>
                    {props.data.Python.snippet &&
                        <div className={"snippet"}>
                            <p>python</p>
                            <pre className={"codeBox"}>{props.data.Python.snippet}</pre>
                        </div>
                    }
                </div>
                <div>
                    {props.data.Javascript.snippet &&
                        <div className={"snippet"}>
                            <p>javascript</p>
                            <pre className={"codeBox"}>{props.data.Javascript.snippet}</pre>
                        </div>
                    }
                </div>
            </div>
        )

    }
    // todo: code snippet
    // todo: add possibility to copy to clipboard

}
export default Block