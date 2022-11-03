import styles from "../search/Search.module.css"
import Image from "next/image"
import SearchProps from "./interface";
import React from "react";

const Search = (props: SearchProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    function focusInput() {
        inputRef.current?.focus()
    }

    return (
        <div className={styles.search} onClick={focusInput}>
            <Image src="/mui-icons/search.svg" alt="notifications material icon" width={24} height={24} />
            <input ref={inputRef} className={styles.input} placeholder={props.placeholder} />
        </div>
    )
}

export default Search