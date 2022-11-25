import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Register.module.css";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';

// custom components
import OderoLogo from "../components/logo";
import TextField from "../components/text-field";
import PrimaryLink from "../components/primary-link";
import PrimaryButton from "../components/primary-button";
import Footer from "../components/footer";
import OneTimePassword from "../components/one-time-password";
import AlertDialog from "../components/alert-dialog";
import AlertType from "../components/alert-dialog/AlertType";
import sendSignUpForm from "../controllers/register";

const Register: NextPage = () => {
    const { t } = useTranslation(['register', 'common']);
    const title = `${t('title')} | Odero`;

    const [isAlertVisible, setAlertVisible] = React.useState(false)
    const [alertTitle, setAlertTitle] = React.useState("")
    const [alertDescription, setAlertDescription] = React.useState("")
    const [alertType, setAlertType] = React.useState(AlertType.UNKNOWN)
    const [isModalVisible, setModalVisible] = React.useState(false)
    const [loading, setIsLoading] = React.useState(false)

    // data
    const [name, setName] = React.useState("")
    const [surname, setSurname] = React.useState("")
    const [phoneNumber, setPhoneNumber] = React.useState("")

    async function signUp() {
        setIsLoading(true)
        const status = await sendSignUpForm(name, surname, phoneNumber);
        setIsLoading(false)
        if (status == 200) {
            setModalVisible(true)
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
                                capitalized={true}
                                setValue={setSurname}
                            />
                        </div>
                        <TextField
                            type="tel"
                            label={t('common:phoneNumber')}
                            placeholder={t('common:phoneNumberPrompt')}
                            validateAgainst="phoneNumber"
                            pattern="+### (##) ### ## ##"
                            value={phoneNumber}
                            setValue={setPhoneNumber}

                        />
                        <div style={{ height: "1rem" }} />
                        <PrimaryButton title={t('signUp')} onClick={() => signUp()} loading={loading} />
                        <p className={styles.caption}>{t('hadAccount')} <PrimaryLink href="/login" label={t('signIn')} /></p>
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

export default Register;

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["register", "otp", "alert-dialog", "common", "footer", "validators"]))
        },
    };
}
