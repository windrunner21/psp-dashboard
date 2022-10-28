import React from "react"
import CloseButton from "../close-button"
import styles from "../one-time-password/OTP.module.css"
import PrimaryButton from "../primary-button"
import PrimaryLink from "../primary-link"
import DigitInput from "./digit-input"
import OneTimePasswordProps from "./interface"
import Validator from "../validator"
import AlertType from "../alert-dialog/AlertType"

const OneTimePassword = (props: OneTimePasswordProps) => {
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

    return (
        <div className={styles.modal}>
            <CloseButton onClick={props.onClick} />
            <h2>Enter verification code</h2>
            <p className={styles.description}>We have just sent a verification code to provided {props.phoneNumber}</p>
            <div style={{ marginTop: "1.5rem", marginBottom: "1.25rem" }}>
                <DigitInput value={otp} repeating={codeLength} onChange={onChange} displayError={hasErrors} onPaste={sendPastedOneTimePasswordCode} />
            </div>
            {hasErrors && <div style={{ marginBottom: "1.25rem" }}>
                <Validator label={`Verification code must be ${codeLength} digits long`} />
            </div>}
            <div style={{ marginBottom: "1.25rem" }}>
                <PrimaryLink href="/" label="Send again" />
            </div>
            <PrimaryButton title="Verify" onClick={sendOneTimePasswordCode} loading={loading} />
        </div>
    )
}

export default OneTimePassword