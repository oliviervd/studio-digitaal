import {useQuery} from "@tanstack/react-query";
import * as axios from "axios";

export async function fetchPayload(BASE_URI, collection, limit, locale) {
    try{
        const res = await fetch(`${BASE_URI}/api/${collection}?limit=${limit}&locale=${locale}`)
        const data = await res.json()
        return data;
    } catch(e) {
        console.error(e)
    }
}
