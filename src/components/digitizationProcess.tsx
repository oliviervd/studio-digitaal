import {getSupabaseBrowserClient, getObjects, getAgents, getExhibitions} from "../utils/fetchSupabase";
import {useEffect, useState} from "preact/hooks";
import CountingBox from "./countingBox";
import {route} from "preact-router";
import {colors_dict} from "../utils/colors";

const DigitizationProcess = () => {
    const supabaseClient = getSupabaseBrowserClient();

    //todo: put all in collections in a shared state?
    //todo: use cookies for data?

    const [objects, setObjects] = useState([]);
    const [agents, setAgents] = useState([])
    const [exhibitions, setExhibitions] = useState([])

    const [loading, isLoading] = useState({
        agents: true,
        objects: true,
        images: true,
        colors: true,
        exhibitions: true,
    });

    const [count, isCounting] = useState({
        agents: 0,
        objects: 0,
        images: 0,
        colors: 0,
        exhibitions: 0,
    })

    useEffect(() => {
        // fetch data from database (supabase)
        const updateLoading = {...loading};
        //object data
        const fetchPublicObjects = async()=>{
            const result = await getObjects(supabaseClient);
            updateLoading.objects = false;
            updateLoading.images = false;
            updateLoading.colors = false;
            isLoading(updateLoading)
            setObjects(result)
        }
        //agent data
        const fetchAgents = async() => {
            const result = await getAgents(supabaseClient);
            updateLoading.agents = false;
            setAgents(result)
        }
        // exhibition data
        const fetchExhibitions = async() => {
            const result = await getExhibitions(supabaseClient);
            updateLoading.exhibitions = false;
            setExhibitions(result)
        }
        fetchPublicObjects();
        fetchAgents();
        fetchExhibitions();
    }, []);

    useEffect(() => {
        const updatedCount = {...count}
        if(!loading.images){
            // set counts objects + derived counts from objects data (images)
            updatedCount.objects = objects.data.length
            updatedCount.images = countImages(objects)
            updatedCount.colors = updatedCount.images * 10;
            isCounting(updatedCount)
        }
        if(!loading.agents) {
            updatedCount.agents = agents.data.length
            isCounting(updatedCount)
        }
        if(!loading.exhibitions) {
            updatedCount.exhibitions = exhibitions.data.length
            isCounting(updatedCount)
        }
    }, [loading]);

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

    return(
        <div>
            <section>
                <hr/>
                <div className={"process__container"}>
                    <CountingBox count={count["objects"]} loading={loading["objects"]} type={"objects"}/>
                    <CountingBox count={count["images"]} loading={loading["images"]} type={"images"}/>
                    <CountingBox count={count["agents"]} loading={loading["agents"]} type={"agents"}/>
                    <CountingBox count={count["colors"]} loading={loading["colors"]} type={"colors"}/>
                    <CountingBox count={count["exhibitions"]} loading={loading["exhibitions"]} type={"exhibitions"}/>
                </div>
            </section>
        </div>
    )
}
export default DigitizationProcess