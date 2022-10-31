import styles from "../onboard-choice/OnboardChoice.module.css"
import Image from 'next/image'
import OnboardChoiceProps from "./interface";

const OnboardChoice = (props: OnboardChoiceProps) => {
    return (
        <div className={styles.grid} onClick={props.onClick}>
            <div className={styles.leading}>
                <Image src={`/icons/${props.image}.png`} alt="Onboard Choice Logo" width={35} height={35} />
                <span className={styles.label}>{props.title}</span>
            </div>
            <span>&#9205;</span>
        </div>
    )
}

export default OnboardChoice