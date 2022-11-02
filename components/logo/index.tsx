import styles from "../logo/Logo.module.css"
import { useRouter } from "next/router"

const OderoLogo = () => {
    const router = useRouter()
    return (
        <picture className={styles.logo} onClick={() => router.push("/")}>
            <source srcSet="/odero-logos/odero-dark.svg" media="(prefers-color-scheme: dark)" />
            <img src="/odero-logos/odero.svg" alt="Odero Logo" width={95} height={35} />
        </picture>
    )
}

export default OderoLogo