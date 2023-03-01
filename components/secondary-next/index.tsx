import styles from "../secondary-next/SecondaryNext.module.css"
import SecondaryNextProps from "./interface";
import { useTranslation } from 'next-i18next';

const SecondaryNext = (props: SecondaryNextProps) => {
    const { t } = useTranslation('common');
    return (
        <span className={styles.button} onClick={props.onClick}>Next &#8594;</span>
    )
}

export default SecondaryNext