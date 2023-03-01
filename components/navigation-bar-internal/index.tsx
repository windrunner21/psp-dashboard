import styles from "./NavigationBarInternal.module.css"
import NavigationBarInternalProps from "./interface"
import Link from "next/link"
import { useRouter } from "next/router";

const NavigationBarInternal = (props: NavigationBarInternalProps) => {
    const router = useRouter();

    return (
        <div className={styles.contents}>
            <Link href="/test/payments/payments">
                <span className={`${styles.contentItem} ${router.pathname.endsWith("/payments") && styles.active}`}>All Payments</span>
            </Link>
            <Link href="/test/payments/transactions">
                <span className={`${styles.contentItem} ${router.pathname.endsWith("/transactions") && styles.active}`}>All Sessions</span>
            </Link>
            <Link href="/test/payments/fraud">
                <span className={`${styles.contentItem} ${router.pathname.endsWith("/fraud") && styles.active}`}>Fraud</span>
            </Link>
            <Link href="/test/payments/risks">
                <span className={`${styles.contentItem} ${router.pathname.endsWith("/risks") && styles.active}`}>Risk Payments</span>
            </Link>
        </div>
    )
}

export default NavigationBarInternal