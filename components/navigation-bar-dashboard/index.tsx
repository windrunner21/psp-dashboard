import styles from "../navigation-bar-dashboard/NavigationBar.module.css"
import LanguageSelect from "../language-select"
import Notifications from "../notifications"
import Search from "../search"
import NavigationBarDashboardProps from "./interface"
import React, { useEffect, useState } from "react"
import DashboardEnvironment from "../dashboard-environment"
import Select from "../select"
import Button from "../button"

const NavigationBarDashboard = (props: NavigationBarDashboardProps) => {
    const [unread, setUnread] = React.useState(true)

    const [business, setBusiness] = React.useState(1)
    const [businessOptions, setBusinessOptions] = useState<string[]>([])

    useEffect(() => {
        const newBusinessOptions: string[] = ['-']

        props.businesses.forEach((business) => {
            newBusinessOptions.push(business.name)
        })

        setBusinessOptions(newBusinessOptions)
    }, [props.businesses])

    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                <div className={styles.searchBar}>
                    <div className={styles.leading}>
                        <div style={{ width: '50%' }}>
                            <Select optionsList={businessOptions} setValue={setBusiness} value={business} />
                        </div>
                        <Button
                            label="Add new business"
                            backgroundColor="var(--info-primary)"
                            color="white"
                            borderRadius="0.3rem"
                            padding="0.6rem 1rem"
                        />
                    </div>
                </div>
                <div className={styles.trailing}>
                    <DashboardEnvironment />
                    <LanguageSelect />
                    <Notifications unread={unread} onClick={() => {
                        setUnread(false)
                        props.onNotificationsClick(true)
                    }} />
                </div>
            </div>
        </div>
    )
}

export default NavigationBarDashboard