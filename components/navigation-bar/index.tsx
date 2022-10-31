import styles from "../navigation-bar/NavigationBar.module.css"
import LanguageSelect from "../language-select"
import OderoLogo from "../logo"

const NavigationBar = () => {
    return (
        <div className={styles.grid}>
            <OderoLogo />
            <div className={styles.options}>
                <span className={styles.name}>Imran Hajiyev</span>
                <LanguageSelect />
            </div>
        </div>
    )
}

export default NavigationBar