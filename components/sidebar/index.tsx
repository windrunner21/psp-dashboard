import styles from "../sidebar/Sidebar.module.css"
import OderoLogo from "../logo";
import SidebarProps from "./interface";
import OderoLogoSmall from "../logo-small";
import SidebarItem from "./sidebar-item";
import React from "react";
import { useRouter } from "next/router";

const Sidebar = (props: SidebarProps) => {
    const router = useRouter()
    const [optionsCollapsed, collapseOptions] = React.useState(false)

    // TEMPORARY
    React.useEffect(() => {
        collapseOptions(router.asPath.includes("/options"))
    }, [])

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    {props.collapsed ? <OderoLogoSmall /> : <OderoLogo />}
                </div>
            </div>
            <div className={`${styles.content} ${props.collapsed ? styles.collapsed : ''}`} >
                <SidebarItem title="Dashboard" icon="dashboard" important={true} collapsed={props.collapsed} href="/dashboard" />
                <SidebarItem title="Payments" icon="payments" important={true} collapsed={props.collapsed} href="/dashboard/payments" />
                <SidebarItem title="Refunds" icon="refunds" important={true} collapsed={props.collapsed} href="/dashboard/refunds" />
                <hr className={styles.divider} />
                <SidebarItem
                    title="Options"
                    icon="tune"
                    hasTrailing={true}
                    important={true}
                    collapsed={props.collapsed}
                    onClick={() => collapseOptions(!optionsCollapsed)}
                    state={optionsCollapsed}
                />
                {
                    optionsCollapsed &&
                    <div>
                        <SidebarItem title="Link" icon="link" important={true} collapsed={props.collapsed} href="/dashboard/options/pay-by-link" />
                        <SidebarItem title="Wallet" icon="wallet" important={true} collapsed={props.collapsed} href="/dashboard/options/wallet" />
                    </div>
                }
                <hr className={styles.divider} />
                <SidebarItem title="Distribution" icon="distribution" important={true} collapsed={props.collapsed} href="/dashboard/distribution" />
            </div>
            <div className={`${styles.footer} ${props.collapsed ? styles.collapsed : ''}`} >
                <SidebarItem title="Account" icon="profile" collapsed={props.collapsed} href="/account" />
                <SidebarItem title="Settings" icon="settings" collapsed={props.collapsed} href="/settings" />
                <SidebarItem title="Sign out" icon="logout" collapsed={props.collapsed} logout={true} href="/" />
            </div>
            <div className={styles.swapper} onClick={() => props.collapse(!props.collapsed)}>
                <picture className={styles.logo}>
                    <source srcSet={`/mui-icons/chevron-${props.collapsed ? 'right' : 'left'}-700-dark.svg`} media="(prefers-color-scheme: dark)" />
                    <img src={`/mui-icons/chevron-${props.collapsed ? 'right' : 'left'}-700.svg`} alt="chevron right material icon" width={20} height={20} />
                </picture>
            </div>
        </div >
    )
}

export default Sidebar