interface PhoneNumberFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  autofocus?: boolean;
  value?: string;
  setValue?: (params: any) => void;
  validateNumber: (params: any) => void;
}

export default PhoneNumberFieldProps;
