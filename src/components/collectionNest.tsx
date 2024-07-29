import {useEffect, useState} from "preact/hooks";

const CollectionNest = ({ collection, color, setColor }) => {
    const [colors, setColors] = useState([]);
    useEffect(() => {
        const fetchColors = async() => {
            try{
                const response = await fetch("https://data.designmuseumgent.be/v1/colors")
                const data = await response.json()
                setColors(data)

            } catch(error){
                console.log("Error fetching colors: ", error)
            }
        }
        fetchColors();
    },[])

    console.log(colors)

    if (collection === "colors") {
        return (
            <div className={"process__container"} style={{overflowY: "auto", overflowX: "hidden", height: "100%"}}>
                {Object.entries(colors).map(([colorCode, colorName]) => (
                    <div className={"process__bubble"} style={{maxWidth: "90%", justifyContent: "center", margin: "auto"}}>
                        <p key={colorCode} onClick={()=>setColor(colorName)}>{colorName}</p>
                    </div>
                ))}
            </div>
        )
    }

    return null;
};

export default CollectionNest;
