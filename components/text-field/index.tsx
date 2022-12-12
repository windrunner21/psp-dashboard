import styles from "../text-field/TextField.module.css";
import TextFieldProps from "./interface";
import React from "react";
import { applyIBANPattern, applyPostalCodePattern, isValidAddress, isValidBusinessName, isValidCity, isValidEmailAddress, isValidIBAN, isValidNameSurname, isValidPostalCode, isValidTaxNumber, isValidWebsite } from "../../controllers/validators";

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
                props.validatorCallback!(isValidEmailAddress(target))
                break;
            case "businessName":
                setHasError(!isValidBusinessName(target))
                props.validatorCallback!(isValidBusinessName(target))
                break;
            case "taxNumber":
                setHasError(!isValidTaxNumber(target))
                props.validatorCallback!(isValidTaxNumber(target))
                break;
            case "IBAN":
                setHasError(!isValidIBAN(target))
                props.validatorCallback!(isValidIBAN(target))
                break;
            case "address":
                setHasError(!isValidAddress(target))
                props.validatorCallback!(isValidAddress(target))
                break;
            case "city":
                setHasError(!isValidCity(target))
                props.validatorCallback!(isValidCity(target))
                break;
            case "postalCode":
                setHasError(!isValidPostalCode(target))
                props.validatorCallback!(isValidPostalCode(target))
                break;
            case "website":
                setHasError(!isValidWebsite(target))
                props.validatorCallback!(isValidWebsite(target))
                break;
            default:
                break;
        }
    }

    function handlePattern(e: any) {
        if (props.validateAgainst == "IBAN") {
            e.target.value = applyIBANPattern(e.target.value)
        }

        if (props.validateAgainst == "postalCode") {
            e.target.value = applyPostalCodePattern(e.target.value)
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