import {ApiResponse} from "./ApiResponse";
import serialize from "../utils/serialize";

const Block = (props) => {
    // if title parse as title
    if (props.data.type === "title") {
        return(
            <h1>{props.data.text}</h1>
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
        console.log(props.data.richText)
        let text = serialize(props.data.richText)
        console.log(text)
        return(
            <div>{text}</div>
        )
    }

}
export default Block