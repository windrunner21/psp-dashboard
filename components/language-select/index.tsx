import styles from "../language-select/LanguageSelect.module.css"

const LanguageSelect = () => {
    return (
        <div className={styles.dropdown}>
            <span>English &#9207;</span>
            <div className={styles.dropdownContent}>
                <p className={styles.dropdownItem}>Azerbaijani</p>
                <p className={styles.dropdownItem}>Russian</p>
            </div>
        </div>
    )
}

export default LanguageSelect