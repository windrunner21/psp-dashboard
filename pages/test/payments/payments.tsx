import { NextPage } from "next";
import Head from "next/head";
import styles from "../../../styles/Dashboard.module.css"
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// custom components
import NotificationItem from "../../../components/notifications-dialog/notifications-item/NotificationItem";
import Sidebar from "../../../components/sidebar";
import SidebarMobile from "../../../components/sidebar-mobile";
import NavigationBarDashboard from "../../../components/navigation-bar-dashboard";
import NotificationsDialog from "../../../components/notifications-dialog";
import { usePayments, useUser } from "../../../controllers/swr";
import Router from "next/router";
import LoadingIndicatorPage from "../../../components/loading-indicator-page";
import PaymentPage from "../../../components/sub-pages/payments";
import { formatDate } from "../../../controllers/auxiliary";
import { CurrencySign } from "../../../controllers/enums/currency";
import Button from "../../../components/button";

const Payments: NextPage = () => {
    const { user, loading, loggedOut } = useUser();
    const { payments, loadingPayments } = usePayments();

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

    if (loggedOut) { Router.push("/login"); }

    const tableHeaders = [
        'Date',
        'Reference ID',
        'Card',
        'Price',
        'Products',
        'Actions'
    ]

    const dimensions = [
        '200px',
        '200px',
        '200px',
        '100px',
        '50px',
        '50px'
    ]

    let newPaymentData: { data: any }[] = []

    if (payments) {
        payments.forEach((element: any) => {
            newPaymentData.push({
                data: {
                    date: formatDate(element.date),
                    referenceId: element.referenceId,
                    last4: `**** **** **** ${element.last4}`,
                    price: `${element.price} ${CurrencySign[element.currency as keyof typeof CurrencySign]}`,
                    items:
                        <Button
                            label="Details"
                            backgroundColor="transparent"
                            color="var(--info-primary)"
                            borderRadius="0.3rem"
                            padding="0"
                        />,
                    actions:
                        <Button
                            backgroundColor="#E1E1E1"
                            color="var(--info-primary)"
                            borderRadius="0.3rem"
                            padding="0.5rem"
                            icon="more-horizontal"
                        />
                }
            })
        })
    }

    return (
        <>
            <Head>
                <title>Dashboard | Odero</title>
                <meta name="home" content="Dashboard page where you can view and manage your business." />
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
                        <NavigationBarDashboard onNotificationsClick={setNotificationsVisible} businesses={user.businesses} />
                        <PaymentPage
                            title={"Successful Payments"}
                            loadingData={loadingPayments}
                            data={payments}
                            tableHeaders={tableHeaders}
                            tableData={newPaymentData}
                            tableDimensions={dimensions}
                        />
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

export default Payments

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["languages"]))
        },
    };
}