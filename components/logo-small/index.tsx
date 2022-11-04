import styles from "../logo-small/LogoSmall.module.css"
import Link from "next/link"

const OderoLogoSmall = () => {

    return (
        <Link href="/">
            <picture className={styles.logo}>
                <source srcSet="/odero-logos/odero-small-dark.svg" media="(prefers-color-scheme: dark)" />
                <img src="/odero-logos/odero-small.svg" alt="Odero Logo Small" width={35} height={35} />
            </picture>
        </Link>
    )
}

export default OderoLogoSmall