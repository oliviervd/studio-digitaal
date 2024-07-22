import {getSupabaseBrowserClient, getObjects, getAgents} from "../utils/fetchSupabase";
import {useEffect, useState} from "preact/hooks";
import CountingBox from "./countingBox";

const DigitizationProcess = () => {
    const supabaseClient = getSupabaseBrowserClient();
    const [objects, setObjects] = useState([]);
    const [agents, setAgents] = useState([])
    const [loading, isLoading] = useState({
        agents: true,
        objects: true,
        images: true
    });

    const [count, isCounting] = useState({
        agents: 0,
        objects: 0,
        images: 0
    })

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

    console.log(count);

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
                    <CountingBox count={count["objects"]} loading={loading["objects"]} type={"objects"}/>
                    <CountingBox count={count["images"]} loading={loading["images"]} type={"images"}/>
                    <CountingBox count={"agents"} loading={loading["agents"]} type={"agents"}/>
                </div>
            </section>
        </div>
    )
}
export default DigitizationProcess