import AlertType from "./AlertType";

interface AlertDialogProps {
  type?: AlertType;
  delay?: number;
  title?: string;
  description?: string;
  onClick: () => void;
}

export default AlertDialogProps;
