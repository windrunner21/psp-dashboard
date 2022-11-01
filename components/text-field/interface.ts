interface TextFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  validatorLabel?: string;
  autofocus?: boolean;
  validateAgainst?: string;
  pattern?: string;
  max?: number;
  capitalized?: boolean;
}

export default TextFieldProps;
