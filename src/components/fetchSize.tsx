import {useEffect, useState} from "preact/hooks";

const CalculateSize = () => {
    const [pageSize, setPageSize] = useState(0)

    useEffect(() => {
        calculatePageSize()
    }, []);

    function calculatePageSize() {
        // get size in bytes
        const pageSize = document.documentElement.outerHTML.length;
        // convert to kB
        const pageSizeKB = pageSize / 1024
        setPageSize(pageSizeKB)
    }

    return(
        <div className={"pageSize"}>
            <p>size: {pageSize} KB</p>
        </div>
    )
}
export default CalculateSize