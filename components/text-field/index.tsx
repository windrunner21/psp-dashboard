import styles from "../text-field/TextField.module.css";
import TextFieldProps from "./interface";
import React from "react";
import { applyIBANPattern, isValidEmailAddress, isValidNameSurname, isValidTaxNumber, isValidWebsite } from "../../controllers/validators";

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
                props.validatorCallback!(isValidNameSurname(target))
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
        if (props.validateAgainst == "iban") {
            e.target.value = applyIBANPattern(e.target.value)
        }

        if (props.setValue) { props.setValue(e.target.value) }
    };

    return (
        <div className={styles.grid}>
            <p className={styles.label}>{props.label}</p>
            <input
                style={props.capitalized ? { textTransform: "capitalize" } : {}}
                ref={inputRef}
                className={`${styles.input} ${hasError ? styles.inputError : ''}`}
                placeholder={props.placeholder}
                type={props.type}
                onChange={(e) => handlePattern(e)}
                onBlur={(e) => validate(e.target)}
                maxLength={props.max}
                defaultValue={props.value}
            />
        </div>
    )
}

export default TextField