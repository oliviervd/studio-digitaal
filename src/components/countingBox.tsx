import {route} from "preact-router";

const CountingBox = ({type, loading, count, active}) => {
    if (loading) {
        return(
            <div style={{backgroundColor:"ff9900", borderColor:"ff9900"}} className={"process__bubble"}>
                <p style={{color:"white"}}>counting {type}...</p>
            </div>
        )
    } else if (!loading) {
        return (
            <div onClick={()=>route(active?`/collection/${type}`:"")} className={active? "process__bubble" : "process__bubble inactive"}>
                <p>{count} {type}</p>
            </div>
        )
    }
}
export default CountingBox;