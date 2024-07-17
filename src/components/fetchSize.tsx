import {useEffect, useState} from "preact/hooks";

const CalculateSize = () => {

    // todo: fix so it only calculates things that are actually loaded (take into account lazy loading.).
    // todo: make absolute after scrolling beyond 100vh - check scrollposition?

    const [pageSize, setPageSize] = useState(0)


    useEffect(() => {
        const handleClick = () => {
            calculatePageSize();
        };

        checkScrollPosition();

        calculatePageSize();
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    function checkScrollPosition() {
        let pos = window.scrollY;
    }

    async function calculatePageSize() {
        // Get the size of the HTML content
        const htmlSize = document.documentElement.outerHTML.length;

        // Calculate media sizes
        const mediaSizes = await calculateMediaSizes();

        // Convert to kB
        const totalSizeKB = (htmlSize + mediaSizes) / 1024;
        setPageSize(totalSizeKB);
    }


    async function calculateMediaSizes() {
        const mediaElements = document.querySelectorAll("img, video, audio");
        let totalMediaSize = 0;

        for (const element of mediaElements) {
            const src = element.currentSrc || element.src;
            if (src) {
                try {
                    const response = await fetch(src, { method: "HEAD" });
                    const contentLength = response.headers.get("Content-Length");
                    if (contentLength) {
                        totalMediaSize += parseInt(contentLength, 10);
                    }
                } catch (error) {
                    console.error("Error fetching media size:", error);
                }
            }
        }

        return totalMediaSize;
    }

    return(
        <div className={"pageSize"}>
            <p>size: {pageSize} KB</p>
        </div>
    )
}
export default CalculateSize