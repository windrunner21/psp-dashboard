import Image from "next/image"
import styles from "../statistics-item/StatisticsItem.module.css"
import StatisticsItemProps from "./interface"

const StatisticsItem = (props: StatisticsItemProps) => {
    return (
        <div className={styles.grid}>
            <Image src={`/mui-icons/${props.image}.svg`} alt="statistics item material icon" width={30} height={30} />
            <div className={styles.info}>
                <span className={styles.title}>{props.title}</span>
                <span className={styles.subtitle}>{props.subtitle}</span>
            </div>
        </div>
    )
}

export default StatisticsItem