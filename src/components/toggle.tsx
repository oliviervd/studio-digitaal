import {useEffect, useState} from "preact/hooks";

const Toggle = ({label, onChange}) => {
    //generic toggle that returns boolean value

    const [isChecked, setIsChecked] = useState(false);
    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onChange(newCheckedState)
    }

    return(
        <div className={"toggle-switch-container"} onClick={handleToggle}>
            <p>{label}</p>
            <div className={"toggle-switch"}>
                <label>
                    <input type="checkbox"/>
                    <span className={"slider"}></span>
                </label>
            </div>
        </div>
    )
}

export default Toggle;
