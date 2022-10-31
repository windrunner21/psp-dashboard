import { NextPage } from "next";
import Head from "next/head";
import Image from 'next/image'
import React from "react";
import AlertDialog from "../components/alert-dialog";
import AlertType from "../components/alert-dialog/AlertType";
import NavigationBar from "../components/navigation-bar";
import OnboardChoice from "../components/onboard-choice";
import SecondaryBack from "../components/secondary-back";
import SecondaryNext from "../components/secondary-next";
import Select from "../components/select";
import StepIndicators from "../components/step-indicators";
import TextField from "../components/text-field";
import UploadField from "../components/upload-field";
import styles from "../styles/Onboard.module.css"

enum UserType {
    CONTRACTOR,
    COMPANY,
    UNKNOWN
}

const Onboard: NextPage = () => {
    const [isAlertVisible, setAlertVisible] = React.useState(false)
    const [alertTitle, setAlertTitle] = React.useState("")
    const [alertDescription, setAlertDescription] = React.useState("")
    const [alertType, setAlertType] = React.useState(AlertType.UNKNOWN)
    const [step, setStep] = React.useState(0)
    const [userType, setUserType] = React.useState(UserType.UNKNOWN)

    const initialChoices = [
        {
            type: UserType.CONTRACTOR,
            image: "user",
            label: "You are a freelance or independent contractor"
        },
        {
            type: UserType.COMPANY,
            image: "company",
            label: "You have a company"
        }
    ]

    function checkForErrorsAndProceed() {
        if (false) {
            setAlertType(AlertType.ERROR);
            setAlertTitle("Something went wrong!")
            setAlertDescription("We've encountered some unexpected error.")
            setAlertVisible(true)
        } else {
            setAlertType(AlertType.SUCCESS);
            setAlertTitle("Onboard Completed!")
            setAlertDescription("You've successfully submitted your information.")
            setAlertVisible(true)
        }
    }

    return (
        <>
            <Head>
                <title>Onboard | Odero</title>
                <meta
                    name="onboard"
                    content="Merchant Onboard for Odero.az. Finish registration, sign a contract and get access to payment methods."
                />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.leftContainer}>
                    <NavigationBar />
                    <div className={styles.form}>
                        {isAlertVisible &&
                            <AlertDialog
                                title={alertTitle}
                                description={alertDescription}
                                type={alertType}
                                onClick={() => setAlertVisible(false)}
                            />
                        }
                        <>
                            {step == 0 &&
                                <div className={styles.subform}>
                                    <h1 style={{ marginBottom: "2rem" }}>Tell us about your situation</h1>
                                    {
                                        initialChoices.map((initialChoice, index) => (
                                            <OnboardChoice key={index} image={initialChoice.image} title={initialChoice.label} onClick={() => {
                                                if (index == 0) {
                                                    setUserType(UserType.CONTRACTOR)
                                                    setStep(1)
                                                } else if (index == 1) {
                                                    setUserType(UserType.COMPANY)
                                                    setStep(1)
                                                }
                                            }} />
                                        ))
                                    }
                                </div>
                            }
                        </>

                        <>
                            {step == 1 &&
                                <div className={styles.subform}>
                                    <h1 style={{ marginBottom: "2rem" }}>Tell us about yourself</h1>
                                    <div className={styles.row}>
                                        <TextField label="Name" placeholder="Your name" autofocus={true} />
                                        <div style={{ width: "1rem" }} />
                                        <TextField label="Surname" placeholder="Your surname" />
                                    </div>
                                    <TextField label="Work email" type="email" placeholder="Enter your work email" validatorLabel="Invalid email address" />
                                    <TextField label="Phone number" placeholder="+994 (XX) XXX XX XX" validatorLabel="Invalid phone number" />
                                    <div className={`${styles.row} ${styles.pagination}`}>
                                        <SecondaryBack onClick={() => {
                                            const stepWillSet = step - 1;
                                            setStep(stepWillSet)
                                        }} />
                                        <div style={{ width: "1rem" }} />
                                        <SecondaryNext onClick={() => {
                                            const stepWillSet = step + 1;
                                            setStep(stepWillSet)
                                        }} />
                                    </div>
                                </div>

                            }
                        </>

                        <>
                            {step == 2 &&
                                <div className={styles.subform}>
                                    <h1 style={{ marginBottom: "2rem" }}>Tell us about your business</h1>
                                    <Select label="Business Type" />
                                    <Select label="Form of Operation" />
                                    <TextField label="Name of your Business" placeholder="Enter your business/company name" autofocus={true} />
                                    {/* <TextField label="Contact number for your Business" placeholder="Enter your business/company mobile or phone number" /> */}
                                    <TextField label="Tax Number" placeholder="Enter your business/company tax number" />
                                    <TextField label="IBAN" placeholder="Enter your business/company bank account number" />
                                    <div className={`${styles.row} ${styles.pagination}`}>
                                        <SecondaryBack onClick={() => {
                                            const stepWillSet = step - 1;
                                            setStep(stepWillSet)
                                        }} />
                                        <div style={{ width: "1rem" }} />
                                        <SecondaryNext onClick={() => {
                                            const stepWillSet = step + 1;
                                            setStep(stepWillSet)
                                        }} />
                                    </div>
                                </div>
                            }
                        </>

                        <>
                            {step == 3 &&
                                <div className={styles.subform}>
                                    <h1 style={{ marginBottom: "2rem" }}>Provide us with contact information for your business</h1>
                                    <Select label="City" />
                                    <Select label="District" />
                                    <TextField label="Contact number for your Business" placeholder="Enter your business/company mobile or phone number" autofocus={true} />
                                    <TextField label="Website" placeholder="Does your business have a website? Enter it!" />
                                    <div className={`${styles.row} ${styles.pagination}`}>
                                        <SecondaryBack onClick={() => {
                                            const stepWillSet = step - 1;
                                            setStep(stepWillSet)
                                        }} />
                                        <div style={{ width: "1rem" }} />
                                        <SecondaryNext onClick={() => {
                                            const stepWillSet = step + 1;
                                            setStep(stepWillSet)
                                        }} />
                                    </div>
                                </div>
                            }
                        </>

                        <>
                            {step == 4 &&
                                <div className={styles.subform}>
                                    <h1 style={{ marginBottom: "2rem" }}>One last important step. Documents!</h1>
                                    {userType == UserType.COMPANY && <UploadField label="Ordering from the State Register" />}
                                    <UploadField label="Tax Number" />
                                    <UploadField label="ID Card" />
                                    <UploadField label="Bank Requisites" />
                                    <UploadField label="Optional Documents #1" />
                                    <UploadField label="Optional Documents #2" />
                                    <div className={`${styles.row} ${styles.pagination}`}>
                                        <SecondaryBack onClick={() => {
                                            const stepWillSet = step - 1;
                                            setStep(stepWillSet)
                                        }} />
                                        <div style={{ width: "1rem" }} />
                                        <SecondaryNext onClick={() => {
                                            checkForErrorsAndProceed()
                                        }} />
                                    </div>
                                </div>
                            }
                        </>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    {step == 0 &&
                        <div className={styles.subform}>
                            <Image src="/onboard/step0.svg" alt="Onboard Choice Logo" width={200} height={200} priority />
                            <h3>Welcome to Odero Onboard Procedure.</h3>
                            <p className={styles.description}>We need an information about your business in order for us to prepare your contract. Please have your business and personal documents ready and nearby.</p>
                        </div>
                    }
                    {step == 1 &&
                        <div className={styles.subform}>
                            <Image src="/onboard/step1.svg" alt="Onboard Choice Logo" width={200} height={200} />
                            <h3>Are you the legal representative?</h3>
                            <p className={styles.description}>If so, please provide your contact information at which we can reach you anytime 24/7. Remember, this information will be used to represent your party in the contract.</p>
                        </div>
                    }
                    {step == 2 &&
                        <div className={styles.subform}>
                            <Image src="/onboard/step2.svg" alt="Onboard Choice Logo" width={200} height={200} />
                            <h3>Have questions? We are here for you.</h3>
                            <p className={styles.description}>How do I know which form of operations corresponds to my business? If you have merchants who sell their products on your website, then you are a MARKETPLACE.</p>
                            <p className={styles.description}>Popular examples: Amazon, Trendyol, Umico.</p>
                        </div>
                    }
                    {step == 3 &&
                        <div className={styles.subform}>
                            <Image src="/onboard/step3.svg" alt="Onboard Choice Logo" width={200} height={200} />
                            <h3>What if I don't have a website?</h3>
                            <p className={styles.description}>No worries at all! If you sell your product via social media, you can pass a link to your social media accounts.</p>
                        </div>
                    }
                    {step == 4 &&
                        <div className={styles.subform}>
                            <Image src="/onboard/step4.svg" alt="Onboard Choice Logo" width={200} height={200} />
                            <h3>Document upload rules!</h3>
                            <div style={{ textAlign: "justify" }}>
                                <p className={styles.description}>&#x2022; All documents must be in pdf format.</p>
                                <p className={styles.description}>&#x2022; If you have old-gen ID card, scan the back side and upload it via optional documents.</p>
                                <p className={styles.description}>&#x2022; License for tabacoo, drugs or alcohol products MUST be uploaded. Again use optional documents.</p>
                                <p className={styles.description}>&#x2022; Optional documents can be omitted, if you do not require them.</p>

                            </div>
                        </div>
                    }
                    <StepIndicators totalSteps={5} step={step} />
                </div>
            </main>
        </>
    )
}

export default Onboard