import styles from "../primary-button/PrimaryButton.module.css"
import PrimaryButtonProps from "./interface"

const PrimaryButton = (props: PrimaryButtonProps) => {
    return (
        <button className={styles.button}>{props.title}</button>
    )
}

export default PrimaryButton