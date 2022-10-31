import styles from "../secondary-next/SecondaryNext.module.css"
import SecondaryNextProps from "./interface";

const SecondaryNext = (props: SecondaryNextProps) => {
    return (
        <span className={styles.button} onClick={props.onClick}>Next &#8594;</span>
    )
}

export default SecondaryNext