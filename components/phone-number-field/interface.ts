interface TextFieldProps {
  label?: string;
  placeholder?: string;
  type?: string;
  autofocus?: boolean;
  value?: string;
  setValue?: (params: any) => void;
}

export default TextFieldProps;
