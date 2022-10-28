import styles from "../close-button/CloseButton.module.css"
import CloseButtonProps from "./interface"

const CloseButton = (props: CloseButtonProps) => {
    return (
        <span className={`${styles.close} ${props.shouldBeBlack && styles.black}`} onClick={props.onClick}>&#x2715;</span>
    )
}

export default CloseButton