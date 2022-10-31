import React from "react";
import styles from "../select/Select.module.css"
import Validator from "../validator";
import SelectProps from "./interface";

const Select = (props: SelectProps) => {
    const [hasError, setHasError] = React.useState(false)

    return (
        <div className={styles.grid}>
            <p className={styles.label}>{props.label}</p>
            <div className={styles.input}>
                <span className={styles.option}>Choose an option</span>
                <span>&#9207;</span>
            </div>
            <div className={styles.dropdownContent}>
                <p className={styles.dropdownItem}>Option #1</p>
                <p className={styles.dropdownItem}>Option #2</p>
            </div>
            {hasError && <div style={{ marginTop: "0.1rem" }}>
                <Validator label={props.validatorLabel} />
            </div>}
        </div>
    )
}

export default Select