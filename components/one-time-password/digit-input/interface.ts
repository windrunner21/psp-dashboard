interface DigitInputProps {
  value: string;
  repeating: number;
  onChange: (value: string) => void;
  displayError?: boolean;
  onPaste: (value: string) => void;
}

export default DigitInputProps;
