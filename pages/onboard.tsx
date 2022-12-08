import { NextPage } from "next";
import styles from "../styles/Onboard.module.css"
import Head from "next/head";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';

// custom components
import NavigationBarOnboard from "../components/navigation-bar-onboard";
import OnboardChoice from "../components/onboard-choice";
import SecondaryBack from "../components/secondary-back";
import SecondaryNext from "../components/secondary-next";
import Select from "../components/select";
import StepIndicators from "../components/step-indicators";
import TextField from "../components/text-field";
import UploadField from "../components/upload-field";
import PhoneNumberField from "../components/phone-number-field";

enum UserType {
    CONTRACTOR,
    COMPANY,
    UNKNOWN
}

const Onboard: NextPage = () => {
    const [user, setUser] = React.useState("Imran Hajiyev")
    const { t } = useTranslation(['onboard', 'common']);
    const title = `${t('title')} | Odero`;

    // data
    const [step, setStep] = React.useState(0)
    const [userType, setUserType] = React.useState(UserType.UNKNOWN)
    const [paysVat, setPaysVat] = React.useState(undefined)
    const [name, setName] = React.useState("")
    const [surname, setSurname] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [phoneNumber, setPhoneNumber] = React.useState("")

    // validators
    const [nameCorrect, setNameCorrect] = React.useState(false)
    const [surnameCorrect, setSurnameCorrect] = React.useState(false)
    const [phoneNumberCorrect, setPhoneNumberCorrect] = React.useState(false)

    const initialChoices = [
        {
            image: "user",
            label: t('step0.main.option1')
        },
        {
            image: "company",
            label: t('step0.main.option2')
        },
    ]

    const businessVatOptions = [
        'Please select your VAT option...',
        'Yes',
        'No'
    ]

    const businessTypeOptions = [
        'Please select your business type...',
        t('common:llc'),
        t('common:ojsc'),
        t('common:cjsc'),
    ]

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="onboard"
                    content="Merchant Onboard for Odero.az. Finish registration, sign a contract and get access to payment methods."
                />
                <link rel="icon" href="/odero.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.leftContainer}>
                    <NavigationBarOnboard user={user} />
                    <div className={styles.form}>
                        <>
                            {step == 0 &&
                                <div className={styles.subform}>
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step0.main.title')}</h1>
                                    {
                                        initialChoices.map((initialChoice, index) => (
                                            <OnboardChoice key={index} image={initialChoice.image} title={initialChoice.label} onClick={() => {
                                                if (index == 0) {
                                                    setUserType(UserType.CONTRACTOR)
                                                } else if (index == 1) {
                                                    setUserType(UserType.COMPANY)
                                                }
                                                const stepWillSet = step + 1;
                                                setStep(stepWillSet)
                                            }} />
                                        ))
                                    }
                                </div>
                            }
                        </>

                        <>
                            {step == 1 &&
                                <div className={styles.subform} >
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step1.main.title')}</h1>
                                    <div className={styles.row}>
                                        <TextField
                                            label={t('common:name')}
                                            placeholder={t('common:namePrompt')}
                                            validatorLabel="Invalid name"
                                            validateAgainst="name"
                                            validatorCallback={setNameCorrect}
                                            autofocus={name == "" ? true : false}
                                            capitalized={true}
                                            value={name}
                                            setValue={setName}
                                        />
                                        <div style={{ width: "1rem" }} />
                                        <TextField
                                            label={t('common:surname')}
                                            placeholder={t('common:surnamePrompt')}
                                            validatorLabel="Invalid surname"
                                            validateAgainst="name"
                                            validatorCallback={setSurnameCorrect}
                                            capitalized={true}
                                            value={surname}
                                            setValue={setSurname}
                                        />
                                    </div>
                                    <TextField
                                        label={t('common:workEmail')}
                                        type="email"
                                        placeholder={t('common:workEmailPrompt')}
                                        validatorLabel="Invalid email address"
                                        validateAgainst="email"
                                        value={email}
                                        setValue={setEmail}
                                    />
                                    <PhoneNumberField
                                        type="tel"
                                        label={t('common:phoneNumber')}
                                        placeholder={t('common:phoneNumberPrompt')}
                                        value={phoneNumber}
                                        setValue={setPhoneNumber}
                                        validateNumber={setPhoneNumberCorrect}
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
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step2.main.title')}</h1>
                                    {
                                        userType == UserType.COMPANY &&
                                        <Select label={t('common:businessType')} optionsList={businessTypeOptions} />
                                    }
                                    <Select label={'Do you pay VAT?'} optionsList={businessVatOptions} />
                                    <TextField
                                        label={t('common:businessName')}
                                        placeholder={t('common:businessNamePrompt')}
                                        autofocus={true}
                                        capitalized={true}
                                    />
                                    <TextField
                                        label={t('common:taxNumber')}
                                        placeholder={t('common:taxNumberPrompt')}
                                        validatorLabel="Invalid tax number"
                                        validateAgainst="voen"
                                        max={10}
                                    />
                                    <TextField
                                        label={t('common:iban')}
                                        placeholder="Enter your IBAN"
                                        validateAgainst="iban"
                                        max={34}
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
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step3.main.title')}</h1>
                                    <TextField
                                        label="Address"
                                        placeholder="Enter your address line"
                                        autofocus={true}
                                    />
                                    <TextField
                                        placeholder="Address line 2 (Optional)"
                                    />
                                    <div className={styles.row}>
                                        <TextField
                                            label="City"
                                            placeholder="Enter your city"
                                        />
                                        <div style={{ width: "1rem" }} />
                                        <TextField
                                            label="Postal Code"
                                            placeholder="Enter your postal code"
                                        />
                                    </div>
                                    <PhoneNumberField
                                        type="tel"
                                        label={t('common:phoneNumber')}
                                        placeholder={t('common:phoneNumberPrompt')}
                                        value={phoneNumber}
                                        setValue={setPhoneNumber}
                                        validateNumber={setPhoneNumberCorrect}
                                    />
                                    <TextField
                                        label={t('common:website')}
                                        placeholder={t('common:websitePrompt')}
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
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step4.main.title')}</h1>
                                    {userType == UserType.COMPANY && <UploadField id="stateregister" label={t('common:ordering')} validatorLabel="Ordering upload failed" />}
                                    <UploadField
                                        id="taxnumber"
                                        label={t('common:taxNumber')}
                                        validatorLabel="Tax number upload failed"
                                    />
                                    <UploadField
                                        id="idcard"
                                        label={t('common:idcard')}
                                        validatorLabel="ID card upload failed"
                                    />
                                    <UploadField
                                        id="bankrequisites"
                                        label={t('common:bankRequisites')}
                                        validatorLabel="Bank requisites upload failed"
                                    />
                                    {/* <UploadField
                                        id="optional#1"
                                        label={t('common:optional1')}
                                        validatorLabel="First optional documents upload failed"
                                    />
                                    <UploadField
                                        id="optional#2"
                                        label={t('common:optional2')}
                                        validatorLabel="Second optional documents upload failed"
                                    /> */}
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
                                    <h1 style={{ marginBottom: "1rem" }}>{t('step5.main.title')}</h1>
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step5.main.title2')}</h1>
                                    <p>{t('step5.main.subtitle')}</p>
                                    <p>{t('step5.main.subtitle2')}</p>
                                </div>
                            }
                        </>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    {step == 0 &&
                        <div className={styles.subform}>
                            <h3>{t('step0.help.title')}</h3>
                            <p className={styles.description}>{t('step0.help.subtitle')}</p>
                        </div>
                    }
                    {step == 1 &&
                        <div className={styles.subform}>
                            <h3>{t('step1.help.title')}</h3>
                            <p className={styles.description}>{t('step1.help.subtitle')}</p>
                        </div>
                    }
                    {step == 2 &&
                        <div className={styles.subform}>
                            <h3>{t('step2.help.title')}</h3>
                            <p className={styles.description}>{t('step2.help.subtitle')}</p>
                        </div>
                    }
                    {step == 3 &&
                        <div className={styles.subform}>
                            <h3>{t('step3.help.title')}</h3>
                            <p className={styles.description}>{t('step3.help.subtitle')}</p>
                        </div>
                    }
                    {step == 4 &&
                        <div className={styles.subform}>
                            <h3>{t('step4.help.title')}</h3>
                            <div style={{ textAlign: "justify" }}>
                                <p className={styles.description}>&#x2022; {t('step4.help.option1')}</p>
                                <p className={styles.description}>&#x2022; {t('step4.help.option2')}</p>
                                <p className={styles.description}>&#x2022; {t('step4.help.option3')}</p>
                            </div>
                        </div>
                    }
                    {step < 5 && <StepIndicators totalSteps={5} step={step} />}
                    {step == 5 &&
                        <div>
                            <h3>{t('step5.help.title')}</h3>
                            <h1 style={{ color: "var(--success-primary)", textTransform: "uppercase" }}>{t('common:applied')}</h1>
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
            ...(await serverSideTranslations(locale, ["onboard", "languages", "common"]))
        },
    };
}