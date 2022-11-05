import { NextPage } from "next";
import styles from "../styles/Onboard.module.css"
import Head from "next/head";
import Image from 'next/image'
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

enum UserType {
    CONTRACTOR,
    COMPANY,
    UNKNOWN
}

const Onboard: NextPage = () => {
    const [user, setUser] = React.useState("Imran Hajiyev")
    const { t } = useTranslation(['onboard', 'common']);
    const title = `${t('title')} | Odero`;

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
            label: t('step0.main.option1')
        },
        {
            type: UserType.CONTRACTOR,
            vat: false,
            image: "user",
            label: t('step0.main.option1')
        },
        {
            type: UserType.COMPANY,
            vat: true,
            image: "company",
            label: t('step0.main.option1')
        },
        {
            type: UserType.COMPANY,
            vat: false,
            image: "company",
            label: t('step0.main.option1')
        },
    ]

    const businessTypeOptions = [
        t('common:llc'),
        t('common:ojsc'),
        t('common:cjsc'),
    ]

    const formOfOperationOptions = [
        t('common:standart'),
        t('common:marketplace'),
    ]

    const cityOptions = [
        "Bakı",
        "Gəncə"
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
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step1.main.title')}</h1>
                                    <div className={styles.row}>
                                        <TextField
                                            label={t('common:name')}
                                            placeholder={t('common:namePrompt')}
                                            validatorLabel="Invalid name"
                                            validateAgainst="name"
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
                                    <TextField
                                        label={t('common:phoneNumber')}
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
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step2.main.title')}</h1>
                                    {
                                        userType == UserType.COMPANY &&
                                        <Select label={t('common:businessType')} optionsList={businessTypeOptions} />
                                    }
                                    <Select label={t('common:operationForm')} optionsList={formOfOperationOptions} />
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
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step3.main.title')}</h1>
                                    <Select label={t('common:city')} optionsList={cityOptions} onClick={setCity} />
                                    {city == 0 && <Select label={t('common:district')} optionsList={districtOptions} />}
                                    <TextField
                                        label={t('common:contactPhoneBusiness')}
                                        placeholder={t('common:contactPhoneBusinessPrompt')}
                                        pattern="+### (##) ### ## ##"
                                        validateAgainst="phoneNumber"
                                        autofocus={true}
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
                                    <UploadField
                                        id="optional#1"
                                        label={t('common:optional1')}
                                        validatorLabel="First optional documents upload failed"
                                    />
                                    <UploadField
                                        id="optional#2"
                                        label={t('common:optional2')}
                                        validatorLabel="Second optional documents upload failed"
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
                            <Image src="/onboard/step0.svg" alt="Onboard Choice Logo" width={200} height={200} priority />
                            <h3>{t('step0.help.title')}</h3>
                            <p className={styles.description}>{t('step0.help.subtitle')}</p>
                            <h4>{t('step0.help.helperTitle')}</h4>
                            <p className={styles.description} style={{ fontSize: "0.9rem" }}>{t('step0.help.helperSubtitle')}</p>
                        </div>
                    }
                    {step == 1 &&
                        <div className={styles.subform}>
                            <Image src="/onboard/step1.svg" alt="Onboard Choice Logo" width={200} height={200} />
                            <h3>{t('step1.help.title')}</h3>
                            <p className={styles.description}>{t('step1.help.subtitle')}</p>
                        </div>
                    }
                    {step == 2 &&
                        <div className={styles.subform}>
                            <Image src="/onboard/step2.svg" alt="Onboard Choice Logo" width={200} height={200} />
                            <h3>{t('step2.help.title')}</h3>
                            <p className={styles.description}>{t('step2.help.subtitle')}</p>
                            <p className={styles.description}>{t('step2.help.example')}</p>
                        </div>
                    }
                    {step == 3 &&
                        <div className={styles.subform}>
                            <Image src="/onboard/step3.svg" alt="Onboard Choice Logo" width={200} height={200} />
                            <h3>{t('step3.help.title')}</h3>
                            <p className={styles.description}>{t('step3.help.subtitle')}</p>
                        </div>
                    }
                    {step == 4 &&
                        <div className={styles.subform}>
                            <Image src="/onboard/step4.svg" alt="Onboard Choice Logo" width={200} height={200} />
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
                            <Image src="/onboard/step5.svg" alt="Onboard Choice Logo" width={300} height={300} />
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