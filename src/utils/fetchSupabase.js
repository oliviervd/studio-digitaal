import {createClient} from "@supabase/supabase-js";

export function getSupabaseBrowserClient() {

    return createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY
    )
}

export function getObjects(client) {
    return client
        .from("dmg_objects_LDES")
        .select("objectNumber, iiif_image_uris, LDES_raw")
        .eq("STATUS", "HEALTHY")
        .limit(10000)
}

export function getAgents(client) {
    return client
        .from("dmg_personen_LDES")
        .select("LDES_raw")
}