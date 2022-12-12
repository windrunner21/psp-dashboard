import AlertType from "./AlertType";

interface AlertDialogProps {
  type: AlertType;
  delay: number;
  title?: string;
  description?: string;
  style: any;
  onClick: () => void;
}

export default AlertDialogProps;
