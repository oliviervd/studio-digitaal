const CountingBox = ({type, loading, count}) => {
    if (loading) {
        return(
            <div className={"process__bubble"}>
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