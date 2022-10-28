interface PrimaryButtonProps {
    title?: string;
    loading?: boolean;
    onClick?: (params: any) => any;
    logMessage?: (message: string) => void;
}

export default PrimaryButtonProps