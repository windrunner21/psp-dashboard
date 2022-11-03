import styles from "../navigation-bar-dashboard/NavigationBar.module.css"
import OderoLogo from "../logo"
import LanguageSelect from "../language-select"
import Notifications from "../notifications"

const NavigationBarDashboard = () => {
    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                <OderoLogo />
                <div className={styles.options}>
                    <LanguageSelect />
                    <Notifications />
                </div>
            </div>
        </div>
    )
}

export default NavigationBarDashboard