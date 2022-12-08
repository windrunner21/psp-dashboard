import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Dashboard.module.css"
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// custom components
import NavigationBarDashboard from "../components/navigation-bar-dashboard";
import Sidebar from "../components/sidebar";
import SidebarMobile from "../components/sidebar-mobile";
import NotificationsDialog from "../components/notifications-dialog";
import NotificationItem from "../components/notifications-dialog/notifications-item/NotificationItem";
import useUser from "../controllers/user";
import Router from "next/router";
import LoadingIndicatorPage from "../components/loading-indicator-page";
import GetStarted from "../components/get-started-dashboard";

const Dashboard: NextPage = () => {
    const { user, loading, loggedOut } = useUser();

    const [sidebarCollapsed, collapseSidebar] = React.useState(false)
    const [areNotificationslVisible, setNotificationsVisible] = React.useState(false)
    const [notificationsList, setNotificationsList] = React.useState([
        new NotificationItem(1, "Payment Failed", "Your payment dated 21/10/2022 has failed due to unknown reasons.", true),
        new NotificationItem(2, "Settlement Received", "Your settlement for last week was successfully completed.", true),
        new NotificationItem(3, "Settlement Received", "Your settlement for last week was successfully completed.", true),
        new NotificationItem(4, "Settlement Received", "Your settlement for last week was successfully completed.", true),
        new NotificationItem(5, "Settlement Received", "Your settlement for last week was successfully completed.", true),
        new NotificationItem(6, "Settlement Received", "Your settlement for last week was successfully completed.", true),
        new NotificationItem(7, "Settlement Received", "Your settlement for last week was successfully completed.", true),
        new NotificationItem(8, "Settlement Received", "Your settlement for last week was successfully completed.", true),
        new NotificationItem(9, "Settlement Received", "Your settlement for last week was successfully completed.", true),
    ])

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener("resize", () => collapseSidebar(window.innerWidth <= 1200));
            return () => window.removeEventListener("resize", () => collapseSidebar(window.innerWidth <= 1200))
        }
    }, []);

    if (loggedOut) { Router.push("/login"); }

    return (
        <>
            <Head>
                <title>Dashboard | Odero</title>
                <meta name="description" content="Dashboard page where you can view and manage your business." />
                <meta name="keywords" content="Odero, odero.az, Odero.az, Payments, Visa, visa, Credit, credit, Debit, debit, Mastercard, mastercard, Amex, amex, pay by link, link" />
                <link rel="icon" href="/odero.ico" />
            </Head>
            {loading && <LoadingIndicatorPage />}
            {
                user && !loggedOut &&
                <main className={styles.main}>
                    <div className={`${styles.leftContainer} ${sidebarCollapsed ? styles.collapse : ''}`}>
                        <div className={styles.desktop}>
                            <Sidebar user={user} collapsed={sidebarCollapsed} collapse={collapseSidebar} />
                        </div>
                        <div className={styles.mobile}>
                            <SidebarMobile />
                        </div>
                    </div>
                    <div className={styles.rightContainer}>
                        <NavigationBarDashboard onNotificationsClick={setNotificationsVisible} />
                        <div className={styles.pageContent}>
                            <GetStarted phone={user.phone} />
                        </div>
                    </div>
                    {
                        areNotificationslVisible &&
                        <NotificationsDialog notifications={notificationsList} onClick={setNotificationsVisible} updateNotifications={setNotificationsList} />
                    }
                </main>
            }
        </>
    )
}

export default Dashboard

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["languages", "otp", "alert-dialog", "validators"]))
        },
    };
}