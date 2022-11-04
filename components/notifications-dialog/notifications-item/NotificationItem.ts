class NotificationItem {
  id: number;
  title: string;
  subtitle: string;
  unread?: boolean;

  constructor(id: number, title: string, subtitle: string, unread?: boolean) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.unread = unread;
  }

  setAsRead() {
    this.unread = false;
  }
}

export default NotificationItem;
