import styles from "../text-field/TextField.module.css";
import TextFieldProps from "./interface";

const TextField = (props: TextFieldProps) => {
    return (
        <>
            <p className={styles.label}>{props.label}</p>
            <input className={styles.input} placeholder={props.placeholder} type={props.type} />
        </>
    )
}

export default TextField