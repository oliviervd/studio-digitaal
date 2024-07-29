const MetadataBubble = ({loading, data, type}) => {
    if (!loading) {
        return (
            <p>...counting {type}</p>
        )

    } else {
        return(
            <p></p>
        )
    }

}

export default MetadataBubble;