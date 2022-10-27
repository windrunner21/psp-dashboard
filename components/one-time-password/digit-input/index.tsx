import React from "react";
import { RE_DIGIT } from "../../../constants";
import styles from "../digit-input/DigitInput.module.css"
import DigitInputProps from "./interface"

const DigitInput = (props: DigitInputProps) => {
    const valueItems = React.useMemo(() => {
        const valueArray = props.value.split('');
        const items: Array<string> = [];

        for (let i = 0; i < props.repeating; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [props.value, props.repeating]);

    const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue =
                props.value.substring(0, idx) + targetValue + props.value.substring(idx + 1);

            props.onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }

            const nextElementSibling =
                target.nextElementSibling as HTMLInputElement | null;

            if (nextElementSibling) {
                nextElementSibling.focus();
            }
        } else if (targetValueLength === props.repeating) {
            props.onChange(targetValue);

            target.blur();
            console.log("firing request")
        }
    };

    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if (e.key !== 'Backspace' || target.value !== '') {
            return;
        }

        const previousElementSibling =
            target.previousElementSibling as HTMLInputElement | null;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    return (
        <div className={styles.grid}>
            {valueItems.map((digit, index) =>
                <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={props.repeating}
                    value={digit}
                    className={styles.digit}
                    onChange={(e) => inputOnChange(e, index)}
                    onKeyDown={inputOnKeyDown}
                />
            )}
        </div>
    )
}

export default DigitInput