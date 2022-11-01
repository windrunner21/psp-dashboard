import styles from "../language-select/LanguageSelect.module.css"
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';

const LanguageSelect = () => {
    const { t } = useTranslation('languages');
    const { locale } = useRouter();
    const router = useRouter()
    const { pathname, asPath, query } = router

    return (
        <div className={styles.dropdown}>
            <span>{t(`${locale}`)} &#9207;</span>
            <div className={styles.dropdownContent}>
                {locale != 'az' && <p className={styles.dropdownItem} onClick={() => {
                    router.push({ pathname, query }, asPath, { locale: "az" })
                }}>
                    {t('az')}
                </p>}
                {locale != 'ru' && <p className={styles.dropdownItem} onClick={() => {
                    router.push({ pathname, query }, asPath, { locale: "ru" })
                }}>
                    {t('ru')}
                </p>}
                {locale != 'en' && <p className={styles.dropdownItem} onClick={() => {
                    router.push({ pathname, query }, asPath, { locale: "en" })
                }}>
                    {t('en')}
                </p>}
            </div>
        </div>
    )
}

export default LanguageSelect