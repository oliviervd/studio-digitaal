import  {useEffect ,useState} from "preact/hooks"

const ThemeToggle = (props) => {

    const [theme, setTheme] = useState(props.theme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme==="light" ? "dark" : "light");
    }

    return(
        <div className={"toggle-switch-container"}>
            <p>CONTRAST</p>
            <div className={"toggle-switch"}>
                <label>
                    <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme}/>
                    <span className={"slider"}></span>
                </label>
                {/*<div className={"design-switch-circle"} onClick={toggleTheme}></div>*/}
            </div>
        </div>


    )
}

export default ThemeToggle