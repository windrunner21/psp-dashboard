import styles from "../logo-small/LogoSmall.module.css"
import { useRouter } from "next/router"

const OderoLogoSmall = () => {
    const router = useRouter()
    return (
        <picture className={styles.logo} onClick={() => router.push("/")}>
            <source srcSet="/odero-logos/odero-small-dark.svg" media="(prefers-color-scheme: dark)" />
            <img src="/odero-logos/odero-small.svg" alt="Odero Logo Small" width={35} height={35} />
        </picture>
    )
}

export default OderoLogoSmall