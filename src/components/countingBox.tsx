import {route} from "preact-router";

const CountingBox = ({type, loading, count}) => {
    if (loading) {
        return(
            <div style={{backgroundColor:"#02dc00", borderColor:"white"}} className={"process__bubble"}>
                <p style={{color:"white"}}>counting {type}...</p>
            </div>
        )
    } else if (!loading) {
        return (
            <div onClick={()=>route(`/collection/${type}`)} className={"process__bubble"}>
                <p>{count} {type}</p>
            </div>
        )
    }
}
export default CountingBox;