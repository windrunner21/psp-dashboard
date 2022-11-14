import styles from "../comparison/Comparison.module.css"

const Comparison = () => {
    return (
        <div className={styles.grid}>
            <div className={styles.column}>
                <span className={styles.title}>Income</span>
                <span className={styles.subtitle}>29</span>
            </div>
            <div className={styles.verticalLine} />
            <div className={styles.column}>
                <span className={styles.title}>Transactions</span>
                <span className={styles.subtitle}>1</span>
            </div>
        </div>
    )
}

export default Comparison