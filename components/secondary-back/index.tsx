import styles from "../secondary-back/SecondaryBack.module.css"
import SecondaryBackProps from "./interface";

const SecondaryBack = (props: SecondaryBackProps) => {
    return (
        <span className={styles.button} onClick={props.onClick}>&#8592; Back</span>
    )
}

export default SecondaryBack