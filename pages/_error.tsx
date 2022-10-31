import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import PrimaryButton from "../components/primary-button";
import styles from "../styles/Error.module.css"

const Error: NextPage = () => {
    let router = useRouter()

    function redirect() {
        router.back()
    }


    return (
        <>
            <Head>
                <title>Error | Odero</title>
                <meta
                    name="error page"
                    content="Redirecting users to this page in case of a crash."
                />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>
                <div>
                    <h1>We're sorry.</h1>
                    <h3>Some unexpected error occurred.</h3>
                    <PrimaryButton title="Try again" onClick={redirect} />
                </div>
            </main>
        </>
    )
}

export default Error