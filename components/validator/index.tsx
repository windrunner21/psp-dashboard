import styles from "../validator/Validator.module.css"
import ValidatorProps from "./interface";

const Validator = (props: ValidatorProps) => {
    return (
        <span className={styles.label}>{props.label}</span>
    )
}

export default Validator