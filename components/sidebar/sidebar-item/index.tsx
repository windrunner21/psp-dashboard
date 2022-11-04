import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../sidebar-item/SidebarItem.module.css"
import SidebarItem from "./interface";

const SidebarItem = (props: SidebarItem) => {
    const router = useRouter();
    return (
        <>
            {
                props.href &&
                <Link href={props.href}>
                    <div
                        className={`${styles.grid} 
                        ${router.asPath == props.href && props.important ? styles.gridSelectedImportant : ''}
                        ${router.asPath == props.href && !props.important ? styles.gridSelected : ''}
                        ${props.important ? styles.important : props.logout ? styles.logout : ''} 
                        ${props.collapsed ? styles.center : ''}`}
                    >
                        <div className={styles.leading}>
                            <Image src={`/mui-icons/${props.icon}.svg`} alt="respective material icon for the sidebar item" width={22} height={22} />
                            {!props.collapsed && <span className={styles.title}>{props.title}</span>}
                        </div>
                        {
                            props.hasTrailing && !props.collapsed &&
                            <div>
                                {
                                    props.state ?
                                        <Image src="/mui-icons/expand-less.svg" alt="expand less material icon" width={18} height={18} /> :
                                        <Image src="/mui-icons/expand-more.svg" alt="expand more material icon" width={18} height={18} />
                                }
                            </div>
                        }
                    </div>
                </Link>
            }
            {
                !props.href &&
                <div
                    className={`${styles.grid} 
                    ${props.important ? styles.important : props.logout ? styles.logout : ''} 
                    ${props.collapsed ? styles.center : ''}`}
                    onClick={props.onClick}
                >
                    <div className={styles.leading}>
                        <Image src={`/mui-icons/${props.icon}.svg`} alt="respective material icon for the sidebar item" width={22} height={22} />
                        {!props.collapsed && <span className={styles.title}>{props.title}</span>}
                    </div>
                    {
                        props.hasTrailing && !props.collapsed &&
                        <div>
                            {
                                props.state ?
                                    <Image src="/mui-icons/expand-less.svg" alt="expand less material icon" width={18} height={18} /> :
                                    <Image src="/mui-icons/expand-more.svg" alt="expand more material icon" width={18} height={18} />
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default SidebarItem