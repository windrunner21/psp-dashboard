import styles from './Status.module.css'
import StatusProps from "./interface";

const Status = (props: StatusProps) => {
    return (
        <div className={`${styles.container} ${props.style}`}>{props.label}</div>
    )
}

export default Status