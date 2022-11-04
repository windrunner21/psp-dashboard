import styles from "../notifications-item/NotificationsItem.module.css"
import NotificationsItemProps from "./interface"

const NotificationsItem = (props: NotificationsItemProps) => {
    return (
        <div className={styles.grid} onClick={props.onClick}>
            <div className={styles.leading}>
                <span className={styles.title}>{props.title}</span>
                <span className={styles.subtitle}>{props.subtitle}</span>
            </div>


            <div className={styles.trailing}>
                {props.unread && <div className={styles.dot} />}
            </div>

        </div>
    )
}

export default NotificationsItem