import "../styles/navigation.css"

const Sidebar = (props) => {

    if (props.nav.pages) {
        return(
            <div className={"sidebar__container-main"}>
                {props.nav["pages"].map((p, index) => {
                    return(
                        <div className={"sidebar__container"}>
                            <a onClick={() => {
                                props.changePage(p)
                            }}>
                                {p.page.title}

                            </a>
                            {p.page.layout.map((sub)=> {
                                if (sub.type==="title") {
                                    return (
                                        <a onClick={()=>props.changePage(p, sub.text)} className={"subpage"}>{sub.text}</a>
                                    )

                                }
                                else if (sub.type==="subtitle") {
                                    return (
                                        <a onClick={()=>props.changePage(p, sub.text)} className={"subpage-sub"}>{sub.text}
                                        </a>
                                    )

                                }
                            })}
                        </div>

                    )
                })}
            </div>
        )
    }

}

export default Sidebar;