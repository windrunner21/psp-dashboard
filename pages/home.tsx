import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css"
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// custom components
import NavigationBarDashboard from "../components/navigation-bar-dashboard";
import Sidebar from "../components/sidebar";
import SidebarMobile from "../components/sidebar-mobile";

const Home: NextPage = () => {
    const [sidebarCollapsed, collapseSidebar] = React.useState(false)

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("resize", () => collapseSidebar(window.innerWidth <= 1200));

            return () => window.removeEventListener("resize", () => collapseSidebar(window.innerWidth <= 1200))
        }
    }, []);

    return (
        <>
            <Head>
                <title>Home | Odero</title>
                <meta name="home" content="Dashboard page where you can view and manage your business." />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>
                <div className={`${styles.leftContainer} ${sidebarCollapsed ? styles.collapse : ''}`}>
                    <div className={styles.desktop}>
                        <Sidebar collapsed={sidebarCollapsed} collapse={collapseSidebar} />
                    </div>
                    <div className={styles.mobile}>
                        <SidebarMobile />
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <NavigationBarDashboard />
                </div>
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