const buttonMoveUp = () => {

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <div className="button-circle" onClick={()=>{scrollToTop()}}>
            <h2>↑</h2>
        </div>
    )
}

export default buttonMoveUp