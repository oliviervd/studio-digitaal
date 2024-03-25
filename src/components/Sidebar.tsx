import "../styles/navigation.css"
const Sidebar = (props) => {
    return(
        <div className={"sidebar__container"}>
            {props.apiPages.map((p, index)=>{
                return (
                    <a onClick={()=>props.setApiPage(props.apiPages[index])}>{p.title}</a>
                )
            })}
        </div>
    )
}

export default Sidebar;