import Image from "next/image";
import CloseButton from "../close-button";
import styles from "../notifications-dialog/NotificationsDialog.module.css"
import NotificationsDialogProps from "./interface";
import NotificationsItem from "./notifications-item";

const NotificationsDialog = (props: NotificationsDialogProps) => {

    function markNotificationAsRead(id: number, read: boolean) {
        props.updateNotifications(props.notifications.map(notification => {
            if (notification.id === id) {
                return { ...notification, unread: !read };
            } else {
                return notification;
            }
        }));
    }

    function markAllNotificationsAsRead() {
        props.updateNotifications(props.notifications.map(notification => {
            return { ...notification, unread: false };
        }));
    }

    return (
        <div className={styles.grid}>
            <div className={styles.contents}>
                <div className={styles.header}>
                    <span className={styles.title}>Notifications</span>
                    <div className={styles.headerTrailing}>
                        <div className={styles.headerTrailing}>
                            <Image src="/mui-icons/double-check.svg" alt="mark as read material icon" width={18} height={18} />
                            <span className={styles.callToAction} onClick={markAllNotificationsAsRead}>Mark all as read</span>
                        </div>
                        <div style={{ marginLeft: "1rem" }}>
                            <CloseButton onClick={() => props.onClick(false)} />
                        </div>
                    </div>
                </div>
                <div className={styles.list}>
                    {

                        props.notifications.map((notification, index) => (
                            <NotificationsItem
                                key={index}
                                title={notification.title}
                                subtitle={notification.subtitle}
                                unread={notification.unread}
                                onClick={() => markNotificationAsRead(notification.id, true)} />
                        ))

                    }
                </div>
            </div>
        </div >
    )
}

export default NotificationsDialog