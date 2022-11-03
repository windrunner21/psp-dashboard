import styles from "../sidebar/Sidebar.module.css"
import OderoLogo from "../logo";
import SidebarProps from "./interface";
import Image from "next/image";
import OderoLogoSmall from "../logo-small";
import SidebarItem from "./sidebar-item";
import React from "react";

const Sidebar = (props: SidebarProps) => {
    const [optionsCollapsed, collapseOptions] = React.useState(false)

    return (
        <div className={styles.sidebar}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    {props.collapsed ? <OderoLogoSmall /> : <OderoLogo />}
                </div>
            </div>
            <div className={`${styles.content} ${props.collapsed ? styles.collapsed : ''}`} >
                <SidebarItem title="Dashboard" icon="dashboard" important={true} collapsed={props.collapsed} />
                <SidebarItem title="Payments" icon="payments" important={true} collapsed={props.collapsed} />
                <SidebarItem title="Refunds" icon="refunds" important={true} collapsed={props.collapsed} />
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
                        <SidebarItem title="Link" icon="link" important={true} collapsed={props.collapsed} />
                        <SidebarItem title="Wallet" icon="wallet" important={true} collapsed={props.collapsed} />
                    </div>
                }
                <hr className={styles.divider} />
                <SidebarItem title="Distribution" icon="distribution" important={true} collapsed={props.collapsed} />
            </div>
            <div className={`${styles.footer} ${props.collapsed ? styles.collapsed : ''}`} >
                <SidebarItem title="Profile" icon="profile" collapsed={props.collapsed} />
                <SidebarItem title="Settings" icon="settings" collapsed={props.collapsed} />
                <SidebarItem title="Sign out" icon="logout" logout={true} collapsed={props.collapsed} />
            </div>
            <div className={styles.swapper} onClick={() => props.collapse(!props.collapsed)}>
                <Image src={`/mui-icons/chevron-${props.collapsed ? 'right' : 'left'}-700.svg`} alt="chevron right material icon" width={20} height={20} />
            </div>
        </div >
    )
}

export default Sidebar