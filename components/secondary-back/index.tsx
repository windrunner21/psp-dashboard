import styles from "../secondary-back/SecondaryBack.module.css"
import SecondaryBackProps from "./interface";
import { useTranslation } from 'next-i18next';

const SecondaryBack = (props: SecondaryBackProps) => {
    const { t } = useTranslation('common');
    return (
        <span className={styles.button} onClick={props.onClick}>&#8592; Previous</span>
    )
}

export default SecondaryBack