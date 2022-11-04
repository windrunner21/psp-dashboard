import styles from "../notifications/Notifications.module.css"
import Image from "next/image"
import NotificationsProps from "./interface"

const Notifications = (props: NotificationsProps) => {
    return (
        <div className={styles.container} onClick={props.onClick}>
            <div className={styles.notification}>
                {props.unread && <div className={styles.dot} />}
                <Image src="/mui-icons/notifications.svg" alt="notifications material icon" width={24} height={24} />
            </div>
        </div>
    )
}

export default Notifications