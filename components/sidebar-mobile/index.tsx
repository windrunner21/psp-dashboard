import styles from "../sidebar-mobile/Sidebar.module.css"
import { useRouter } from "next/router"

const SidebarMobile = () => {
    const router = useRouter()
    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <picture className={styles.logo} onClick={() => router.push("/")}>
                    <source srcSet="/mui-icons/sidebar-mobile-dark.svg" media="(prefers-color-scheme: dark)" />
                    <img src="/mui-icons/sidebar-mobile.svg" alt="sidebar mobile material icon" width={24} height={24} />
                </picture>
            </div>
        </div>
    )
}

export default SidebarMobile