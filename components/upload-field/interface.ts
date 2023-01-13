interface UploadProps {
  id: string;
  label?: string;
  validatorLabel?: string;
  value?: string;
  setValue: (params: any) => void;
  validatorCallback?: (params: any) => void;
}

export default UploadProps;
