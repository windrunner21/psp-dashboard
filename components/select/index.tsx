import React from "react";
import styles from "../select/Select.module.css"
import Image from "next/image";
import SelectProps from "./interface";

// custom components
import Validator from "../validator";

const Select = (props: SelectProps) => {
    const [hasError, setHasError] = React.useState(false)

    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState(-1);
    const optionsList = props.optionsList

    function toggleOptions() {
        setIsOptionsOpen(!isOptionsOpen);
    };

    return (
        <div className={styles.grid}>
            <p className={styles.label}>{props.label}</p>
            <div className={`${styles.input} ${isOptionsOpen ? styles.inputFocused : styles.input}`} onClick={toggleOptions}>
                <span className={styles.option}>{props.optionsList[selectedOption]}</span>
                {
                    isOptionsOpen ?
                        <Image src="/mui-icons/expand-less.svg" alt="expand less mui icon" width={20} height={20} /> :
                        <Image src="/mui-icons/expand-more.svg" alt="expand more mui icon" width={20} height={20} />
                }
            </div>
            <div className={`${styles.options} ${isOptionsOpen ? styles.show : styles.hide}`}>
                <ul
                    className={styles.option}
                    tabIndex={-1}
                >
                    {optionsList.map((option, index) => (
                        <p key={index} tabIndex={0} onClick={() => {
                            setSelectedOption(index);
                            setIsOptionsOpen(false);
                            if (props.onClick) {
                                props.onClick(index)
                            }
                        }}>
                            {option}
                        </p>
                    ))}
                </ul>
            </div>
            {hasError && <div style={{ marginTop: "0.1rem" }}>
                <Validator label={props.validatorLabel} />
            </div>}
        </div>
    )
}

export default Select