import Image from "next/image"
import { useRouter } from "next/router"
import styles from "../footer/Footer.module.css"
import { useTranslation } from 'next-i18next';
import Link from "next/link";

const Footer = () => {
    const { t } = useTranslation('footer');
    const router = useRouter()
    const { asPath } = router

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
                <div>
                    <Link href={asPath} locale="az">
                        <>
                            <Image src="/flags/az.svg" alt="Azerbaijani Flag Language" width={24} height={24} />
                        </>
                    </Link>
                </div>
                <div style={{ margin: "0 1rem" }}>
                    <Link href={asPath} locale="ru">
                        <>
                            <Image src="/flags/ru.svg" alt="Russian Flag Language" width={24} height={24} />
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={asPath} locale="en">
                        <>
                            <Image src="/flags/en.svg" alt="US Flag Language" width={24} height={24} />
                        </>
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer