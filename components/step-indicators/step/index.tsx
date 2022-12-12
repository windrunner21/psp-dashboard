import styles from "../step/Step.module.css"
import StepProps from "./interface"

const Step = (props: StepProps) => {
    return (
        <div className={styles.column}>
            {props.index == props.progress && <span className={styles.progress}>{props.progress * 20}%</span>}
            <div style={{ height: "0.5rem" }} />
            <div className={`${styles.step} ${props.active ? styles.active : props.completed ? styles.completed : styles.inactive}`} />
        </div>
    )
}

export default Step