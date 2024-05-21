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
        <div className={"theme-switch-container"}>
            <p>switch theme</p>
            <div className={"design-switch"}>
                <div className={"design-switch-circle"} onClick={toggleTheme}></div>
            </div>
        </div>

    )
}

export default ThemeToggle