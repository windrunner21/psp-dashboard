import styles from "../text-field/TextField.module.css";
import TextFieldProps from "./interface";
import React from "react";
import { applyIBANPattern, applyPhoneNumberPattern, isValidEmailAddress, isValidNameSurname, isValidTaxNumber, isValidWebsite } from "../../controllers/validators";

const TextField = (props: TextFieldProps) => {
    const [hasError, setHasError] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (props.autofocus) {
            inputRef.current?.focus();
        }
    }, [props.autofocus])

    function validate(target: EventTarget) {
        switch (props.validateAgainst) {
            case "name":
                setHasError(!isValidNameSurname(target))
                break;
            case "email":
                setHasError(!isValidEmailAddress(target))
                break;
            case "voen":
                setHasError(!isValidTaxNumber(target))
                break;
            case "website":
                setHasError(!isValidWebsite(target))
                break;
            default:
                break;
        }
    }

    function handlePattern(e: any) {
        if (props.pattern && props.validateAgainst == "iban") {
            e.target.value = applyIBANPattern(e.target.value, props.pattern)
        }

        if (props.setValue) { props.setValue(e.target.value) }
    };

    return (
        <div className={styles.grid}>
            <p className={`${styles.label} ${hasError ? styles.labelError : ''}`}>{hasError ? props.validatorLabel : props.label}</p>
            <input
                style={props.capitalized ? { textTransform: "capitalize" } : {}}
                ref={inputRef}
                className={`${styles.input} ${hasError ? styles.inputError : ''}`}
                placeholder={props.placeholder}
                type={props.type}
                onBlur={(e) => { validate(e.target); handlePattern(e) }}
                maxLength={props.max}
                pattern={props.pattern}
                defaultValue={props.value}
            />
        </div>
    )
}

export default TextField