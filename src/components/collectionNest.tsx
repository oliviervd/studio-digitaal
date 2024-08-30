import {useEffect, useState} from "preact/hooks";

const CollectionNest = ({ collection, setColor }) => {
    const BASE_URI = import.meta.env.VITE_REST_API_URL;
    const [colors, setColors] = useState([]);
    const [objects, setObjects] = useState([]);


    useEffect(() => {
        if (collection == "objects") {
            const fetchObjects = async() => {
                try {
                    const response = await fetch(`${BASE_URI}id/objects`)
                    const data = await response.json()
                    setObjects(data)
                } catch(e) {
                    console.log('Error fetching objects:', e)
                }
            }
            fetchObjects();
        }
    }, []);


    useEffect(() => {
        if (collection == "colors") {
            console.log("fetching colors")
            const fetchColors = async() => {
                try{
                    const response = await fetch(`${BASE_URI}colors`)
                    const data = await response.json()
                    setColors(data)

                } catch(error){
                    console.log("Error fetching colors: ", error)
                }
            }
            fetchColors();
        }
    },[])

    console.log(objects["GecureerdeCollectie.bestaatUit"])

    if (collection == "colors") {

        return (
            <div className={"process__container"} style={{overflowY: "auto", overflowX: "hidden", height: "100%"}}>
                {Object.entries(colors).map(([colorCode, colorName]) => (
                    <div className={"process__bubble"} style={{maxWidth: "90%", justifyContent: "center", margin: "auto"}}>
                        <p key={colorCode} onClick={()=>setColor(colorName, false)}>{colorName}</p>
                    </div>
                ))}
            </div>
        )
    }

    if (collection == "objects" && objects) {
        return(
            <div className={"process__container"} style={{overflowY: "auto"}}>
                {Object.entries(objects).map((x) => (
                    console.log(x['@id'])
                ))}
                <p>objects</p>
            </div>
        )
    }
    return null;
};

export default CollectionNest;
