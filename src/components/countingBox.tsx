const CountingBox = ({type, loading, count}) => {
    if (loading) {
        return(
            <div style={{backgroundColor:"#02dc00", opacity: "0.5", borderColor:"black"}} className={"process__bubble"}>
                <p>counting {type}...</p>
            </div>
        )
    } else if (!loading) {
        return (
            <div className={"process__bubble"}>
                <p>{count} {type}</p>
            </div>
        )
    }
}
export default CountingBox;