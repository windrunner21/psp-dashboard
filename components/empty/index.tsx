import styles from "../empty/Empty.module.css"
import EmptyProps from "./interface"

const Empty = (props: EmptyProps) => {
    return (
        <div className={styles.container}>
            <span className={styles.title}>Oh no...</span>
            <span className={styles.caption}>{props.caption}</span>
        </div>
    )
}

export default Empty