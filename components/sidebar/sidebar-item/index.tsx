import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../sidebar-item/SidebarItem.module.css"
import SidebarItem from "./interface";

const SidebarItem = (props: SidebarItem) => {
    const router = useRouter();
    return (
        <Link href={props.href ?? ''}>
            <div
                className={
                    `${styles.grid} 
                    ${props.activePath ?
                        router.asPath.includes(props.activePath) && props.important && styles.gridSelectedImportant :
                        router.asPath == props.href && props.important && styles.gridSelectedImportant}
                    ${props.activePath ?
                        router.asPath.includes(props.activePath) && !props.important && styles.gridSelected :
                        router.asPath == props.href && !props.important && styles.gridSelected}
                    ${props.important && styles.important} 
                    ${props.logout && styles.logout} 
                    ${props.collapsed && styles.center}`
                }
                onClick={props.onClick}
            >
                <div className={styles.leading}>
                    <picture className={styles.logo}>
                        <source srcSet={`/mui-icons/${props.icon}-dark.svg`} media="(prefers-color-scheme: dark)" />
                        <img src={`/mui-icons/${props.icon}.svg`} alt="respective material icon for the sidebar item" width={22} height={22} />
                    </picture>
                    {!props.collapsed && <span className={styles.title}>{props.title}</span>}
                </div>
            </div>
        </Link>
    )
}

export default SidebarItem