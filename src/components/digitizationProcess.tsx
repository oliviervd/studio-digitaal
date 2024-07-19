import {getSupabaseBrowserClient, getObjects} from "../utils/fetchSupabase";
import {useEffect, useState} from "preact/hooks";
import {objectTraps} from "immer/src/core/proxy";

const DigitizationProcess = () => {
    const supabaseClient = getSupabaseBrowserClient();
    const [objects, setObjects] = useState([]);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        const fetchPublicObjects = async()=>{
            const result = await getObjects(supabaseClient);
            setObjects(result)
        }
        fetchPublicObjects()
    }, []);

    function countImages(collection) {
        console.log(collection);
        let count = 0;
        for(let i =0; i<collection["data"].length; i++){
            if(collection["data"][i]["iiif_image_uris"]) {
                count = count + collection["data"][i]["iiif_image_uris"].length
            }
        }
        return count;
    }


    // todo: add function that measures the number of colors that have been tagged (filter)
    // todo: add function that fetches the number of images opened up.

    return(
        <div>

            {objects && objects["data"] &&
                <section>
                    <hr/>
                    <div className={"process__container"}>

                        <div className={"process__bubble"}>
                            <p>{objects["data"].length} objects</p>
                        </div>
                        <div className={"process__bubble"}>
                            <p>{countImages(objects) * 10} colors tagged</p>
                        </div>
                        <div className={"process__bubble"}>
                            <p>{countImages(objects)} media assets</p>
                        </div>
                    </div>
                </section>


            }
        </div>

    )
}
export default DigitizationProcess