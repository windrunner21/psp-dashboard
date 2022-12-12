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
import AlertDialog from "../components/alert-dialog";
import AlertType from "../components/alert-dialog/AlertType";
import alertStyles from "../components/alert-dialog/AlertDialog.module.css"

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
    const [completedStep, setCompletedStep] = React.useState(0)

    // alert dialog variables
    const [isAlertVisible, setAlertVisible] = React.useState(false)
    const [alertTitle, setAlertTitle] = React.useState("")
    const [alertDescription, setAlertDescription] = React.useState("")
    const [alertType, setAlertType] = React.useState(AlertType.UNKNOWN)
    const [alertStyle, setAlertStyle] = React.useState(alertStyles.error)

    // onboard data
    // data - step 0
    const [userType, setUserType] = React.useState(UserType.UNKNOWN)
    // data - step 1
    const [name, setName] = React.useState("")
    const [surname, setSurname] = React.useState("")
    const [legalEmail, setLegalEmail] = React.useState("")
    const [legalPhoneNumber, setLegalPhoneNumber] = React.useState("")
    // data - step 2
    const [businessType, setBusinessType] = React.useState(0)
    const [vatType, setVatType] = React.useState(0)
    const [legalBusinessName, setLegalBusinessName] = React.useState("")
    const [displayBusinessName, setDisplayBusinessName] = React.useState("")
    const [taxNumber, setTaxNumber] = React.useState("")
    const [IBAN, setIBAN] = React.useState("")
    // data - step 3
    const [address, setAddress] = React.useState("")
    const [city, setCity] = React.useState("")
    const [postalCode, setPostalCode] = React.useState("")
    const [businessPhoneNumber, setBusinessPhoneNumber] = React.useState("")
    const [website, setWebsite] = React.useState("")
    // data - step 4
    const [stateRegisterDocument, setStateRegisterDocument] = React.useState("")
    const [taxNumberDocument, setTaxNumberDocument] = React.useState("")
    const [idCardDocument, setIdCardDocument] = React.useState("")
    const [bankRequisitesDocument, setBankRequisitesDocument] = React.useState("")


    // validators
    // validators - step 1
    const [nameCorrect, setNameCorrect] = React.useState(false)
    const [surnameCorrect, setSurnameCorrect] = React.useState(false)
    const [legalEmailCorrect, setLegalEmailCorrect] = React.useState(false)
    const [legalPhoneNumberCorrect, setLegalPhoneNumberCorrect] = React.useState(false)
    // validators - step 2
    const [legalBusinessNameCorrect, setLegalBusinessNameCorrect] = React.useState(false)
    const [displayBusinessNameCorrect, setDisplayBusinessNameCorrect] = React.useState(false)
    const [taxNumberCorrect, setTaxNumberCorrect] = React.useState(false)
    const [IBANCorrect, setIBANCorrect] = React.useState(false)
    // validators - step 3
    const [addressCorrect, setAddressCorrect] = React.useState(false)
    const [cityCorrect, setCityCorrect] = React.useState(false)
    const [postalCodeCorrect, setPostalCodeCorrect] = React.useState(false)
    const [businessPhoneNumberCorrect, setBusinessPhoneNumberCorrect] = React.useState(false)
    const [websiteCorrect, setWebsiteCorrect] = React.useState(false)

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

    const vatOptions = [
        'Select...',
        'Yes',
        'No'
    ]

    const businessTypeOptions = [
        'Select your business type...',
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
                    {isAlertVisible &&
                        <AlertDialog
                            delay={2000}
                            title={alertTitle}
                            description={alertDescription}
                            type={alertType}
                            style={alertStyle}
                            onClick={() => setAlertVisible(false)}
                        />
                    }
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
                                                if (completedStep < stepWillSet) {
                                                    setCompletedStep(1)
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
                                        validatorCallback={setLegalEmailCorrect}
                                        value={legalEmail}
                                        setValue={setLegalEmail}
                                    />
                                    <PhoneNumberField
                                        type="tel"
                                        label={t('common:phoneNumber')}
                                        placeholder="Enter your work phone number"
                                        value={legalPhoneNumber}
                                        setValue={setLegalPhoneNumber}
                                        validateNumber={setLegalPhoneNumberCorrect}
                                    />
                                    <div className={`${styles.row} ${styles.pagination}`}>
                                        <SecondaryBack onClick={() => {
                                            const stepWillSet = step - 1;
                                            setStep(stepWillSet)
                                        }} />
                                        <div style={{ width: "1rem" }} />
                                        <SecondaryNext onClick={() => {
                                            if (name == "" || surname == "" || legalEmail == "" || legalPhoneNumber == "") {
                                                setAlertType(AlertType.ERROR);
                                                setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                setAlertVisible(true)
                                                setAlertStyle(alertStyles.error)
                                            } else {
                                                if (nameCorrect && surnameCorrect && legalEmailCorrect && legalPhoneNumberCorrect) {
                                                    const stepWillSet = step + 1;
                                                    setStep(stepWillSet)
                                                    if (completedStep < stepWillSet) {
                                                        setCompletedStep(2)
                                                    }
                                                } else {
                                                    setAlertType(AlertType.WARNING);
                                                    setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                                                    setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                                                    setAlertVisible(true)
                                                    setAlertStyle(alertStyles.warning)
                                                }
                                            }
                                        }} />
                                    </div>
                                </div>
                            }
                        </>

                        <>
                            {step == 2 &&
                                <div className={styles.subform}>
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step2.main.title')}</h1>
                                    <div className={styles.row}>
                                        {
                                            userType == UserType.COMPANY &&
                                            <>
                                                <Select label={t('common:businessType')} optionsList={businessTypeOptions} setValue={setBusinessType} value={businessType} />
                                                <div style={{ width: "1rem" }} />
                                            </>
                                        }
                                        <div style={{ width: `${userType == UserType.COMPANY ? '50%' : '100%'}` }}>
                                            <Select label={'Do you pay VAT?'} optionsList={vatOptions} setValue={setVatType} value={vatType} />
                                        </div>
                                    </div>
                                    <TextField
                                        label={t('common:legalBusinessName')}
                                        placeholder={t('common:legalBusinessNamePrompt')}
                                        capitalized={true}
                                        validateAgainst="businessName"
                                        validatorCallback={setLegalBusinessNameCorrect}
                                        value={legalBusinessName}
                                        setValue={setLegalBusinessName}
                                    />
                                    <TextField
                                        label={t('common:businessName')}
                                        placeholder={t('common:businessNamePrompt')}
                                        capitalized={true}
                                        validateAgainst="businessName"
                                        validatorCallback={setDisplayBusinessNameCorrect}
                                        value={displayBusinessName}
                                        setValue={setDisplayBusinessName}
                                    />
                                    <TextField
                                        label={t('common:taxNumber')}
                                        placeholder={t('common:taxNumberPrompt')}
                                        validatorLabel="Invalid tax number"
                                        validateAgainst="taxNumber"
                                        max={10}
                                        validatorCallback={setTaxNumberCorrect}
                                        value={taxNumber}
                                        setValue={setTaxNumber}
                                    />
                                    <TextField
                                        label={t('common:iban')}
                                        placeholder="Enter your IBAN"
                                        validateAgainst="IBAN"
                                        max={34}
                                        validatorCallback={setIBANCorrect}
                                        value={IBAN}
                                        setValue={setIBAN}
                                    />
                                    <div className={`${styles.row} ${styles.pagination}`}>
                                        <SecondaryBack onClick={() => {
                                            const stepWillSet = step - 1;
                                            setStep(stepWillSet)
                                        }} />
                                        <div style={{ width: "1rem" }} />
                                        <SecondaryNext onClick={() => {
                                            if (businessType == 0 || vatType == 0 || legalBusinessName == "" || displayBusinessName == "" || taxNumber == "" || IBAN == "") {
                                                setAlertType(AlertType.ERROR);
                                                setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                setAlertVisible(true)
                                                setAlertStyle(alertStyles.error)
                                            } else {
                                                if (businessType != 0 && vatType != 0 && legalBusinessNameCorrect && displayBusinessNameCorrect && taxNumberCorrect && IBANCorrect) {
                                                    const stepWillSet = step + 1;
                                                    setStep(stepWillSet)
                                                    if (completedStep < stepWillSet) {
                                                        setCompletedStep(3)
                                                    }
                                                } else {
                                                    setAlertType(AlertType.WARNING);
                                                    setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                                                    setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                                                    setAlertVisible(true)
                                                    setAlertStyle(alertStyles.warning)
                                                }
                                            }
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
                                        validateAgainst="address"
                                        validatorCallback={setAddressCorrect}
                                        value={address}
                                        setValue={setAddress}
                                    />
                                    <div className={styles.row}>
                                        <TextField
                                            label="City"
                                            placeholder="Enter your city"
                                            validateAgainst="city"
                                            validatorCallback={setCityCorrect}
                                            value={city}
                                            setValue={setCity}
                                        />
                                        <div style={{ width: "1rem" }} />
                                        <TextField
                                            label="Postal Code"
                                            placeholder="Enter your postal code"
                                            validateAgainst="postalCode"
                                            validatorCallback={setPostalCodeCorrect}
                                            max={6}
                                            value={postalCode}
                                            setValue={setPostalCode}
                                        />
                                    </div>
                                    <PhoneNumberField
                                        type="tel"
                                        label={t('common:phoneNumber')}
                                        placeholder={t('common:phoneNumberPrompt')}
                                        value={businessPhoneNumber}
                                        setValue={setBusinessPhoneNumber}
                                        validateNumber={setBusinessPhoneNumberCorrect}
                                    />
                                    <TextField
                                        label={t('common:website')}
                                        placeholder={t('common:websitePrompt')}
                                        validatorLabel="Invalid format. Don't forget to include https://"
                                        validateAgainst="website"
                                        validatorCallback={setWebsiteCorrect}
                                        value={website}
                                        setValue={setWebsite}
                                    />
                                    <div className={`${styles.row} ${styles.pagination}`}>
                                        <SecondaryBack onClick={() => {
                                            const stepWillSet = step - 1;
                                            setStep(stepWillSet)
                                        }} />
                                        <div style={{ width: "1rem" }} />
                                        <SecondaryNext onClick={() => {
                                            if (address == "" || city == "" || postalCode == "" || businessPhoneNumber == "" || website == "") {
                                                setAlertType(AlertType.ERROR);
                                                setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                setAlertVisible(true)
                                                setAlertStyle(alertStyles.error)
                                            } else {
                                                if (addressCorrect && cityCorrect && postalCodeCorrect && businessPhoneNumberCorrect && websiteCorrect) {
                                                    const stepWillSet = step + 1;
                                                    setStep(stepWillSet)
                                                    if (completedStep < stepWillSet) {
                                                        setCompletedStep(4)
                                                    }
                                                } else {
                                                    setAlertType(AlertType.WARNING);
                                                    setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                                                    setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                                                    setAlertVisible(true)
                                                    setAlertStyle(alertStyles.warning)
                                                }
                                            }
                                        }} />
                                    </div>
                                </div>
                            }
                        </>

                        <>
                            {step == 4 &&
                                <div className={styles.subform}>
                                    <h1 style={{ marginBottom: "2rem" }}>{t('step4.main.title')}</h1>
                                    {
                                        userType == UserType.COMPANY &&
                                        <UploadField
                                            id="stateregister"
                                            label={t('common:ordering')}
                                            validatorLabel="Ordering upload failed"
                                            value={stateRegisterDocument}
                                            setValue={setStateRegisterDocument}
                                        />
                                    }
                                    <UploadField
                                        id="taxnumber"
                                        label={t('common:taxNumber')}
                                        validatorLabel="Tax number upload failed"
                                        value={taxNumberDocument}
                                        setValue={setTaxNumberDocument}
                                    />
                                    <UploadField
                                        id="idcard"
                                        label={userType == UserType.COMPANY ? "Legal Representative's Identification Card" : t('common:idcard')}
                                        validatorLabel="ID card upload failed"
                                        value={idCardDocument}
                                        setValue={setIdCardDocument}
                                    />
                                    <UploadField
                                        id="bankrequisites"
                                        label={t('common:bankRequisites')}
                                        validatorLabel="Bank requisites upload failed"
                                        value={bankRequisitesDocument}
                                        setValue={setBankRequisitesDocument}
                                    />
                                    <div className={`${styles.row} ${styles.pagination}`}>
                                        <span className={styles.caption}>By clicking NEXT you accept responsibility for the correctness of the information you provided.</span>
                                    </div>
                                    <div className={`${styles.row} ${styles.pagination}`}>
                                        <SecondaryBack onClick={() => {
                                            const stepWillSet = step - 1;
                                            setStep(stepWillSet)
                                        }} />
                                        <div style={{ width: "1rem" }} />
                                        <SecondaryNext onClick={() => {
                                            if (stateRegisterDocument == "" || taxNumberDocument == "" || idCardDocument == "" || bankRequisitesDocument == "") {
                                                setAlertType(AlertType.ERROR);
                                                setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                setAlertVisible(true)
                                                setAlertStyle(alertStyles.error)
                                            } else {
                                                const stepWillSet = step + 1;
                                                setStep(stepWillSet)
                                                setCompletedStep(5)
                                            }
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
                            <h3>{t('step2.help.title2')}</h3>
                            <p className={styles.description}>{t('step2.help.subtitle2')}</p>
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
                    {step == 5 &&
                        <div>
                            <h3>{t('step5.help.title')}</h3>
                            <h1 style={{ color: "var(--success-primary)", textTransform: "uppercase" }}>{t('common:applied')}</h1>
                        </div>
                    }
                    {step < 6 && <StepIndicators totalSteps={6} step={step} completedStep={completedStep} />}
                </div>
            </main>
        </>
    )
}

export default Onboard

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["onboard", "languages", "common", "alert-dialog"]))
        },
    };
}