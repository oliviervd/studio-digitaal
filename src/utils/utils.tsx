export function openAllDetails(detailsRefs) {
    //todo: make function general (it works for other components as well)
    const openNestedDetails = (detailsElement) => {
        detailsElement.open = true;
        const nestedDetails = detailsElement.querySelectorAll("details");
        nestedDetails.forEach((nestedDetail) => {
            openNestedDetails(nestedDetail);
        });
    };

    detailsRefs.current.forEach((ref) => {
        if (ref) {
            openNestedDetails(ref);
        }
    });
};