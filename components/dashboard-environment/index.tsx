import styles from "../dashboard-environment/DashboardEnvironment.module.css"

const DashboardEnvironment = () => {
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <span>Testing</span>
            </div>
            <div className={styles.right}>
                <picture className={styles.logo}>
                    <source srcSet={`/mui-icons/lock-dark.svg`} media="(prefers-color-scheme: dark)" />
                    <img src={`/mui-icons/lock.svg`} alt="respective material icon for the sidebar item" width={17} height={17} />
                </picture>
                <span>Production</span>
                <span className={styles.tooltiptext}>To pass into the production mode, you need to be onboarded first.</span>
            </div>
        </div>
    )
}

export default DashboardEnvironment