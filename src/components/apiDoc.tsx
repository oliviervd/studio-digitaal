import Block from "./block";

const ApiDoc = (props) => {
    if (props.apiPage) {
        return(
            <div className={"api-doc"}>
                {props.apiPage.layout.map((e)=>{
                    return(
                        <Block data={e}/>
                    )
                })}
            </div>
        )

    }
}


export default ApiDoc;
