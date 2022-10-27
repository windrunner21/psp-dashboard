import styles from "../primary-button/PrimaryButton.module.css"
import PrimaryButtonProps from "./interface"

const PrimaryButton = (props: PrimaryButtonProps) => {

    props.logMessage

    return (
        <button className={styles.button} onClick={props.onClick}>{props.title}</button>
    )
}

export default PrimaryButton