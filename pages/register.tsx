import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Register.module.css";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'

// custom components
import OderoLogo from "../components/logo";
import TextField from "../components/text-field";
import PrimaryLink from "../components/primary-link";
import PrimaryButton from "../components/primary-button";
import Footer from "../components/footer";
import OneTimePassword from "../components/one-time-password";
import AlertDialog from "../components/alert-dialog";
import AlertType from "../components/alert-dialog/AlertType";
import { sendOTP } from "../controllers/auth";
import PhoneNumberField from "../components/phone-number-field";

const Register: NextPage = () => {
    const { locale } = useRouter();
    const { t } = useTranslation(['register', 'common']);
    const title = `${t('title')} | Odero`;

    const [isAlertVisible, setAlertVisible] = React.useState(false)
    const [alertTitle, setAlertTitle] = React.useState("")
    const [alertDescription, setAlertDescription] = React.useState("")
    const [alertType, setAlertType] = React.useState(AlertType.UNKNOWN)
    const [isModalVisible, setModalVisible] = React.useState(false)
    const [loading, setIsLoading] = React.useState(false)

    // form data
    const [name, setName] = React.useState("")
    const [nameCorrect, setNameCorrect] = React.useState(false)
    const [surname, setSurname] = React.useState("")
    const [surnameCorrect, setSurnameCorrect] = React.useState(false)
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [phoneNumberCorrect, setPhoneNumberCorrect] = React.useState(false)

    async function signUp() {
        console.log(nameCorrect)
        console.log(surnameCorrect)
        console.log(phoneNumberCorrect)
        // empty form error messages
        setAlertType(AlertType.ERROR);
        setAlertTitle(t('alert-dialog:title.error.emptyForm'))
        setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))

        // check for empty then invalid form
        if (name === "" || surname === "" || phoneNumber === "") {
            setAlertVisible(true)
        }
        else if (!nameCorrect || !surnameCorrect || !phoneNumberCorrect) {
            setAlertType(AlertType.WARNING);
            setAlertTitle(t('alert-dialog:title.error.wrongForm'))
            setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
            setAlertVisible(true)
        } else {
            setIsLoading(true)

            // wait for server to return status
            const status = await sendOTP(phoneNumber, "signup", locale ? locale : 'az');
            setIsLoading(false)

            if (status == 200) {
                setModalVisible(true)
            } else {
                setAlertType(AlertType.ERROR);
                setAlertTitle(t('alert-dialog:title.error.generic'))
                setAlertDescription(t('alert-dialog:subtitle.error.generic'))

                // client side
                if (status == 401 || status == 502) {
                    setAlertType(AlertType.WARNING);
                    setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                    setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                }

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
                        <h2 className={styles.title}>{t('signUp')}</h2>

                        <p className={styles.description}>
                            {t('createAccount')}
                        </p>
                        <div className={styles.row}>
                            <TextField
                                label={t('common:name')}
                                placeholder={t('common:namePrompt')}
                                validatorLabel="Invalid name"
                                validateAgainst="name"
                                validatorCallback={setNameCorrect}
                                autofocus={true}
                                capitalized={true}
                                setValue={setName}
                            />
                            <div style={{ width: "1rem" }} />
                            <TextField
                                label={t('common:surname')}
                                placeholder={t('common:surnamePrompt')}
                                validatorLabel="Invalid surname"
                                validateAgainst="name"
                                validatorCallback={setSurnameCorrect}
                                capitalized={true}
                                setValue={setSurname}
                            />
                        </div>
                        <PhoneNumberField
                            type="tel"
                            label={t('common:phoneNumber')}
                            placeholder={t('common:phoneNumberPrompt')}
                            value={phoneNumber}
                            setValue={setPhoneNumber}
                            validateNumber={setPhoneNumberCorrect}
                        />
                        <div style={{ height: "1rem" }} />
                        <PrimaryButton title={t('signUp')} onClick={async () => await signUp()} loading={loading} />
                        <p className={styles.caption}>{t('hadAccount')} <PrimaryLink href="/login" label={t('signIn')} /></p>
                    </div>
                    {isModalVisible &&
                        <OneTimePassword
                            name={name}
                            surname={surname}
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

export default Register;

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["register", "otp", "alert-dialog", "common", "footer", "validators"]))
        },
    };
}
