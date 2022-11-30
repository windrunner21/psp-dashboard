import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';

// custom components
import OderoLogo from "../components/logo";
import PrimaryLink from "../components/primary-link";
import PrimaryButton from "../components/primary-button";
import Footer from "../components/footer";
import OneTimePassword from "../components/one-time-password";
import AlertDialog from "../components/alert-dialog";
import AlertType from "../components/alert-dialog/AlertType";
import PhoneNumberField from "../components/phone-number-field";
import { sendOTP } from "../controllers/auth";

const Login: NextPage = () => {
    const { t } = useTranslation(['login', 'common']);
    const title = `${t('title')} | Odero`;

    const [isAlertVisible, setAlertVisible] = React.useState(false)
    const [alertTitle, setAlertTitle] = React.useState("")
    const [alertDescription, setAlertDescription] = React.useState("")
    const [alertType, setAlertType] = React.useState(AlertType.UNKNOWN)
    const [isModalVisible, setModalVisible] = React.useState(false)
    const [loading, setIsLoading] = React.useState(false)

    // data
    const [phoneNumber, setPhoneNumber] = React.useState("")

    async function signIn() {
        // empty form error messages
        setAlertType(AlertType.ERROR);
        setAlertTitle(t('alert-dialog:title.error.emptyForm'))
        setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))

        // check for empty forms
        if (phoneNumber == "") {
            setAlertVisible(true)
        } else {
            setIsLoading(true)

            // wait for server to return status
            const status = await sendOTP(phoneNumber);
            setIsLoading(false)

            if (status == 200) {
                setModalVisible(true)
            } else {
                setAlertType(AlertType.ERROR);
                setAlertTitle(t('alert-dialog:title.error.generic'))
                setAlertDescription(t('alert-dialog:subtitle.error.generic'))

                // client side
                if (status == 401) {
                    setAlertType(AlertType.WARNING);
                    setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                    setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                }

                // server side 502 already exists TODO

                // no response received
                if (status == 999) {
                    setAlertType(AlertType.INFORMATION);
                    setAlertTitle(t('alert-dialog:title.error.generic'))
                    setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                }

                // axios side
                if (status === 1000) {
                    setAlertType(AlertType.INFORMATION);
                    setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                    setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                }

                setAlertVisible(true)
            }
        }
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="login"
                    content={t('description')}
                />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.leftContainer}>
                    {isAlertVisible &&
                        <AlertDialog
                            delay={4000}
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

                        <PhoneNumberField
                            type="tel"
                            label={t('common:phoneNumber')}
                            placeholder={t('common:phoneNumberPrompt')}
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                            autofocus={true}
                        />
                        <div style={{ height: "1rem" }} />
                        <PrimaryButton title={t('signIn')} onClick={async () => await signIn()} loading={loading} />
                        <p className={styles.caption}>{t('noAccount')} <PrimaryLink href="/register" label={t('signUp')} /></p>
                    </div>
                    {isModalVisible &&
                        <OneTimePassword
                            phoneNumber={phoneNumber}
                            onClick={() => setModalVisible(false)}
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
