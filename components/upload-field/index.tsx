import React from "react";
import styles from "../upload-field/UploadField.module.css"
import Validator from "../validator";
import UploadProps from "./interface";

const UploadField = (props: UploadProps) => {
    const [hasError, setHasError] = React.useState(false)
    const [fileName, setFileName] = React.useState("Nothing uploaded")

    const spanRef = React.useRef<HTMLSpanElement>(null);
    const labelRef = React.useRef<HTMLLabelElement>(null);

    function getFileName(e: any) {
        const fileUploaded = e.target.files[0].name;
        setFileName(fileUploaded)
    }

    return (
        <div className={styles.grid}>
            <p className={styles.label}>{props.label}</p>
            <input type="file" id="actual-button" hidden onChange={(e) => getFileName(e)} />
            <div className={styles.input}>
                <span className={styles.document} ref={spanRef}>{fileName}</span>
                <label className={styles.upload} htmlFor="actual-button" ref={labelRef}>Upload</label>
            </div>
            {hasError && <div style={{ marginTop: "0.1rem" }}>
                <Validator label={props.validatorLabel} />
            </div>}
        </div>
    )
}

export default UploadField