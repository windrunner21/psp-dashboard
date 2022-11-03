import styles from "../navigation-bar-onboard/NavigationBar.module.css"
import LanguageSelect from "../language-select"
import OderoLogo from "../logo"
import NavigationBarProps from "./interface"

const NavigationBarOnboard = (props: NavigationBarProps) => {
    return (
        <div className={styles.grid}>
            <OderoLogo />
            <div className={styles.options}>
                <span className={styles.name}>{props.user}</span>
                <LanguageSelect />
            </div>
        </div>
    )
}

export default NavigationBarOnboard