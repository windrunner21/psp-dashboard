import React from "react";
import styles from "../upload-field/UploadField.module.css"
import Validator from "../validator";
import UploadProps from "./interface";
import { useTranslation } from 'next-i18next';

const UploadField = (props: UploadProps) => {
    const { t } = useTranslation('common');
    const empty = t('nothingUploaded')
    const removed = t('uploadRemoved')
    const [hasError, setHasError] = React.useState(false)
    const [fileName, setFileName] = React.useState(empty)

    const spanRef = React.useRef<HTMLSpanElement>(null);
    const labelRef = React.useRef<HTMLLabelElement>(null);

    function getFileName(e: any) {
        console.log(e.target.files)
        if (e.target.files[0] != undefined) {
            const fileUploaded = e.target.files[0].name;
            setFileName(fileUploaded)
        } else {
            setFileName(removed)
            setHasError(true)
        }
    }

    return (
        <div className={styles.grid}>
            <p className={styles.label}>{props.label}</p>
            <input type="file" id={props.id} hidden onChange={(e) => getFileName(e)} />
            <div className={styles.input}>
                <span className={styles.document} ref={spanRef}>{fileName}</span>
                <label className={styles.upload} htmlFor={props.id} ref={labelRef}>{t('upload')}</label>
            </div>
            {hasError && <div style={{ marginTop: "0.1rem" }}>
                <Validator label={props.validatorLabel} />
            </div>}
        </div>
    )
}

export default UploadField