import {route} from "preact-router";

const CountingBox = ({type, loading, count, active}) => {
    if (loading) {
        return(
            <div style={{backgroundColor:"#FF0000", borderColor:"white"}} className={"process__bubble"}>
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