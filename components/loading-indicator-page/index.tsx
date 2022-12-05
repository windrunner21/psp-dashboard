import styles from "../loading-indicator-page/LoadingIndicatorPage.module.css"

const LoadingIndicatorPage = () => {
    return (
        <div className={styles.container}>
            <span className={styles.loader}></span>
        </div>
    )
}

export default LoadingIndicatorPage