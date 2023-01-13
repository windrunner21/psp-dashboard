import styles from "../circle/CircleStep.module.css"
import CircleStepProps from "./interface"

const CircleStep = (props: CircleStepProps) => {
    return (
        <div className={styles.column}>
            <div className={`${styles.step} ${props.active ? styles.active : styles.inactive}`} />
        </div>
    )
}

export default CircleStep