import Link from "next/link";
import styles from "../grid-item/GridItem.module.css"
import GridItemProps from "./interface";

const GridItem = (props: GridItemProps) => {
    return (
        <Link href={props.href}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <picture className={styles.logo}>
                        <source srcSet={`/mui-icons/${props.icon}-dark.svg`} media="(prefers-color-scheme: dark)" />
                        <img src={`/mui-icons/${props.icon}.svg`} alt="respective material icon for the sidebar item" width={22} height={22} />
                    </picture>
                    <span className={styles.title}>{props.label}</span>
                </div>
                <span className={styles.description}>{props.description}</span>
            </div>
        </Link>
    )
}

export default GridItem