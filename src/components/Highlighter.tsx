import {useEffect} from "preact/hooks";

const Highlighter = () => {
    useEffect(() => {
        // get the ID from the URL
        const URLParams = new URLSearchParams(window.location.search);
        const ElementID = URLParams.get("id");

        if (ElementID) {
            console.log(ElementID)
        }
    }, []);
}