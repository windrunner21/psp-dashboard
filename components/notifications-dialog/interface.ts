import NotificationItem from "./notifications-item/NotificationItem";

interface NotificationsDialogProps {
  notifications: NotificationItem[];
  onClick: (params: any) => void;
  updateNotifications: (params: any) => void;
}

export default NotificationsDialogProps;
