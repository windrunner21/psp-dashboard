import styles from "../sidebar/Sidebar.module.css"
import OderoLogo from "../logo";
import SidebarProps from "./interface";
import Image from "next/image";
import OderoLogoSmall from "../logo-small";

const Sidebar = (props: SidebarProps) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    {props.collapsed ? <OderoLogoSmall /> : <OderoLogo />}
                </div>
            </div>
            <div className={styles.swapper} onClick={() => props.collapse(!props.collapsed)}>
                <Image src={`/mui-icons/chevron-${props.collapsed ? 'right' : 'left'}-700.svg`} alt="chevron right material icon" width={20} height={20} />
            </div>
        </div>
    )
}

export default Sidebar