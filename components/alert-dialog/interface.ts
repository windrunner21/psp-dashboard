import AlertType from "./AlertType";

interface AlertDialogProps {
  type?: AlertType;
  title?: string;
  description?: string;
  onClick: (params: any) => void;
}

export default AlertDialogProps;
