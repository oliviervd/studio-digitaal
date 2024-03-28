const DropMenu = (props) => {
    return(
        <div className={props.open? "dropMenu" : "dropMenu closed" }>
            {props.apiPages.map((p, index)=>{
                return (
                    <a onClick={()=>props.setApiPage(props.apiPages[index])}>{p.title}</a>
                )
            })}
        </div>
    )
}
export default DropMenu;