import React from "react";
import styles from "../select/Select.module.css"
import SelectProps from "./interface";

const Select = (props: SelectProps) => {
    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState(props.value ?? 0);
    const optionsList = props.optionsList

    // close on outside click
    const ref = React.useRef(null)
    useOnClickOutside(ref, () => setIsOptionsOpen(false));

    function toggleOptions() {
        setIsOptionsOpen(!isOptionsOpen);
    };

    return (
        <div className={styles.grid} ref={ref}>
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
                    {
                        optionsList.slice(1).map((option, index) => (
                            <p
                                className={
                                    `${selectedOption === (index + 1) && styles.hovered}`
                                }
                                key={index}
                                tabIndex={0}
                                onClick={() => {
                                    const selectedIndex = index + 1;
                                    setSelectedOption(selectedIndex);
                                    props.setValue(selectedIndex)
                                    setIsOptionsOpen(false);
                                }}
                            >
                                {option}
                            </p>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

function useOnClickOutside(ref: any, handler: (event: any) => void) {
    React.useEffect(
        () => {
            const listener = (event: Event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}

export default Select