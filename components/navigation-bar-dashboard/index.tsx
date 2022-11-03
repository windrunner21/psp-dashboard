import styles from "../navigation-bar-dashboard/NavigationBar.module.css"
import LanguageSelect from "../language-select"
import Notifications from "../notifications"
import Search from "../search"

const NavigationBarDashboard = () => {
    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                <div className={styles.searchBar}>
                    <Search placeholder="Search merchant panel" />
                </div>
                <div className={styles.trailing}>
                    <LanguageSelect />
                    <Notifications unread={true} />
                </div>
            </div>
        </div>
    )
}

export default NavigationBarDashboard