import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import React from "react";

// custom components
import OderoLogo from "../components/logo";
import TextField from "../components/text-field";
import CheckboxWithLabel from "../components/checkbox-label";
import PrimaryLink from "../components/primary-link";
import PrimaryButton from "../components/primary-button";
import Footer from "../components/footer";
import OneTimePassword from "../components/one-time-password";
import CloseButton from "../components/close-button";

const Login: NextPage = () => {
    const [phoneNumber, setPhoneNumber] = React.useState('{phone number}')
    const [isModalVisible, setModalVisible] = React.useState(false)

    function showOneTimePassword(value: boolean) {
        setModalVisible(value)
    }

    return (
        <>
            <Head>
                <title>Login | Odero</title>
                <meta
                    name="login"
                    content="Merchant login page for the merchant.odero.az website."
                />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.leftContainer}>
                    <div className={`${styles.form} ${isModalVisible && styles.blur}`}>
                        <OderoLogo />
                        <h2 className={styles.title}>Sign in</h2>

                        <p className={styles.description}>
                            Welcome back! Please enter your details
                        </p>

                        <TextField type="email" label="Email" placeholder="Enter your email" />
                        <TextField type="password" label="Password" placeholder="Password" />
                        <div className={styles.options}>
                            <CheckboxWithLabel label="Remember for 30 days" />
                            <PrimaryLink href="/" label="Forgot password" />
                        </div>
                        <PrimaryButton title="Sign in" onClick={() => showOneTimePassword(true)} />
                        <p className={styles.caption}>Don't have an account? <PrimaryLink href="/" label="Sign up" /></p>
                    </div>

                    <div hidden={!isModalVisible}>
                        <OneTimePassword phoneNumber={phoneNumber} onClick={() => showOneTimePassword(false)} />
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <Image src="/welcome-vector.png" alt="Welcome Merchant Right Vector" width={514} height={346} />
                    <div className={styles.callout}>
                        <h2>Working hard for you to always get the best news.</h2>
                        <p>Sincerely, Odero.az Team 💚</p>
                    </div>
                </div>
            </main >

            <Footer />
        </>
    );
};

export default Login;
