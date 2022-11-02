import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Home | Odero</title>
                <meta name="home" content="Dashboard page where you can view and manage your business." />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>

            </main>
        </>
    )
}

export default Home