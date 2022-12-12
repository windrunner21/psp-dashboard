import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import Router, { useRouter } from "next/router";

// custom components
import OderoLogo from "../components/logo";
import PrimaryLink from "../components/primary-link";
import PrimaryButton from "../components/primary-button";
import Footer from "../components/footer";
import { OneTimePassword } from "../components/one-time-password";
import AlertDialog from "../components/alert-dialog";
import AlertType from "../components/alert-dialog/AlertType";
import PhoneNumberField from "../components/phone-number-field";
import { sendOTP } from "../requests/auth";
import useUser from "../controllers/user";
import LoadingIndicatorPage from "../components/loading-indicator-page";
import alertStyles from "../components/alert-dialog/AlertDialog.module.css"

const Login: NextPage = () => {
    const { user, loading, loggedOut } = useUser();

    const { locale } = useRouter();
    const { t } = useTranslation(['login', 'common']);
    const title = `${t('title')} | Odero`;

    // alert dialog configuration
    const [isAlertVisible, setAlertVisible] = React.useState(false)
    const [alertTitle, setAlertTitle] = React.useState("")
    const [alertDescription, setAlertDescription] = React.useState("")
    const [alertType, setAlertType] = React.useState(AlertType.UNKNOWN)
    const [alertStyle, setAlertStyle] = React.useState(alertStyles.error)

    const [step, setStep] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)

    // form data
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [phoneNumberCorrect, setPhoneNumberCorrect] = React.useState(false)

    async function signIn() {
        // empty form error messages
        setAlertType(AlertType.ERROR);
        setAlertTitle(t('alert-dialog:title.error.emptyForm'))
        setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
        setAlertStyle(alertStyles.error)

        // check for empty forms
        if (phoneNumber == "") {
            setAlertVisible(true)
        } else if (!phoneNumberCorrect) {
            setAlertType(AlertType.WARNING);
            setAlertTitle(t('alert-dialog:title.error.wrongForm'))
            setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
            setAlertStyle(alertStyles.warning)
            setAlertVisible(true)
        } else {
            setIsLoading(true)

            // wait for server to return status
            const status = await sendOTP(phoneNumber, "signin", locale ? locale : 'az');
            setIsLoading(false)

            if (status == 200) {
                const stepWillSet = step + 1;
                setStep(stepWillSet)
            } else {
                setAlertType(AlertType.ERROR);
                setAlertTitle(t('alert-dialog:title.error.generic'))
                setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                setAlertStyle(alertStyles.error)

                // client side
                if (status == 401 || status == 502) {
                    setAlertType(AlertType.WARNING);
                    setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                    setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                    setAlertStyle(alertStyles.warning)
                }

                if (status == 301) {
                    setAlertType(AlertType.WARNING);
                    setAlertTitle(t('alert-dialog:title.error.otpAlreadySent'))
                    setAlertDescription(t('alert-dialog:subtitle.error.otpAlreadySent'))
                    setAlertStyle(alertStyles.warning)
                }

                setAlertVisible(true)
            }
        }
    }

    React.useEffect(() => {
        if (!loggedOut && user) { Router.push("/"); }
    }, [loggedOut, user]);

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
            {loading && <LoadingIndicatorPage />}
            {
                loggedOut &&
                <>
                    <main className={styles.main}>
                        <div className={styles.leftContainer}>
                            {
                                isAlertVisible &&
                                <AlertDialog
                                    delay={4000}
                                    title={alertTitle}
                                    description={alertDescription}
                                    type={alertType}
                                    style={alertStyle}
                                    onClick={() => setAlertVisible(false)}
                                />
                            }
                            {step == 0 &&
                                <div className={styles.form}>
                                    <OderoLogo />
                                    <h2 className={styles.title}>{t('signIn')}</h2>

                                    <p className={styles.description}>
                                        {t('welcomeBack')}
                                    </p>

                                    <PhoneNumberField
                                        type="tel"
                                        label={t('common:phoneNumber')}
                                        placeholder={t('common:phoneNumberPrompt')}
                                        setValue={setPhoneNumber}
                                        validateNumber={setPhoneNumberCorrect}
                                        autofocus={true}
                                    />
                                    <div style={{ height: "1rem" }} />
                                    <PrimaryButton title={t('signIn')} onClick={async () => await signIn()} loading={isLoading} />
                                    <p className={styles.caption}>{t('noAccount')} <PrimaryLink href="/register" label={t('signUp')} /></p>
                                </div>
                            }
                            {step == 1 &&
                                <OneTimePassword
                                    type="signin"
                                    phoneNumber={phoneNumber}
                                    onClick={() => {
                                        const stepWillSet = step - 1;
                                        setStep(stepWillSet)
                                    }}
                                    setAlertTitle={setAlertTitle}
                                    setAlertDescription={setAlertDescription}
                                    setAlertType={setAlertType}
                                    setAlertStyle={setAlertStyle}
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
            }
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
