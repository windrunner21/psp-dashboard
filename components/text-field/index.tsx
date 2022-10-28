import styles from "../text-field/TextField.module.css";
import Validator from "../validator";
import TextFieldProps from "./interface";
import { isValidEmailAddress } from "../../constants"
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

        timer = setTimeout(() => {
            setHasError(!isValidEmailAddress(target))
        }, waitTime);
    }

    return (
        <>
            <p className={styles.label}>{props.label}</p>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder={props.placeholder}
                type={props.type}
                onKeyUp={(e) => validate(e.target)}
            />
            {hasError && <div style={{ marginTop: "0.1rem" }}>
                <Validator label={props.validatorLabel} />
            </div>}
        </>
    )
}

export default TextField