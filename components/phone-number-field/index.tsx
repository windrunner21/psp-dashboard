import styles from "../phone-number-field/PhoneNumberField.module.css";
import TextFieldProps from "./interface";
import React from "react";
import { applyPhoneNumberPattern } from "../../controllers/validators";

const PhoneNumberField = (props: TextFieldProps) => {
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

    return (
        <div className={styles.grid}>
            <p className={styles.label}>{props.label}</p>
            <div className={styles.row}>
                <div className={styles.prefix}>
                    <span className={styles.countryCode}>+994</span>
                </div>
                <input
                    ref={inputRef}
                    className={styles.input}
                    placeholder={props.placeholder}
                    type={props.type}
                    onChange={(e) => handlePattern(e)}
                    defaultValue={props.value}
                    maxLength={12}
                />
            </div>
        </div>
    )
}

export default PhoneNumberField