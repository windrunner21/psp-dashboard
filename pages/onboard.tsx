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

import { useUser } from "../controllers/swr";
import Router from "next/router";
import LoadingIndicatorPage from "../components/loading-indicator-page";
import { sendOnboardStep0, sendOnboardStep1, sendOnboardStep2, sendOnboardStep3, sendOnboardStep4 } from "../requests/onboard";
import { OnboardStep } from "../controllers/enums/onboardStep";
import { formatPhone } from "../controllers/dataManipulation";

enum UserType {
    CONTRACTOR = 'Contractor',
    COMPANY = 'Company',
    UNKNOWN = 'Unknown'
}

const Onboard: NextPage = () => {
    const { user, loading, loggedOut } = useUser();

    const { t } = useTranslation(['onboard', 'common']);
    const title = `${t('title')} | Odero`;


    React.useEffect(() => {
        if (user && !loggedOut && user.onboard) {
            switch (user.onboard.currentStep) {
                case OnboardStep.step0:
                    break;
                case OnboardStep.step1:
                    setUserType(user.onboard.legalEntityType.type as UserType)
                    setStep(1)
                    setCompletedStep(1)
                    break;
                case OnboardStep.step2:
                    setUserType(user.onboard.legalEntityType.type as UserType)
                    setName(user.onboard.legalInformation.legalFullName.split(" ")[0])
                    setNameCorrect(true)
                    setSurname(user.onboard.legalInformation.legalFullName.split(" ")[1])
                    setSurnameCorrect(true)
                    setLegalEmail(user.onboard.legalInformation.legalEmail)
                    setLegalEmailCorrect(true)
                    setLegalPhoneNumber(formatPhone(user.onboard.legalInformation.legalPhone))
                    setLegalPhoneNumberCorrect(true)
                    setStep(2)
                    setCompletedStep(2)
                    break;
                case OnboardStep.step3:
                    switch (user.onboard.businessInformation.businessType) {
                        case "LLC":
                            setBusinessType(1)
                            break;
                        case "OJSC":
                            setBusinessType(2)
                            break;
                        case "CJSC":
                            setBusinessType(2)
                            break;
                        default:
                            setBusinessType(0)
                            break;
                    }

                    setUserType(user.onboard.legalEntityType.type as UserType)
                    setName(user.onboard.legalInformation.legalFullName.split(" ")[0])
                    setNameCorrect(true)
                    setSurname(user.onboard.legalInformation.legalFullName.split(" ")[1])
                    setSurnameCorrect(true)
                    setLegalEmail(user.onboard.legalInformation.legalEmail)
                    setLegalEmailCorrect(true)
                    setLegalPhoneNumber(formatPhone(user.onboard.legalInformation.legalPhone))
                    setLegalPhoneNumberCorrect(true)
                    setVatType(user.onboard.businessInformation.vat ? 1 : 2)
                    setLegalBusinessName(user.onboard.businessInformation.legalBusinessName)
                    setLegalBusinessNameCorrect(true)
                    setDisplayBusinessName(user.onboard.businessInformation.displayBusinessName)
                    setDisplayBusinessNameCorrect(true)
                    setTaxNumber(user.onboard.businessInformation.taxNumber)
                    setTaxNumberCorrect(true)
                    setIBAN(user.onboard.businessInformation.iban)
                    setIBANCorrect(true)
                    setStep(3)
                    setCompletedStep(3)
                    break;
                case OnboardStep.step4:
                    switch (user.onboard.businessInformation.businessType) {
                        case "LLC":
                            setBusinessType(1)
                            break;
                        case "OJSC":
                            setBusinessType(2)
                            break;
                        case "CJSC":
                            setBusinessType(2)
                            break;
                        default:
                            setBusinessType(0)
                            break;
                    }

                    setUserType(user.onboard.legalEntityType.type as UserType)
                    setName(user.onboard.legalInformation.legalFullName.split(" ")[0])
                    setNameCorrect(true)
                    setSurname(user.onboard.legalInformation.legalFullName.split(" ")[1])
                    setSurnameCorrect(true)
                    setLegalEmail(user.onboard.legalInformation.legalEmail)
                    setLegalEmailCorrect(true)
                    setLegalPhoneNumber(formatPhone(user.onboard.legalInformation.legalPhone))
                    setLegalPhoneNumberCorrect(true)
                    setVatType(user.onboard.businessInformation.vat ? 1 : 2)
                    setLegalBusinessName(user.onboard.businessInformation.legalBusinessName)
                    setLegalBusinessNameCorrect(true)
                    setDisplayBusinessName(user.onboard.businessInformation.displayBusinessName)
                    setDisplayBusinessNameCorrect(true)
                    setTaxNumber(user.onboard.businessInformation.taxNumber)
                    setTaxNumberCorrect(true)
                    setIBAN(user.onboard.businessInformation.iban)
                    setIBANCorrect(true)
                    setAddress(user.onboard.contactInformation.address)
                    setAddressCorrect(true)
                    setCity(user.onboard.contactInformation.city)
                    setCityCorrect(true)
                    setPostalCode(user.onboard.contactInformation.postalCode)
                    setPostalCodeCorrect(true)
                    setBusinessPhoneNumber(formatPhone(user.onboard.contactInformation.contactPhone))
                    setBusinessPhoneNumberCorrect(true)
                    setWebsite(user.onboard.contactInformation.website)
                    setWebsiteCorrect(true)
                    setStep(4)
                    setCompletedStep(4)
                    break;
                case OnboardStep.step5:
                    switch (user.onboard.businessInformation.businessType) {
                        case "LLC":
                            setBusinessType(1)
                            break;
                        case "OJSC":
                            setBusinessType(2)
                            break;
                        case "CJSC":
                            setBusinessType(2)
                            break;
                        default:
                            setBusinessType(0)
                            break;
                    }

                    setUserType(user.onboard.legalEntityType.type as UserType)
                    setName(user.onboard.legalInformation.legalFullName.split(" ")[0])
                    setNameCorrect(true)
                    setSurname(user.onboard.legalInformation.legalFullName.split(" ")[1])
                    setSurnameCorrect(true)
                    setLegalEmail(user.onboard.legalInformation.legalEmail)
                    setLegalEmailCorrect(true)
                    setLegalPhoneNumber(formatPhone(user.onboard.legalInformation.legalPhone))
                    setLegalPhoneNumberCorrect(true)
                    setVatType(user.onboard.businessInformation.vat ? 1 : 2)
                    setLegalBusinessName(user.onboard.businessInformation.legalBusinessName)
                    setLegalBusinessNameCorrect(true)
                    setDisplayBusinessName(user.onboard.businessInformation.displayBusinessName)
                    setDisplayBusinessNameCorrect(true)
                    setTaxNumber(user.onboard.businessInformation.taxNumber)
                    setTaxNumberCorrect(true)
                    setIBAN(user.onboard.businessInformation.iban)
                    setIBANCorrect(true)
                    setAddress(user.onboard.contactInformation.address)
                    setAddressCorrect(true)
                    setCity(user.onboard.contactInformation.city)
                    setCityCorrect(true)
                    setPostalCode(user.onboard.contactInformation.postalCode)
                    setPostalCodeCorrect(true)
                    setBusinessPhoneNumber(formatPhone(user.onboard.contactInformation.contactPhone))
                    setBusinessPhoneNumberCorrect(true)
                    setWebsite(user.onboard.contactInformation.website)
                    setWebsiteCorrect(true)
                    setStep(5)
                    setCompletedStep(5)
                    break;
                default:
                    setStep(0)
                    setCompletedStep(0)
                    break;
            }
        }
    }, [user, loggedOut])

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
    // validators - step 4
    const [stateRegisterDocumentCorrect, setStateRegisterDocumentCorrect] = React.useState(false)
    const [taxNumberDocumentCorrect, setTaxNumberDocumentCorrect] = React.useState(false)
    const [idCardDocumentCorrect, setIdCardDocumentCorrect] = React.useState(false)
    const [bankRequisitesDocumentCorrect, setBankRequisitesDocumentCorrect] = React.useState(false)

    const legalEntityType = [
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

    if (loggedOut) { Router.push("/login"); }

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
            {loading && <LoadingIndicatorPage />}
            {
                user && !loggedOut &&
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
                        <NavigationBarOnboard user={user.fullname} />
                        <div className={styles.form}>
                            <>
                                {
                                    step == 0 &&
                                    <div className={styles.subform}>
                                        <h1 style={{ marginBottom: "2rem" }}>{t('step0.main.title')}</h1>
                                        {
                                            legalEntityType.map((initialChoice, index) => (
                                                <OnboardChoice key={index} image={initialChoice.image} title={initialChoice.label} onClick={async () => {
                                                    let response: any
                                                    if (index == 0) {
                                                        setUserType(UserType.CONTRACTOR)
                                                        response = await sendOnboardStep0(UserType.CONTRACTOR)
                                                    } else if (index == 1) {
                                                        setUserType(UserType.COMPANY)
                                                        response = await sendOnboardStep0(UserType.COMPANY)
                                                    }

                                                    if (response.status == 200) {
                                                        const stepWillSet = step + 1;
                                                        setStep(stepWillSet)
                                                        if (completedStep < stepWillSet) {
                                                            setCompletedStep(1)
                                                        }
                                                    } else {
                                                        setAlertType(AlertType.ERROR);
                                                        setAlertTitle(t('alert-dialog:title.error.generic'))
                                                        setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                                                        setAlertVisible(true)
                                                        setAlertStyle(alertStyles.error)
                                                    }
                                                }} />
                                            ))
                                        }
                                    </div>
                                }
                            </>

                            <>
                                {
                                    step == 1 &&
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
                                            <SecondaryNext onClick={async () => {
                                                if (name == "" || surname == "" || legalEmail == "" || legalPhoneNumber == "") {
                                                    setAlertType(AlertType.ERROR);
                                                    setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                    setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                    setAlertVisible(true)
                                                    setAlertStyle(alertStyles.error)
                                                } else {
                                                    if (nameCorrect && surnameCorrect && legalEmailCorrect && legalPhoneNumberCorrect) {
                                                        const fullName = name + " " + surname;
                                                        let response: any = await sendOnboardStep1(fullName, legalEmail, legalPhoneNumber)

                                                        if (response.status == 200) {
                                                            const stepWillSet = step + 1;
                                                            setStep(stepWillSet)
                                                            if (completedStep < stepWillSet) {
                                                                setCompletedStep(2)
                                                            }
                                                        } else {
                                                            setAlertType(AlertType.ERROR);
                                                            setAlertTitle(t('alert-dialog:title.error.generic'))
                                                            setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                                                            setAlertVisible(true)
                                                            setAlertStyle(alertStyles.error)
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
                                            validateAgainst="businessName"
                                            validatorCallback={setLegalBusinessNameCorrect}
                                            value={legalBusinessName}
                                            setValue={setLegalBusinessName}
                                        />
                                        <TextField
                                            label={t('common:businessName')}
                                            placeholder={t('common:businessNamePrompt')}
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
                                            <SecondaryNext onClick={async () => {
                                                // check for user type first
                                                if (userType == UserType.COMPANY) {
                                                    if (businessType == 0 || vatType == 0 || legalBusinessName == "" || displayBusinessName == "" || taxNumber == "" || IBAN == "") {
                                                        setAlertType(AlertType.ERROR);
                                                        setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                        setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                        setAlertVisible(true)
                                                        setAlertStyle(alertStyles.error)
                                                    } else {
                                                        if (businessType != 0 && vatType != 0 && legalBusinessNameCorrect && displayBusinessNameCorrect && taxNumberCorrect && IBANCorrect) {
                                                            let businessTypeString;

                                                            switch (businessType) {
                                                                case 1:
                                                                    businessTypeString = "LLC"
                                                                    break;
                                                                case 2:
                                                                    businessTypeString = "OJSC"
                                                                    break;
                                                                case 3:
                                                                    businessTypeString = "CJSC"
                                                                    break;
                                                                default:
                                                                    setAlertType(AlertType.WARNING);
                                                                    setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                                                                    setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                                                                    setAlertVisible(true)
                                                                    setAlertStyle(alertStyles.warning)
                                                                    return;
                                                            }

                                                            let response: any = await sendOnboardStep2(vatType == 1, legalBusinessName, displayBusinessName, taxNumber, IBAN, businessTypeString)

                                                            if (response.status == 200) {
                                                                const stepWillSet = step + 1;
                                                                setStep(stepWillSet)
                                                                if (completedStep < stepWillSet) {
                                                                    setCompletedStep(3)
                                                                }
                                                            } else {
                                                                setAlertType(AlertType.ERROR);
                                                                setAlertTitle(t('alert-dialog:title.error.generic'))
                                                                setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                                                                setAlertVisible(true)
                                                                setAlertStyle(alertStyles.error)
                                                            }
                                                        } else {
                                                            setAlertType(AlertType.WARNING);
                                                            setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                                                            setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                                                            setAlertVisible(true)
                                                            setAlertStyle(alertStyles.warning)
                                                        }
                                                    }
                                                } else {
                                                    if (vatType == 0 || legalBusinessName == "" || displayBusinessName == "" || taxNumber == "" || IBAN == "") {
                                                        setAlertType(AlertType.ERROR);
                                                        setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                        setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                        setAlertVisible(true)
                                                        setAlertStyle(alertStyles.error)
                                                    } else {
                                                        if (vatType != 0 && legalBusinessNameCorrect && displayBusinessNameCorrect && taxNumberCorrect && IBANCorrect) {
                                                            let response: any = await sendOnboardStep2(vatType == 1, legalBusinessName, displayBusinessName, taxNumber, IBAN)

                                                            if (response.status == 200) {
                                                                const stepWillSet = step + 1;
                                                                setStep(stepWillSet)
                                                                if (completedStep < stepWillSet) {
                                                                    setCompletedStep(3)
                                                                }
                                                            } else {
                                                                setAlertType(AlertType.ERROR);
                                                                setAlertTitle(t('alert-dialog:title.error.generic'))
                                                                setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                                                                setAlertVisible(true)
                                                                setAlertStyle(alertStyles.error)
                                                            }
                                                        } else {
                                                            setAlertType(AlertType.WARNING);
                                                            setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                                                            setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                                                            setAlertVisible(true)
                                                            setAlertStyle(alertStyles.warning)
                                                        }
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
                                            <SecondaryNext onClick={async () => {
                                                if (address == "" || city == "" || postalCode == "" || businessPhoneNumber == "" || website == "") {
                                                    setAlertType(AlertType.ERROR);
                                                    setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                    setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                    setAlertVisible(true)
                                                    setAlertStyle(alertStyles.error)
                                                } else {
                                                    if (addressCorrect && cityCorrect && postalCodeCorrect && businessPhoneNumberCorrect && websiteCorrect) {
                                                        let response: any = await sendOnboardStep3(address, city, postalCode, businessPhoneNumber, website)

                                                        if (response.status == 200) {
                                                            const stepWillSet = step + 1;
                                                            setStep(stepWillSet)
                                                            if (completedStep < stepWillSet) {
                                                                setCompletedStep(4)
                                                            }
                                                        } else {
                                                            setAlertType(AlertType.ERROR);
                                                            setAlertTitle(t('alert-dialog:title.error.generic'))
                                                            setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                                                            setAlertVisible(true)
                                                            setAlertStyle(alertStyles.error)
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
                                                validatorCallback={setStateRegisterDocumentCorrect}
                                            />
                                        }
                                        <UploadField
                                            id="taxnumber"
                                            label={t('common:taxNumber')}
                                            validatorLabel="Tax number upload failed"
                                            value={taxNumberDocument}
                                            setValue={setTaxNumberDocument}
                                            validatorCallback={setTaxNumberDocumentCorrect}
                                        />
                                        <UploadField
                                            id="idcard"
                                            label={userType == UserType.COMPANY ? "Legal Representative's Identification Card" : t('common:idcard')}
                                            validatorLabel="ID card upload failed"
                                            value={idCardDocument}
                                            setValue={setIdCardDocument}
                                            validatorCallback={setIdCardDocumentCorrect}
                                        />
                                        <UploadField
                                            id="bankrequisites"
                                            label={t('common:bankRequisites')}
                                            validatorLabel="Bank requisites upload failed"
                                            value={bankRequisitesDocument}
                                            setValue={setBankRequisitesDocument}
                                            validatorCallback={setBankRequisitesDocumentCorrect}
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
                                            <SecondaryNext onClick={async () => {
                                                // check for user type first
                                                if (userType == UserType.COMPANY) {
                                                    if (stateRegisterDocument == "" || taxNumberDocument == "" || idCardDocument == "" || bankRequisitesDocument == "") {
                                                        setAlertType(AlertType.ERROR);
                                                        setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                        setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                        setAlertVisible(true)
                                                        setAlertStyle(alertStyles.error)
                                                    } else {
                                                        if (stateRegisterDocumentCorrect && taxNumberDocumentCorrect && idCardDocumentCorrect && bankRequisitesDocumentCorrect) {
                                                            let response: any = await sendOnboardStep4(taxNumberDocument, idCardDocument, bankRequisitesDocument, stateRegisterDocument)

                                                            if (response.status == 200) {
                                                                const stepWillSet = step + 1;
                                                                setStep(stepWillSet)
                                                                if (completedStep < stepWillSet) {
                                                                    setCompletedStep(5)
                                                                }
                                                            } else {
                                                                setAlertType(AlertType.ERROR);
                                                                setAlertTitle(t('alert-dialog:title.error.generic'))
                                                                setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                                                                setAlertVisible(true)
                                                                setAlertStyle(alertStyles.error)
                                                            }
                                                        } else {
                                                            setAlertType(AlertType.WARNING);
                                                            setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                                                            setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                                                            setAlertVisible(true)
                                                            setAlertStyle(alertStyles.warning)
                                                        }
                                                    }
                                                } else {
                                                    if (taxNumberDocument == "" || idCardDocument == "" || bankRequisitesDocument == "") {
                                                        setAlertType(AlertType.ERROR);
                                                        setAlertTitle(t('alert-dialog:title.error.emptyForm'))
                                                        setAlertDescription(t('alert-dialog:subtitle.error.emptyForm'))
                                                        setAlertVisible(true)
                                                        setAlertStyle(alertStyles.error)
                                                    } else {
                                                        console.log(taxNumberDocumentCorrect)
                                                        console.log(idCardDocumentCorrect)
                                                        console.log(bankRequisitesDocumentCorrect)
                                                        if (taxNumberDocumentCorrect && idCardDocumentCorrect && bankRequisitesDocumentCorrect) {
                                                            let response: any = await sendOnboardStep4(taxNumberDocument, idCardDocument, bankRequisitesDocument)

                                                            if (response.status == 200) {
                                                                const stepWillSet = step + 1;
                                                                setStep(stepWillSet)
                                                                if (completedStep < stepWillSet) {
                                                                    setCompletedStep(5)
                                                                }
                                                            } else {
                                                                setAlertType(AlertType.ERROR);
                                                                setAlertTitle(t('alert-dialog:title.error.generic'))
                                                                setAlertDescription(t('alert-dialog:subtitle.error.generic'))
                                                                setAlertVisible(true)
                                                                setAlertStyle(alertStyles.error)
                                                            }
                                                        } else {
                                                            setAlertType(AlertType.WARNING);
                                                            setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                                                            setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                                                            setAlertVisible(true)
                                                            setAlertStyle(alertStyles.warning)
                                                        }
                                                    }
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
                                <h1 style={{ color: "var(--success-primary)", textTransform: "uppercase" }}>{user.onboard.status}</h1>
                            </div>
                        }
                        {step < 6 && <StepIndicators totalSteps={6} step={step} completedStep={completedStep} position='absolute' type='line' />}
                    </div>
                </main>
            }
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