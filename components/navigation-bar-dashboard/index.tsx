import styles from "../navigation-bar-dashboard/NavigationBar.module.css"
import LanguageSelect from "../language-select"
import Notifications from "../notifications"
import Search from "../search"
import NavigationBarDashboardProps from "./interface"
import React from "react"
import DashboardEnvironment from "../dashboard-environment"

const NavigationBarDashboard = (props: NavigationBarDashboardProps) => {
    const [unread, setUnread] = React.useState(true)

    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                <div className={styles.searchBar}>
                    <Search placeholder="Search merchant panel" />
                </div>
                <div className={styles.trailing}>
                    <DashboardEnvironment />
                    <div style={{ marginBottom: "-0.15rem" }}>
                        <LanguageSelect />
                    </div>
                    <Notifications unread={unread} onClick={() => {
                        setUnread(false)
                        props.onNotificationsClick(true)
                    }} />
                </div>
            </div>
        </div>
    )
}

export default NavigationBarDashboard