import Image from "next/image"
import { useRouter } from "next/router"
import styles from "../footer/Footer.module.css"
import { useTranslation } from 'next-i18next';

const Footer = () => {
    const { t } = useTranslation('footer');
    const router = useRouter()
    const { pathname, asPath, query } = router

    return (
        <footer className={styles.footer}>
            <a
                href="https://odero.az"
                target="_blank"
                rel="noopener noreferrer"
            >
                {t('caption')} &copy; {new Date().getFullYear()}
            </a>
            <div className={styles.languages}>
                <div onClick={() => router.push({ pathname, query }, asPath, { locale: "az" })}>
                    <Image src="/flags/az.svg" alt="Azerbaijani Flag Language" width={24} height={24} />
                </div>
                <div style={{ margin: "0 1rem" }} onClick={() => router.push({ pathname, query }, asPath, { locale: "ru" })}>
                    <Image src="/flags/ru.svg" alt="Russian Flag Language" width={24} height={24} />
                </div>
                <div onClick={() => router.push({ pathname, query }, asPath, { locale: "en" })}>
                    <Image src="/flags/en.svg" alt="USA Flag Language" width={24} height={24} />
                </div>
            </div>
        </footer>
    )
}

export default Footer