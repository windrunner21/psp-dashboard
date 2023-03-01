import styles from "../search/Search.module.css"
import SearchProps from "./interface";
import React from "react";
import Image from "next/image";

const Search = (props: SearchProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    function focusInput() {
        inputRef.current?.focus()
    }

    return (
        <div className={styles.search} onClick={focusInput}>
            <Image src="/mui-icons/search.svg" alt="search material icon" width={20} height={20} />
            <input ref={inputRef} className={styles.input} placeholder={props.placeholder} />
        </div>
    )
}

export default Search