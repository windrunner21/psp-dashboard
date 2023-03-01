import styles from "../sidebar-mobile/Sidebar.module.css"
import SidebarItem from "../sidebar/sidebar-item"
import React from "react"

const SidebarMobile = () => {
    const [collapsed, setCollapsed] = React.useState(true)
    const [optionsCollapsed, collapseOptions] = React.useState(false)

    return (
        <>
            {
                collapsed &&
                <div className={styles.header} onClick={() => setCollapsed(!collapsed)}>
                    <picture className={styles.logo} onClick={() => console.log("clicked")}>
                        <source srcSet="/mui-icons/menu-dark.svg" media="(prefers-color-scheme: dark)" />
                        <img src="/mui-icons/menu.svg" alt="sidebar mobile material icon" width={24} height={24} />
                    </picture>
                </div>
            }

            {
                !collapsed &&
                <div className={styles.sidebar}>
                    <div className={styles.header} onClick={() => setCollapsed(!collapsed)}>
                        <picture className={styles.logo} onClick={() => console.log("clicked")}>
                            <source srcSet="/mui-icons/menu-dark.svg" media="(prefers-color-scheme: dark)" />
                            <img src="/mui-icons/menu.svg" alt="sidebar mobile material icon" width={24} height={24} />
                        </picture>
                    </div>
                    <div className={styles.content} >
                        <SidebarItem title="Dashboard" icon="dashboard" important={true} />
                        <SidebarItem title="Payments" icon="payments" important={true} href="/test/payment/payments" />
                        <SidebarItem title="Balances" icon="balances" important={true} href="/test/balances" />
                        <SidebarItem title="Reports" icon="reports" important={true} href="/test/reports" />
                        <hr className={styles.divider} />
                        <SidebarItem title="Pay by Link" icon="link" important={true} href="/test/more/pay-by-link" />
                        <SidebarItem title="Wallet" icon="wallet" important={true} href="/test/more/wallet" />
                        <SidebarItem title="Subscriptions" icon="subscriptions" important={true} href="/test/more/subscriptions" />

                    </div>
                    <div className={styles.footer} >
                        <SidebarItem title="Profile" icon="profile" />
                        <SidebarItem title="Settings" icon="settings" />
                        <SidebarItem title="Sign out" icon="logout" logout={true} />
                    </div>
                </div>
            }
        </>

    )
}

export default SidebarMobile