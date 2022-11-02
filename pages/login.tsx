import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';

// custom components
import OderoLogo from "../components/logo";
import TextField from "../components/text-field";
import CheckboxWithLabel from "../components/checkbox-label";
import PrimaryLink from "../components/primary-link";
import PrimaryButton from "../components/primary-button";
import Footer from "../components/footer";
import OneTimePassword from "../components/one-time-password";
import AlertDialog from "../components/alert-dialog";
import AlertType from "../components/alert-dialog/AlertType";

const Login: NextPage = () => {
    const { t } = useTranslation(['login', 'common']);
    const title = `${t('title')} | Odero`;

    const [isAlertVisible, setAlertVisible] = React.useState(false)
    const [alertTitle, setAlertTitle] = React.useState("")
    const [alertDescription, setAlertDescription] = React.useState("")
    const [alertType, setAlertType] = React.useState(AlertType.UNKNOWN)
    const [isModalVisible, setModalVisible] = React.useState(false)
    const [loading, setIsLoading] = React.useState(false)

    function showOneTimePassword(value: boolean) {
        setIsLoading(value)
        setModalVisible(value)
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="login"
                    content={t('content')}
                />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.leftContainer}>
                    {isAlertVisible &&
                        <AlertDialog
                            title={alertTitle}
                            description={alertDescription}
                            type={alertType}
                            onClick={() => setAlertVisible(false)}
                        />
                    }
                    <div className={`${styles.form} ${isModalVisible && styles.blur}`}>
                        <OderoLogo />
                        <h2 className={styles.title}>{t('signIn')}</h2>

                        <p className={styles.description}>
                            {t('welcomeBack')}
                        </p>

                        <TextField
                            type="email"
                            label={t('common:email')}
                            placeholder={t('common:emailPrompt')}
                            validatorLabel={t('validators:email')}
                            validateAgainst="email"
                            autofocus={true}
                        />
                        <TextField
                            type="password"
                            label={t('common:password')}
                            placeholder={t('common:password')}
                        />
                        <div className={styles.options}>
                            <CheckboxWithLabel label={t('rememberMe')} />
                            <PrimaryLink href="/" label={t('forgotPassword')} />
                        </div>
                        <PrimaryButton title={t('signIn')} onClick={() => showOneTimePassword(true)} loading={loading} />
                        <p className={styles.caption}>{t('noAccount')} <PrimaryLink href="https://odero.az/az/registration/" label={t('signUp')} /></p>
                    </div>
                    {isModalVisible &&
                        <OneTimePassword
                            phoneNumber={"+994 (51) 780 79 29"}
                            onClick={() => showOneTimePassword(false)}
                            setAlertType={setAlertType}
                            setAlertTitle={setAlertTitle}
                            setAlertDescription={setAlertDescription}
                            showAlert={setAlertVisible}
                        />
                    }
                </div>
                <div className={styles.rightContainer}>
                    <Image src="/welcome-vector.png" alt="Welcome Merchant Right Vector" width={514} height={346} />
                    <div className={styles.callout}>
                        <h2>{t('inspiration')}</h2>
                        <p>{t('fromOderoAzTeam')}</p>
                    </div>
                </div>
            </main >

            <Footer />
        </>
    );
};

export default Login;

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["login", "otp", "alert-dialog", "common", "footer", "validators"]))
        },
    };
}
