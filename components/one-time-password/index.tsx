import React from "react"
import CloseButton from "../close-button"
import { useTranslation } from 'next-i18next';
import Router, { useRouter } from 'next/router'

// custom components
import styles from "../one-time-password/OTP.module.css"
import PrimaryButton from "../primary-button"
import PrimaryLink from "../primary-link"
import DigitInput from "./digit-input"
import OneTimePasswordProps from "./interface"
import AlertType from "../alert-dialog/AlertType"
import Validator from "../validator";
import { sendOTP, sendSignInForm, sendSignUpForm } from "../../requests/auth";
import SecondaryBack from "../secondary-back";

// modal representation
export const OneTimePasswordModal = (props: OneTimePasswordProps) => {
    const { t } = useTranslation(['otp', 'alert-dialog', 'validators']);

    // waiting for resend
    const [seconds, setSeconds] = React.useState(0)
    const [minutes, setMinutes] = React.useState(1)
    const [disabled, setDisabled] = React.useState(true)

    const codeLength: number = 6;
    const [otp, setOtp] = React.useState('');
    const onChange = (value: string) => setOtp(value);
    const [loading, setIsLoading] = React.useState(false)
    const [hasErrors, setHasErrors] = React.useState(false)

    function sendOneTimePasswordCode() {
        checkForErrorsAndProceed()
    }

    function sendPastedOneTimePasswordCode(targetValue: string) {
        checkForErrorsAndProceed(targetValue)
    }

    async function checkForErrorsAndProceed(targetValue?: string) {
        const resultedOTP = targetValue ?? otp

        if (resultedOTP.length != 6) {
            setHasErrors(true)
            setIsLoading(false)
            props.setAlertType(AlertType.ERROR);
            props.setAlertTitle(t('alert-dialog:title.error.generic'))
            props.setAlertDescription(t('alert-dialog:subtitle.error.generic'))
            props.showAlert(true)
        } else {
            setHasErrors(false)
            setIsLoading(true)

            // wait for server to return status
            let response: any
            if (props.name && props.surname) {
                response = await sendSignUpForm(props.name, props.surname, props.phoneNumber, resultedOTP);
            } else {
                response = await sendSignInForm(props.phoneNumber, resultedOTP);
            }
            setIsLoading(false)

            if (response.status == 200) {
                props.setAlertType(AlertType.SUCCESS);
                props.setAlertTitle(t('alert-dialog:title.success'))
                props.setAlertDescription(t('alert-dialog:subtitle.success.login'))
                props.showAlert(true)

                Router.push("/")
            } else {
                props.setAlertType(AlertType.ERROR);
                props.setAlertTitle(t('alert-dialog:title.error.generic'))
                props.setAlertDescription(t('alert-dialog:subtitle.error.generic'))

                // client side
                if (response.status == 401 || response.status == 502) {
                    props.setAlertType(AlertType.WARNING);
                    props.setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                    props.setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                }

                props.showAlert(true)
            }
        }
    }

    function updateTime() {
        if (minutes == 0 && seconds == 0) {
            setDisabled(false)
        }
        else {
            if (seconds == 0) {
                setMinutes(minutes => minutes - 1);
                setSeconds(59);
            } else {
                setSeconds(seconds => seconds - 1);
            }
        }
    }

    React.useEffect(() => {
        const token = setTimeout(updateTime, 1000)

        return function cleanUp() {
            clearTimeout(token);
        }
    });

    function resetTimer() {
        if (!disabled) {
            setSeconds(0);
            setMinutes(1);
            setDisabled(true)
        }
    };

    return (
        <div className={styles.modal}>
            <CloseButton onClick={props.onClick} />
            <h2>{t('title')}</h2>
            <p className={styles.description}>{t('subtitle', { phoneNumber: "+994 " + props.phoneNumber })}</p>
            <div style={{ marginTop: "1.5rem" }}>
                <DigitInput value={otp} repeating={codeLength} onChange={onChange} displayError={hasErrors} onPaste={sendPastedOneTimePasswordCode} />
            </div>
            {hasErrors && <Validator label={t('validators:otp', { length: codeLength })} />}
            <div style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
                <PrimaryLink label={t('resend')} onClick={resetTimer} disabled={disabled} />
                <span className={styles.linkText}> {t('in')} {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
            <PrimaryButton title={t('verify')} onClick={sendOneTimePasswordCode} loading={loading} />
        </div>
    )
}

// embedded representation
export const OneTimePassword = (props: OneTimePasswordProps) => {
    const { locale } = useRouter();
    const { t } = useTranslation(['otp', 'alert-dialog', 'validators']);

    // waiting for resend
    const [seconds, setSeconds] = React.useState(0)
    const [minutes, setMinutes] = React.useState(1)
    const [disabled, setDisabled] = React.useState(true)

    const codeLength: number = 6;
    const [otp, setOtp] = React.useState('');
    const onChange = (value: string) => setOtp(value);
    const [loading, setIsLoading] = React.useState(false)
    const [hasErrors, setHasErrors] = React.useState(false)

    function sendOneTimePasswordCode() {
        checkForErrorsAndProceed()
    }

    function sendPastedOneTimePasswordCode(targetValue: string) {
        checkForErrorsAndProceed(targetValue)
    }

    async function checkForErrorsAndProceed(targetValue?: string) {
        const resultedOTP = targetValue ?? otp

        if (resultedOTP.length != 6) {
            setHasErrors(true)
            setIsLoading(false)
            props.setAlertType(AlertType.ERROR);
            props.setAlertTitle(t('alert-dialog:title.error.generic'))
            props.setAlertDescription(t('alert-dialog:subtitle.error.generic'))
            props.showAlert(true)
        } else {
            setHasErrors(false)
            setIsLoading(true)

            // wait for server to return status
            let response: any
            if (props.name && props.surname) {
                response = await sendSignUpForm(props.name, props.surname, props.phoneNumber, resultedOTP);
            } else {
                response = await sendSignInForm(props.phoneNumber, resultedOTP);
            }
            setIsLoading(false)

            if (response.status == 200) {
                props.setAlertType(AlertType.SUCCESS);
                props.setAlertTitle(t('alert-dialog:title.success'))
                props.setAlertDescription(t('alert-dialog:subtitle.success.login'))
                props.showAlert(true)

                Router.push("/")
            } else {
                props.setAlertType(AlertType.ERROR);
                props.setAlertTitle(t('alert-dialog:title.error.generic'))
                props.setAlertDescription(t('alert-dialog:subtitle.error.generic'))

                // client side
                if (response.status == 401 || response.status == 502) {
                    props.setAlertType(AlertType.WARNING);
                    props.setAlertTitle(t('alert-dialog:title.error.wrongForm'))
                    props.setAlertDescription(t('alert-dialog:subtitle.error.wrongForm'))
                }

                props.showAlert(true)
            }
        }
    }

    function updateTime() {
        if (minutes == 0 && seconds == 0) {
            setDisabled(false)
        }
        else {
            if (seconds == 0) {
                setMinutes(minutes => minutes - 1);
                setSeconds(59);
            } else {
                setSeconds(seconds => seconds - 1);
            }
        }
    }

    React.useEffect(() => {
        const token = setTimeout(updateTime, 1000)

        return function cleanUp() {
            clearTimeout(token);
        }
    });

    async function resetTimer() {
        if (!disabled) {
            setSeconds(0);
            setMinutes(1);
            setDisabled(true)
            const status = await sendOTP(props.phoneNumber, props.type!, locale ? locale : 'az');
        }
    };

    return (
        <div className={styles.embedded}>
            <SecondaryBack onClick={props.onClick!} />
            <h2>{t('title')}</h2>
            <p className={styles.description}>{t('subtitle', { phoneNumber: "+994 " + props.phoneNumber })}</p>
            <div style={{ marginTop: "1.5rem" }}>
                <DigitInput value={otp} repeating={codeLength} onChange={onChange} displayError={hasErrors} onPaste={sendPastedOneTimePasswordCode} />
            </div>
            {hasErrors && <Validator label={t('validators:otp', { length: codeLength })} />}
            <div style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
                <PrimaryLink label={t('resend')} onClick={resetTimer} disabled={disabled} />
                <span className={styles.linkText}> {t('in')} {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
            <PrimaryButton title={t('verify')} onClick={sendOneTimePasswordCode} loading={loading} />
        </div>
    )
}