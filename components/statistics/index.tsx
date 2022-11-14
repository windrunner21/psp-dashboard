import styles from "../statistics/Statistics.module.css"
import Comparison from "./comparison"
import StatisticsItem from "./statistics-item"

const Statistics = () => {
    return (
        <div className={styles.grid}>
            <span className={styles.greeting}>Good evening, Imran!</span>
            <StatisticsItem title="988.74 ₼" subtitle="Your overall balance" image="balance" />
            <StatisticsItem title="1248.50 ₼" subtitle="Successful payments income" image="payment-success" />
            <StatisticsItem title="34" subtitle="Successful payments" image="numbers" />
            <Comparison />
        </div>
    )
}

export default Statistics