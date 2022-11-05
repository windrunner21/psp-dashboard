import styles from "../search/Search.module.css"
import SearchProps from "./interface";
import React from "react";

const Search = (props: SearchProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    function focusInput() {
        inputRef.current?.focus()
    }

    return (
        <div className={styles.search} onClick={focusInput}>
            <picture className={styles.logo}>
                <source srcSet="/mui-icons/search-dark.svg" media="(prefers-color-scheme: dark)" />
                <img src="/mui-icons/search.svg" alt="notifications material icon" width={24} height={24} />
            </picture>
            <input ref={inputRef} className={styles.input} placeholder={props.placeholder} />
        </div>
    )
}

export default Search