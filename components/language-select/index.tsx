import styles from "../language-select/LanguageSelect.module.css"
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';
import Image from "next/image";
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
                <Image src="/mui-icons/expand-more.svg" alt="expand more material icon" width={20} height={20} />
            </div>
            <div className={styles.dropdownContent}>
                {locale != 'az' && <p className={styles.dropdownItem}>
                    <Link href={asPath} locale="az">
                        {t('az')}
                    </Link>
                </p>}
                {locale != 'ru' && <p className={styles.dropdownItem}>
                    <Link href={asPath} locale="ru">
                        {t('ru')}
                    </Link>
                </p>}
                {locale != 'en' && <p className={styles.dropdownItem}>
                    <Link href={asPath} locale="en">
                        {t('en')}
                    </Link>
                </p>}
            </div>
        </div>
    )
}

export default LanguageSelect