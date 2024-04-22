import "../styles/project.css"
import serialize from "../utils/serialize";

const Project = (props) =>  {

    console.log(props.project)

    return(
        <div className={"project--container"}>
            <div className={"copy"}>
                <h1>{props.project.projectTitle}</h1>
                <p>{serialize(props.project.projectDescription)}</p>
            </div>
            <div className={"media"}>
                <img src={props.project["heroImage"]["url"]}/>
            </div>
        </div>
    )
}
export default Project