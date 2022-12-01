interface TextFieldProps {
  label?: string;
  placeholder?: string;
  capitalized?: boolean;
  type?: string;
  autofocus?: boolean;
  validatorLabel?: string;
  validateAgainst?: string;
  pattern?: string;
  max?: number;
  value?: string;
  validatorCallback?: (params: any) => void;
  setValue?: (params: any) => void;
}

export default TextFieldProps;
