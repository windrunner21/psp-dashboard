import React from "react";
import styles from "../upload-field/UploadField.module.css"
import UploadProps from "./interface";
import { useTranslation } from 'next-i18next';
import Image from "next/image";

const UploadField = (props: UploadProps) => {
    const { t } = useTranslation('common');
    const empty = t('nothingUploaded')
    const [fileName, setFileName] = React.useState(empty)

    const inputRef = React.useRef<HTMLInputElement>(null);

    function getFileName(e: any) {

        console.log(e.target.files)
        if (e.target.files[0] != undefined) {
            const fileUploaded = e.target.files[0];
            setFileName(fileUploaded.name)

            let reader = new FileReader();
            reader.readAsDataURL(fileUploaded);
            reader.onload = () => {
                props.setValue(reader.result)
                props.validatorCallback!(true)
            };
        } else {
            setFileName(empty)
            props.setValue("")
            props.validatorCallback!(false)
        }
    }

    function removeFile() {
        if (inputRef.current) {
            inputRef.current.value = ""
            setFileName(empty)
            props.setValue("")
            props.validatorCallback!(false)
        }
    }

    return (
        <div className={styles.grid}>
            <p className={styles.label}>{props.label}</p>
            <input ref={inputRef} type="file" accept="application/pdf" id={props.id} hidden onChange={(e) => getFileName(e)} defaultValue={props.value} />
            <div className={styles.row}>
                <div className={styles.input}>
                    <span className={styles.document}>{fileName}</span>
                    <label className={`${styles.upload} ${props.value != "" && styles.change}`} htmlFor={props.id}>{props.value == "" ? t('upload') : "Change"}</label>
                </div>
                {
                    props.value && <span className={styles.remove} onClick={removeFile}>
                        <Image src="/mui-icons/delete.svg" alt="delete" width={17} height={17} />
                    </span>
                }
            </div>
        </div>
    )
}

export default UploadField