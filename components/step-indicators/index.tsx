import React from "react"
import styles from "../step-indicators/StepIndicators.module.css"
import CircleStep from "./circle"
import StepIndicatorsProps from "./interface"
import Step from "./step"

const StepIndicators = (props: StepIndicatorsProps) => {
    return (
        <div className={props.position == 'absolute' ? styles.gridAbsolute : styles.gridFixed}>
            {props.type == 'line' &&
                [...Array(props.totalSteps)].map((_, index) =>
                    <Step key={index} active={index == props.step} completed={index <= props.completedStep} progress={props.completedStep} index={index} />
                )
            }

            {props.type == 'circle' &&
                [...Array(props.totalSteps)].map((_, index) =>
                    <React.Fragment key={index}>
                        <CircleStep key={index} active={index <= props.step} index={index} />
                        {index < (props.totalSteps! - 1) && <div className={styles.line} />}
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default StepIndicators