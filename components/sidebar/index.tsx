import styles from "../sidebar/Sidebar.module.css"
import OderoLogo from "../logo";
import SidebarProps from "./interface";
import OderoLogoSmall from "../logo-small";
import SidebarItem from "./sidebar-item";
import React from "react";
import GridItem from "../grid-item";
import { logout } from "../../requests/auth";
import { useSWRConfig } from 'swr'

const Sidebar = (props: SidebarProps) => {
    const { mutate } = useSWRConfig()
    const [moreOverlay, showMoreOverlay] = React.useState(false)

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    {props.collapsed ? <OderoLogoSmall /> : <OderoLogo />}
                </div>
            </div>
            <div className={`${styles.content} ${props.collapsed ? styles.collapsed : ''}`} >
                <SidebarItem
                    title="Dashboard"
                    icon="dashboard"
                    important={true}
                    collapsed={props.collapsed}
                    href="/"
                />
                <SidebarItem
                    title="Payments"
                    icon="payments"
                    important={true}
                    collapsed={props.collapsed}
                    href="/test/payments/payments"
                    activePath="/payments"
                />
                <SidebarItem
                    title="Balances"
                    icon="balances"
                    important={true}
                    collapsed={props.collapsed}
                    href="/test/balances"
                />
                <SidebarItem
                    title="Reports"
                    icon="reports"
                    important={true}
                    collapsed={props.collapsed}
                    href="/test/reports"
                />
                <hr className={styles.divider} />
                <SidebarItem
                    title="More"
                    icon="more"
                    important={true}
                    collapsed={props.collapsed}
                    onClick={() => showMoreOverlay(true)}
                />
                <div className={`${styles.overlay} ${moreOverlay && styles.show}`}>
                    <div className={styles.overlayContent} onMouseLeave={() => showMoreOverlay(false)}>
                        <GridItem
                            label="Pay by Link"
                            icon="link"
                            description="Accept payments with zero setup"
                            href="/test/pay-by-link"
                        />
                        <GridItem
                            label="Subscriptions"
                            icon="subscriptions"
                            description="Setup your subscriptions and plans"
                            href="/test/subscriptions" />
                    </div>
                </div>
            </div>
            <div className={`${styles.footer} ${props.collapsed ? styles.collapsed : ''}`} >
                <SidebarItem
                    title="Account"
                    icon="profile"
                    collapsed={props.collapsed}
                    href="/account" />
                <SidebarItem
                    title="Settings"
                    icon="settings"
                    collapsed={props.collapsed}
                    href="/settings" />
                <SidebarItem
                    title="Sign out"
                    icon="logout"
                    collapsed={props.collapsed}
                    logout={true}
                    onClick={() => { logout(props.user._id).then(() => mutate("descartes")) }}
                />
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