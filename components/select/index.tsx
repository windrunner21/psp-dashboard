import React from "react";
import styles from "../select/Select.module.css"
import SelectProps from "./interface";

const Select = (props: SelectProps) => {
    const [hasError, setHasError] = React.useState(false)

    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState(0);
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
                        <picture className={styles.logo}>
                            <source srcSet="/mui-icons/expand-less-dark.svg" media="(prefers-color-scheme: dark)" />
                            <img src="/mui-icons/expand-less.svg" alt="expand less material icon" width={20} height={20} />
                        </picture>
                        :
                        <picture className={styles.logo}>
                            <source srcSet="/mui-icons/expand-more-dark.svg" media="(prefers-color-scheme: dark)" />
                            <img src="/mui-icons/expand-more.svg" alt="expand less material icon" width={20} height={20} />
                        </picture>
                }
            </div>
            <div className={`${styles.options} ${isOptionsOpen ? styles.show : styles.hide}`}>
                <ul
                    className={styles.option}
                    tabIndex={-1}
                >
                    {optionsList.slice(1).map((option, index) => (
                        <p key={index} tabIndex={0} onClick={() => {
                            const selectedIndex = index + 1;
                            setSelectedOption(selectedIndex);
                            setIsOptionsOpen(false);
                        }}>
                            {option}
                        </p>
                    ))}
                </ul>
            </div>
            {hasError && <div style={{ marginTop: "0.1rem" }}>
                {/* <Validator label={props.validatorLabel} /> */}
            </div>}
        </div>
    )
}

export default Select