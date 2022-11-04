import styles from "../logo/Logo.module.css"
import { useRouter } from "next/router"
import Link from "next/link"

const OderoLogo = () => {
    const router = useRouter()
    return (
        <Link href="/">
            <picture className={styles.logo}>
                <source srcSet="/odero-logos/odero-dark.svg" media="(prefers-color-scheme: dark)" />
                <img src="/odero-logos/odero.svg" alt="Odero Logo" width={95} height={35} />
            </picture>
        </Link>
    )
}

export default OderoLogo