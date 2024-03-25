// displays API documenteation
// includes API response components for working examples.

import {ApiResponse} from "./ApiResponse";
import {FunctionComponent} from "preact";

interface ApiDocProps {
    endpoint: string;
    description: string
}
const ApiDoc : FunctionComponent<ApiDocProps> = ({endpoint, description}) => {
    return(
        <div className={"api-doc"}>
            <p>{description}</p>
            <ApiResponse endpoint={endpoint}/>
        </div>
    )
}


export default ApiDoc;
