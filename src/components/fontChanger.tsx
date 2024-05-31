const fontChanger = ({handleFontChange}) => {
    return(
        <div className={"font-changer"}>
            <select onChange={handleFontChange}>
                <option value={"courier"}>courier</option>
                <option value={"times"}>times</option>
                <option value={"arial"}>arial</option>
                <option value={"verdana"}>verdana</option>
                <option value={"georgia"}>georgia</option>
                <option value={"fantasy"}>fantasy</option>
            </select>
        </div>
    )
}
export default fontChanger