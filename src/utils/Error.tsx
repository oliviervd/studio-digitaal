import Header from "../components/header";

const Error = () => {
    return (
        <div>
            <Header/>
            <hr/>
            <hr/>
            <div style={{padding: "20px"}}>
                <h1>404 Not Found</h1>
                <h1>unfortunately we couldn't find what you are looking for..</h1>
                <h1>can I take you back <a href={"/"}>home</a>?</h1>
            </div>

        </div>
    )
}
export default Error;