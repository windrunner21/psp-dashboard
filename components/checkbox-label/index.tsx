import React from "react";
import styles from "../checkbox-label/CheckboxWithLabel.module.css";
import CheckboxWithLabelProps from "./interface";

const CheckboxWithLabel = (props: CheckboxWithLabelProps) => {
    const [checked, setChecked] = React.useState(false)

    function toggleCheckbox() {
        setChecked(!checked)
        console.log(checked)
    }

    return (
        <div className={styles.grid}>
            <span onClick={toggleCheckbox} className={checked ? styles.unchecked : styles.checked}></span>
            <p className={styles.label}>{props.label}</p>
        </div >
    )
}

export default CheckboxWithLabel