import styles from "../language-select/LanguageSelect.module.css"
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';
import Link from "next/link";

const LanguageSelect = () => {
    const { t } = useTranslation('languages');
    const { locale } = useRouter();
    const router = useRouter()
    const { asPath } = router

    return (
        <div className={styles.dropdown}>
            <div className={styles.row}>
                <span>{t(`${locale}`)}</span>
                <picture>
                    <source srcSet="/mui-icons/expand-more-dark.svg" media="(prefers-color-scheme: dark)" />
                    <img src="/mui-icons/expand-more.svg" alt="expand more material icon" width={20} height={20} />
                </picture>
            </div>
            <div className={styles.dropdownContent}>
                {locale != 'az' && <p className={styles.dropdownItem}>
                    <Link href={asPath} locale="az">
                        Azərbaycanca
                    </Link>
                </p>}
                {locale != 'ru' && <p className={styles.dropdownItem}>
                    <Link href={asPath} locale="ru">
                        Русский
                    </Link>
                </p>}
                {locale != 'en' && <p className={styles.dropdownItem}>
                    <Link href={asPath} locale="en">
                        English
                    </Link>
                </p>}
            </div>
        </div>
    )
}

export default LanguageSelect