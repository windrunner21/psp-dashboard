import styles from "../text-field/TextField.module.css";
import Validator from "../validator";
import TextFieldProps from "./interface";
import { applyIBANPattern, applyPhoneNumberPattern, isValidEmailAddress, isValidNameSurname, isValidTaxNumber, isValidWebsite } from "../../constants"
import React from "react";

const TextField = (props: TextFieldProps) => {

    // waiting before error
    let timer: NodeJS.Timeout;
    const waitTime = 500;

    const [hasError, setHasError] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (props.autofocus) {
            inputRef.current?.focus();
        }
    }, [])

    function validate(target: EventTarget) {
        clearTimeout(timer);

        if (props.validateAgainst == "name") {
            timer = setTimeout(() => {
                setHasError(!isValidNameSurname(target))
            }, waitTime);
        }

        if (props.validateAgainst == "email") {
            timer = setTimeout(() => {
                setHasError(!isValidEmailAddress(target))
            }, waitTime);
        }

        if (props.validateAgainst == "voen") {
            timer = setTimeout(() => {
                setHasError(!isValidTaxNumber(target))
            }, waitTime);
        }

        if (props.validateAgainst == "website") {
            timer = setTimeout(() => {
                setHasError(!isValidWebsite(target))
            }, waitTime);
        }
    }

    function handlePattern(e: any) {
        if (props.pattern && props.validateAgainst == "phoneNumber") {
            e.target.value = applyPhoneNumberPattern(e.target.value, props.pattern)
        }

        if (props.pattern && props.validateAgainst == "iban") {
            e.target.value = applyIBANPattern(e.target.value, props.pattern)
        }
    };

    return (
        <div className={styles.grid}>
            <p className={styles.label}>{props.label}</p>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder={props.placeholder}
                type={props.type}
                onKeyUp={(e) => validate(e.target)}
                onBlur={(e) => handlePattern(e)}
                maxLength={props.max}
                pattern={props.pattern}
            />
            {hasError && <div style={{ marginTop: "0.1rem" }}>
                <Validator label={props.validatorLabel} />
            </div>}
        </div>
    )
}

export default TextField