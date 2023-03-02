import styles from "./Payments.module.css"
import PaymentProps from "./interface";
import NavigationBarInternal from "../../navigation-bar-internal";
import LoadingIndicatorPage from "../../loading-indicator-page";
import Table from "../../table";
import Empty from "../../empty";
import Search from "../../search";
import Button from "../../button";
import * as XLSX from 'xlsx';

const PaymentPage = (props: PaymentProps) => {

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(props.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, `${props.excelTitle}.xlsx`);
    };

    return (
        <div className={styles.main}>
            <NavigationBarInternal />
            <div className={styles.container}>
                <div className={styles.rowSpaceBetween}>
                    <span className={styles.title}>{props.title}</span>
                    <div className={styles.row}>
                        <Search placeholder="Search" />
                        <div style={{ width: "1rem" }} />
                        <Button
                            label="Export"
                            backgroundColor="var(--primary)"
                            color="white"
                            borderRadius="0.3rem"
                            padding="0.3rem 1rem"
                            icon="export"

                            onClick={downloadExcel}
                        />
                    </div>
                </div>
                <div style={{ height: "2rem" }} />
                {props.loadingData && <LoadingIndicatorPage />}
                {props.data ?
                    props.data.length == 0 ?
                        <Empty caption='You have not received any payments' />
                        :
                        <Table headers={props.tableHeaders} data={props.tableData} dimensions={props.tableDimensions} />
                    :
                    <Empty caption='Something went wrong' />
                }
            </div>
        </div>
    )
}

export default PaymentPage