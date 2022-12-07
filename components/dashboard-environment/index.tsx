import React from "react"
import styles from "../dashboard-environment/DashboardEnvironment.module.css"
import PrimaryLink from "../primary-link"

const DashboardEnvironment = () => {
    const [tooltipShown, showTooltip] = React.useState(false)
    return (
        <div className={styles.main}>

            <span className={styles.text}>Testing</span>

            <label className={styles.switch} onMouseEnter={() => showTooltip(true)}>
                <input type="checkbox" disabled />
                <span className={styles.slider}></span>
                <span className={`${styles.tooltip} ${tooltipShown && styles.show}`} onMouseLeave={() => showTooltip(false)}>
                    Please <PrimaryLink href="/onboard" label="activate your account" /> to accept live payments
                </span>
            </label>
            <span className={styles.text}>Live</span>
        </div>
    )
}

export default DashboardEnvironment