import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// custom components
import NavigationBarDashboard from "../components/navigation-bar-dashboard";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Home | Odero</title>
                <meta name="home" content="Dashboard page where you can view and manage your business." />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>
                <NavigationBarDashboard />
            </main>
        </>
    )
}

export default Home

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["languages"]))
        },
    };
}