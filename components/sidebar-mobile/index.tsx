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
                        <SidebarItem title="Payments" icon="payments" important={true} />
                        <SidebarItem title="Refunds" icon="refunds" important={true} />
                        <hr className={styles.divider} />
                        <SidebarItem
                            title="More"
                            icon="tune"
                            hasTrailing={true}
                            important={true}
                            onClick={() => collapseOptions(!optionsCollapsed)}
                            state={optionsCollapsed}
                        />
                        {
                            optionsCollapsed &&
                            <div>
                                <SidebarItem title="Link" icon="link" important={true} />
                                <SidebarItem title="Wallet" icon="wallet" important={true} />
                            </div>
                        }
                        <hr className={styles.divider} />
                        <SidebarItem title="Distribution" icon="distribution" important={true} />
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