import styles from "../step/Step.module.css"
import StepProps from "./interface"

const Step = (props: StepProps) => {
    return (
        <div className={`${styles.step} ${props.active ? styles.active : styles.inactive}`} />
    )
}

export default Step