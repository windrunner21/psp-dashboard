import Image from "next/image"
import Link from "next/link"
import React from "react"
import AlertDialog from "../alert-dialog"
import AlertType from "../alert-dialog/AlertType"
import styles from "../get-started-dashboard/GetStarted.module.css"
import { OneTimePasswordModal } from "../one-time-password"
import PrimaryButton from "../primary-button"
import PrimaryLink from "../primary-link"
import GetStartedProps from "./interface"
import alertStyles from "../alert-dialog/AlertDialog.module.css"
import StepIndicators from "../step-indicators"

const GetStarted = (props: GetStartedProps) => {

    const [isModalVisible, setModalVisible] = React.useState(false)
    const [isAlertVisible, setAlertVisible] = React.useState(false)
    const [alertTitle, setAlertTitle] = React.useState("")
    const [alertDescription, setAlertDescription] = React.useState("")
    const [alertType, setAlertType] = React.useState(AlertType.UNKNOWN)
    const [alertStyle, setAlertStyle] = React.useState(alertStyles.error)

    // TODO: refactor and improve
    const currentStep: any = {
        "Legal Entity": { completed: 0, previous: "initial" },
        "Legal Information": { completed: 1, previous: "Legal Entity" },
        "Business Information": { completed: 2, previous: "Legal Information" },
        "Billing Information": { completed: 3, previous: "Business Information" },
        "Documents Upload": { completed: 4, previous: "Billing Information" },
        "Completed": { completed: 5, previous: "Documents Upload" },
    }

    return (
        <div className={styles.main}>
            {isAlertVisible &&
                <AlertDialog
                    delay={2000}
                    title={alertTitle}
                    description={alertDescription}
                    type={alertType}
                    onClick={() => setAlertVisible(false)} style={undefined} />
            }
            {
                isModalVisible &&
                <OneTimePasswordModal
                    setAlertType={setAlertType}
                    setAlertTitle={setAlertTitle}
                    setAlertDescription={setAlertDescription}
                    showAlert={setAlertVisible}
                    setAlertStyle={setAlertStyle}
                    phoneNumber={props.phone}
                    onClick={() => setModalVisible(false)}
                />
            }
            <div className={styles.section1}>
                {
                    props.step ?
                        (
                            props.step == 'Completed' ?
                                <div className={styles.column}>
                                    <span className={styles.title}>Congratulations!</span>
                                    <span className={styles.description}>
                                        You have successfully submitted your onboard application. Our team will review it and get back to you as soon as possible via your work email or a phone call.<br /><br />Meanwhile, you can track your application status below.
                                    </span>
                                    <span className={styles.onboardStatus}>{props.status}</span>
                                </div>
                                :
                                <div className={styles.column}>
                                    <span className={styles.title}>Continue your onboard procedure</span>
                                    <span className={styles.description}>
                                        You have just completed the <b>{currentStep[props.step].previous}</b> step. Next please fill out <b>{props.step}</b> step.
                                        <br />Only {5 - (currentStep[props.step].completed)} more steps to reach the goal and activate your account.
                                    </span>
                                    <div style={{ width: '50%', marginTop: "1rem" }}>
                                        <StepIndicators totalSteps={5} step={currentStep[props.step].completed - 1} completedStep={currentStep[props.step].completed - 1} position='fixed' type='circle' />
                                    </div>
                                    <div style={{ width: "20%" }}>
                                        <Link href="/onboard">
                                            <div>
                                                <PrimaryButton title="Continue onboard" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                        )
                        :
                        <div className={styles.column}>
                            <span className={styles.title}>Activate your account and start receiving payments</span>
                            <span className={styles.description}>Pass the onboard procedure and fill out your business profile to start accepting payments. Any progress you make during the onboard procedure will be saved, so you can always finish later.</span>
                            <div style={{ width: "20%" }}>
                                <Link href="/onboard">
                                    <div>
                                        <PrimaryButton title="Activate Account" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                }
                <div className={styles.pattern}>
                    <div style={{ width: '100px', height: '100%', position: 'relative' }}>
                        <Image src={"/odero-pattern.svg"} alt="Odero Pattern" layout='fill' />
                    </div>
                </div>
            </div>
            <div className={styles.section2}>
                <span className={styles.title}>Get started with Odero</span>
                <div className={styles.row}>
                    <div className={styles.column} style={{ width: "25%" }}>
                        <span className={styles.subtitle}>Create payment link</span>
                        <span className={styles.subdescription}>Start accepting payments with no setup and zero code.</span>
                        <div style={{ height: "100%" }}>
                            <Image src={"/pay-by-link.png"} alt="pay by link" width={239} height={200} />
                        </div>
                    </div>
                    <div className={styles.column} style={{ width: "25%" }}>
                        <span className={styles.subtitle}>Don&apos;t have a website?</span>
                        <span className={styles.subdescription}>Create your own custom website with payment system at <PrimaryLink href="https://odero.shop" label="odero.shop" /></span>
                        <Image src={"/odero-shop.png"} alt="pay by link" width={322} height={200} />
                    </div>
                    <div className={styles.column} style={{ width: "25%" }}>
                        <span className={styles.subtitle}>Have a website or an app</span>
                        <span className={styles.subdescription}>Integrate Odero into your website or application using Odero API</span>
                        <div className={styles.rowStart}>
                            <picture>
                                <source srcSet="/mui-icons/terminal-dark.svg" media="(prefers-color-scheme: dark)" />
                                <img src="/mui-icons/terminal.svg" alt="For developers" width={18} height={18} />
                            </picture>
                            <div style={{ width: "0.5rem" }} />
                            <span className={styles.developers}>For developers:</span>
                        </div>
                        <div />

                        <div className={styles.rowCenter}>
                            <span className={styles.api}>API Key</span>
                            <input className={styles.key} value={"d02481e67e27dea59b47ccb6a4be0629e45ef99031d2b6008551700fb9b060c5"} disabled type={'password'} />
                            <div style={{ width: "0.5rem" }} />
                            <div className={styles.copy} onClick={() => setModalVisible(true)}>
                                <picture>
                                    <source srcSet="/mui-icons/copy-dark.svg" media="(prefers-color-scheme: dark)" />
                                    <img src="/mui-icons/copy.svg" alt="For developers" width={16} height={16} />
                                </picture>
                            </div>
                        </div>
                        <PrimaryLink label="View docs" />
                    </div>
                </div>
            </div>
            <div className={styles.section3}>
                <span className={styles.caption}>Not sure where to start?</span>
                <span className={styles.contactUs}>Contact us and we will personally help you set up your Odero account</span>
                <div className={styles.rowStart}>
                    <picture>
                        <source srcSet="/mui-icons/call-dark.svg" media="(prefers-color-scheme: dark)" />
                        <img src="/mui-icons/call.svg" alt="For developers" width={16} height={16} />
                    </picture>
                    <div style={{ width: "0.5rem" }} />
                    <span className={styles.contactNumber}>+994 (12) 310 57 10</span>
                </div>


            </div>
        </div>
    )
}

export default GetStarted
