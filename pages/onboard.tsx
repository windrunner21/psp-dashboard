import { NextPage } from "next";
import Head from "next/head";
import Image from 'next/image'
import React from "react";
import NavigationBar from "../components/navigation-bar";
import OnboardChoice from "../components/onboard-choice";
import SecondaryBack from "../components/secondary-back";
import SecondaryNext from "../components/secondary-next";
import Select from "../components/select";
import StepIndicators from "../components/step-indicators";
import TextField from "../components/text-field";
import UploadField from "../components/upload-field";
import styles from "../styles/Onboard.module.css"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

enum UserType {
    CONTRACTOR,
    COMPANY,
    UNKNOWN
}

const Onboard: NextPage = () => {
    const [step, setStep] = React.useState(0)
    const [userType, setUserType] = React.useState(UserType.UNKNOWN)
    const [name, setName] = React.useState("")
    const [surname, setSurname] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [city, setCity] = React.useState(-1)

    const initialChoices = [
        {
            type: UserType.CONTRACTOR,
            vat: true,
            image: "user",
            label: "You are a freelance or independent contractor (VAT payer)"
        },
        {
            type: UserType.CONTRACTOR,
            vat: false,
            image: "user",
            label: "You are a freelance or independent contractor (Non VAT payer)"
        },
        {
            type: UserType.COMPANY,
            vat: true,
            image: "company",
            label: "You have a company (VAT payer)"
        },
        {
            type: UserType.COMPANY,
            vat: false,
            image: "company",
            label: "You have a company (Non VAT payer)"
        },
    ]

    const businessTypeOptions = [
        "Limited Liability Company",
        "Open Joint-Stock Company",
        "Closed Joint-Stock Company"
    ]

    const formOfOperationOptions = [
        "Standart",
        "Marketplace"
    ]

    const cityOptions = [
        "Baku",
        "Ganja"
    ]

    const districtOptions = [
        "Binəqədi",
        "Khazar",
        "Nərimanov",
        "Nəsimi",
        "Nizami",
        "Pirallahı",
        "Qaradağ",
        "Sabail",
        "Sabunçu",
        "Suraxanı",
        "Xətai",
        "Yasamal"
    ]

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
                                                    setUserType(UserType.CONTRACTOR)
                                                    setStep(1)
                                                } else if (index == 2) {
                                                    setUserType(UserType.COMPANY)
                                                    setStep(1)
                                                } else if (index == 3) {
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
                                <div className={styles.subform} >
                                    <h1 style={{ marginBottom: "2rem" }}>Tell us about yourself</h1>
                                    <div className={styles.row}>
                                        <TextField
                                            label="Name"
                                            placeholder="Your name"
                                            validatorLabel="Invalid name"
                                            validateAgainst="name"
                                            autofocus={name == "" ? true : false}
                                            capitalized={true}
                                            value={name}
                                            setValue={setName}
                                        />
                                        <div style={{ width: "1rem" }} />
                                        <TextField
                                            label="Surname"
                                            placeholder="Your surname"
                                            validatorLabel="Invalid surname"
                                            validateAgainst="name"
                                            capitalized={true}
                                            value={surname}
                                            setValue={setSurname}
                                        />
                                    </div>
                                    <TextField
                                        label="Work email"
                                        type="email"
                                        placeholder="Enter your work email"
                                        validatorLabel="Invalid email address"
                                        validateAgainst="email"
                                        value={email}
                                        setValue={setEmail}
                                    />
                                    <TextField
                                        label="Phone number"
                                        type="tel"
                                        placeholder="+994 (XX) XXX XX XX"
                                        pattern="+### (##) ### ## ##"
                                        validateAgainst="phoneNumber"
                                        value={phoneNumber}
                                        setValue={setPhoneNumber}
                                    />
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
                                    {userType == UserType.COMPANY && <Select label="Business Type" optionsList={businessTypeOptions} />}
                                    <Select label="Form of Operation" optionsList={formOfOperationOptions} />
                                    <TextField
                                        label="Name of your Business"
                                        placeholder="Enter your business/company name"
                                        autofocus={true}
                                        capitalized={true}
                                    />
                                    <TextField
                                        label="Tax Number"
                                        placeholder="Enter your business/company tax number"
                                        validatorLabel="Invalid tax number"
                                        validateAgainst="voen"
                                        max={10}
                                    />
                                    <TextField
                                        label="IBAN"
                                        placeholder="AZDD CCCC DDDD DDDD DDDD DDDD DDDD"
                                        pattern="#### #### #### #### #### #### ####"
                                        validateAgainst="iban"
                                    />
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
                                    <Select label="City" optionsList={cityOptions} onClick={setCity} />
                                    {city == 0 && <Select label="District" optionsList={districtOptions} />}
                                    <TextField
                                        label="Contact number for your Business"
                                        placeholder="Enter your business/company mobile or phone number"
                                        pattern="+### (##) ### ## ##"
                                        validateAgainst="phoneNumber"
                                        autofocus={true}
                                    />
                                    <TextField
                                        label="Website"
                                        placeholder="Does your business have a website? Enter it!"
                                        validatorLabel="Invalid format. Don't forget to include https://"
                                        validateAgainst="website"
                                    />
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
                                    {userType == UserType.COMPANY && <UploadField id="stateregister" label="Ordering from the State Register" validatorLabel="Ordering upload failed" />}
                                    <UploadField id="taxnumber" label="Tax Number" validatorLabel="Tax number upload failed" />
                                    <UploadField id="idcard" label="ID Card" validatorLabel="ID card upload failed" />
                                    <UploadField id="bankrequisites" label="Bank Requisites" validatorLabel="Bank requisites upload failed" />
                                    <UploadField id="optional#1" label="Optional Documents #1" validatorLabel="First optional documents upload failed" />
                                    <UploadField id="optional#2" label="Optional Documents #2" validatorLabel="Second optional documents upload failed" />
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
                            {step == 5 &&
                                <div className={styles.subform}>
                                    <h1 style={{ marginBottom: "1rem" }}>Thanks for your time!</h1>
                                    <h1 style={{ marginBottom: "2rem" }}>And congratulations, we have successfully received your onboard application ✅</h1>
                                    <p>What's next? We will send you the contract soon, if everything is in order.</p>
                                    <p>You can always see the status of your application from here 👉</p>
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
                            <h4>What's a VAT?</h4>
                            <p className={styles.description} style={{ fontSize: "0.9rem" }}>VAT Payer* - Value Added Tax Payer. VAT payer is a taxable person registered by the tax authority office as obliged to pay VAT.</p>
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
                    {step < 5 && <StepIndicators totalSteps={5} step={step} />}
                    {step == 5 &&
                        <div>
                            <Image src="/onboard/step5.svg" alt="Onboard Choice Logo" width={300} height={300} />
                            <h3>Your application status is</h3>
                            <h1 style={{ color: "var(--success-primary)" }}>APPLIED</h1>
                        </div>
                    }
                </div>
            </main>
        </>
    )
}

export default Onboard

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["onboard", "languages"])),
        },
    };
}