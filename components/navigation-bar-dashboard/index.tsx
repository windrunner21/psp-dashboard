import styles from "../navigation-bar-dashboard/NavigationBar.module.css"
import OderoLogo from "../logo"
import LanguageSelect from "../language-select"
import Notifications from "../notifications"
import Search from "../search"

const NavigationBarDashboard = () => {
    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                <Search placeholder="Search for categories" />
                <div className={styles.trailing}>
                    <LanguageSelect />
                    <Notifications unread={true} />
                </div>
            </div>
        </div>
    )
}

export default NavigationBarDashboard