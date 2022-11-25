import styles from "../validator/Validator.module.css"
import ValidatorProps from "./interface";

const Validator = (props: ValidatorProps) => {
    return (
        <div className={styles.container}>
            <span className={styles.label}>{props.label}</span>
        </div>
    )
}

export default Validator