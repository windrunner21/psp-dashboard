interface OneTimePasswordProps {
  name?: string;
  surname?: string;
  phoneNumber: string;
  onClick?: (params: any) => void;
  setAlertTitle: (params: any) => void;
  setAlertDescription: (params: any) => void;
  setAlertType: (params: any) => void;
  showAlert: (params: any) => void;
}

export default OneTimePasswordProps;
