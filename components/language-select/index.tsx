import styles from "../language-select/LanguageSelect.module.css"
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';
import Image from "next/image";

const LanguageSelect = () => {
    const { t } = useTranslation('languages');
    const { locale } = useRouter();
    const router = useRouter()
    const { pathname, asPath, query } = router

    return (
        <div className={styles.dropdown}>
            <div className={styles.row}>
                <span>{t(`${locale}`)}</span>
                <Image src="/mui-icons/expand-more.svg" alt="expand more mui icon" width={20} height={20} />
            </div>
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