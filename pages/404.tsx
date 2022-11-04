import { NextPage } from "next";
import Head from "next/head";
import Image from 'next/image'
import styles from "../styles/404.module.css"

// custom components
import PrimaryButton from "../components/primary-button";
import Link from "next/link";

const Error404: NextPage = () => {
    return (
        <>
            <Head>
                <title>Error 404 | Odero</title>
                <meta
                    name="error 404"
                    content="Redirecting users to another relevant page when requested page is not found."
                />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.leftContainer}>
                    <div className={styles.form}>
                        <h1 className={styles.title}>404</h1>
                        <h3 className={styles.subtitle}>Page Not Found!</h3>
                        <p className={styles.description}>We&apos;re sorry, the page you requested could not be found. Please go back to the homepage!</p>
                        <Link href="/">
                            <PrimaryButton title="Go back" />
                        </Link>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <Image src="/errors/404.svg" alt="Vercel Logo" width={500} height={500} />
                </div>
            </main>
        </>
    )
}

export default Error404