import {getSupabaseBrowserClient, getObjects, getAgents} from "../utils/fetchSupabase";
import {useEffect, useState} from "preact/hooks";

const DigitizationProcess = () => {
    const supabaseClient = getSupabaseBrowserClient();
    const [objects, setObjects] = useState([]);
    const [agents, setAgents] = useState([])
    const [loading, isLoading] = useState(true);

    useEffect(() => {

        const fetchPublicObjects = async()=>{
            const result = await getObjects(supabaseClient);
            setObjects(result)
        }

        const fetchAgents = async() => {
            const result = await getAgents(supabaseClient);
            setAgents(result)
        }

        fetchPublicObjects();
        fetchAgents();

    }, []);

    console.log(agents)

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

            <section>
                <hr/>
                <div className={"process__container"}>

                    <div className={"process__bubble"}>
                        {objects && objects["data"] &&
                            <p>{objects["data"].length} objects</p>
                        }
                    </div>
                    <div className={"process__bubble"}>
                        {objects && objects["data"] &&
                            <p>{countImages(objects) * 10} colors tagged</p>
                        }

                    </div>
                    <div className={"process__bubble"}>
                        {objects && objects["data"] &&
                            <p>{countImages(objects)} media assets</p>
                        }
                    </div>
                    <div className={"process__bubble"}>
                        {agents && agents["data"] &&
                            <p>{agents["data"].length} agents </p>
                        }
                    </div>

                </div>

            </section>


        </div>

    )
}
export default DigitizationProcess