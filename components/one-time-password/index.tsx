import React from "react"
import Image from "next/image"
import CloseButton from "../close-button"
import styles from "../one-time-password/OTP.module.css"
import PrimaryButton from "../primary-button"
import PrimaryLink from "../primary-link"
import DigitInput from "./digit-input"
import OneTimePasswordProps from "./interface"

const OneTimePassword = (props: OneTimePasswordProps) => {
    const [otp, setOtp] = React.useState('');
    const onChange = (value: string) => setOtp(value);

    return (
        <div className={styles.modal}>
            <CloseButton onClick={props.onClick} />
            <h2>Enter verification code</h2>
            <p className={styles.description}>We have just sent a verification code to provided {props.phoneNumber}</p>
            <div style={{ marginTop: "1.5rem", marginBottom: "1.25rem" }}>
                <DigitInput value={otp} repeating={6} onChange={onChange} />
            </div>
            <div style={{ marginBottom: "1.25rem" }}>
                <PrimaryLink href="/" label="Send again" />
            </div>
            <PrimaryButton title="Verify" />
        </div>
    )
}

export default OneTimePassword