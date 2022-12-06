import styles from "../dashboard-environment/DashboardEnvironment.module.css"

const DashboardEnvironment = () => {
    return (
        <div className={styles.main}>

            <span className={styles.text}>Testing</span>

            <label className={styles.switch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
                <span className={styles.tooltiptext}>To pass into the production mode, you need to be onboarded first.</span>
            </label>
            <span className={styles.text}>Production</span>
        </div>
    )
}

export default DashboardEnvironment