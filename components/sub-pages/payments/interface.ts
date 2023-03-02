interface PaymentProps {
  title: string;
  tableHeaders: string[];
  tableData: { data: any; href?: any }[];
  tableDimensions: string[];
  data: any[];
  loadingData: boolean;
}

export default PaymentProps;
