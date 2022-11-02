import React from "react"
import CloseButton from "../close-button"
import { useTranslation } from 'next-i18next';

// custom components
import styles from "../one-time-password/OTP.module.css"
import PrimaryButton from "../primary-button"
import PrimaryLink from "../primary-link"
import DigitInput from "./digit-input"
import OneTimePasswordProps from "./interface"
import Validator from "../validator"
import AlertType from "../alert-dialog/AlertType"

const OneTimePassword = (props: OneTimePasswordProps) => {
    const { t } = useTranslation('otp');
    // waiting for send
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

    function checkForErrorsAndProceed(targetValue?: string) {
        const resultedOTP = targetValue ?? otp
        console.log(resultedOTP)
        if (resultedOTP.length != 6) {
            setHasErrors(true)
            setIsLoading(false)
            props.setAlertType(AlertType.ERROR);
            props.setAlertTitle("Something went wrong!")
            props.setAlertDescription("We've encountered some unexpected error.")
            props.showAlert(true)
        } else {
            setHasErrors(false)
            setIsLoading(true)
            props.setAlertType(AlertType.SUCCESS);
            props.setAlertTitle("Congratulations!")
            props.setAlertDescription("You've successfully logged in.")
            props.showAlert(true)
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
            <p className={styles.description}>{t('subtitle', { phoneNumber: props.phoneNumber })}</p>
            <div style={{ marginTop: "1.5rem", marginBottom: "1.25rem" }}>
                <DigitInput value={otp} repeating={codeLength} onChange={onChange} displayError={hasErrors} onPaste={sendPastedOneTimePasswordCode} />
            </div>
            {hasErrors && <div style={{ marginBottom: "1.25rem" }}>
                <Validator label={`Verification code must be ${codeLength} digits long`} />
            </div>}
            <div style={{ marginBottom: "1.25rem" }}>
                <PrimaryLink label={t('resend')} onClick={resetTimer} disabled={disabled} />
                <span className={styles.linkText}> {t('in')} {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            </div>
            <PrimaryButton title={t('verify')} onClick={sendOneTimePasswordCode} loading={loading} />
        </div>
    )
}

export default OneTimePassword