import styles from "../phone-number-field/PhoneNumberField.module.css";
import PhoneNumberFieldProps from "./interface";
import React from "react";
import { applyPhoneNumberPattern } from "../../controllers/validators";
import Image from "next/image";

const PhoneNumberField = (props: PhoneNumberFieldProps) => {
    const [hasError, setHasError] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (props.autofocus) {
            inputRef.current?.focus();
        }
    }, [props.autofocus])

    function handlePattern(e: any) {
        e.target.value = applyPhoneNumberPattern(e.target.value)

        if (props.setValue) { props.setValue(e.target.value) }
    };

    function validate(e: any) {
        setHasError(e.target.value.length != 12)
        props.validateNumber(e.target.value.length == 12)
    }

    return (
        <div className={styles.grid}>
            <p className={styles.label}>{props.label}</p>
            <div className={styles.row}>
                <div className={styles.prefix}>
                    <Image src="/flags/az.svg" alt="country code" width={18} height={18} />
                    <span className={styles.countryCode}>+994</span>
                </div>
                <div style={{ width: "0.5rem" }} />
                <input
                    ref={inputRef}
                    className={`${styles.input} ${hasError ? styles.inputError : ''}`}
                    placeholder={props.placeholder}
                    type={props.type}
                    onChange={(e) => handlePattern(e)}
                    onBlur={(e) => validate(e)}
                    defaultValue={props.value}
                    maxLength={12}
                />
            </div>
        </div>
    )
}

export default PhoneNumberField