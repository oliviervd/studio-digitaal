const fontChanger = ({handleFontChange}) => {
    return(
        <div className={"font-changer"}>
            <select onChange={handleFontChange}>
                <option value={"monospace"}>monospace</option>
                <option value={"serif"}>serif</option>
                <option value={"sans-serif"}>sans-serif</option>
                <option value={"cursive"}>cursive</option>
                <option value={"system-ui"}>system-ui</option>
                <option value={"fantasy"}>fantasy</option>
                <option value={"ui-rounded, sans-serif"}>ui-rounded</option>
            </select>
        </div>
    )
}
export default fontChanger