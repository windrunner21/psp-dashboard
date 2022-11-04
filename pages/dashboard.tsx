import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Dashboard.module.css"
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from 'next/router'

// custom components
import NavigationBarDashboard from "../components/navigation-bar-dashboard";
import Sidebar from "../components/sidebar";
import SidebarMobile from "../components/sidebar-mobile";
import NotificationsDialog from "../components/notifications-dialog";
import NotificationItem from "../components/notifications-dialog/notifications-item/NotificationItem";

const Home: NextPage = () => {
    const router = useRouter()

    const [sidebarCollapsed, collapseSidebar] = React.useState(false)
    const [areNotificationslVisible, setNotificationsVisible] = React.useState(false)
    const [notificationsList, setNotificationsList] = React.useState([
        new NotificationItem(1, "Payment Failed", "Your payment dated 21/10/2022 has failed due to unknown reasons.", true),
        new NotificationItem(2, "Settlement Received", "Your settlement was last week successfully completed.", true),
    ])

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("resize", () => collapseSidebar(window.innerWidth <= 1200));

            return () => window.removeEventListener("resize", () => collapseSidebar(window.innerWidth <= 1200))
        }
    }, []);

    return (
        <>
            <Head>
                <title>Dashboard | Odero</title>
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
                    <NavigationBarDashboard onNotificationsClick={setNotificationsVisible} />
                </div>
                {
                    areNotificationslVisible &&
                    <NotificationsDialog notifications={notificationsList} onClick={setNotificationsVisible} updateNotifications={setNotificationsList} />
                }
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