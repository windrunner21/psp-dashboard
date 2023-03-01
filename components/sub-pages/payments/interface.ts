interface PaymentProps {
  title: string;
  tableHeaders: string[];
  tableData: { data: any; href?: any }[];
  data: any[];
  loadingData: boolean;
}

export default PaymentProps;
