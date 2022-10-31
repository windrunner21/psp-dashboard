import styles from "../step-indicators/StepIndicators.module.css"
import StepIndicatorsProps from "./interface"
import Step from "./step"

const StepIndicators = (props: StepIndicatorsProps) => {


    return (
        <div className={styles.grid}>
            {
                [...Array(props.totalSteps)].map((_, index) =>
                    <Step key={index} active={index == props.step} />
                )
            }
        </div>
    )
}

export default StepIndicators