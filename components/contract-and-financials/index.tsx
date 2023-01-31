import Image from "next/image"
import React from "react"
import { formatDate } from "../../controllers/auxiliary"
import { UserType } from "../../pages/onboard"
import Button from "../button"
import styles from "../contract-and-financials/ContractAndFinancials.module.css"
import ContractAndFinancialsProps from "./interface"

const ContractAndFinancialsModule = (props: ContractAndFinancialsProps) => {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.section}>
                    <span className={styles.title}>Your Financial Rates</span>
                    <div className={styles.column} style={{ width: "370px" }}>
                        <div className={styles.rowBetween}>
                            <span className={styles.text}>Commision rate for local cards:</span>
                            <span className={styles.rate}>{props.localRate} %</span>
                        </div>
                        <div className={styles.rowBetween} >
                            <span className={styles.text}>Commision rate for foreign cards:</span>
                            <span className={styles.rate}>{props.foreignRate} %</span>
                        </div>
                    </div>
                    <div className={styles.divider} />
                    <span className={styles.title}>Payout Information</span>
                    <div className={styles.column} style={{ width: " 400px" }}>
                        <div className={styles.rowBetween} >
                            <span className={styles.text}>Your default payout schedule:</span>
                            <div className={styles.row}>
                                <span className={styles.payout}>{props.payoutSchedule} day(s)</span>
                                <div style={{ width: "6px" }} />
                                <div className={styles.tooltip}>
                                    <Image className={styles.info} src="/mui-icons/info-filled.svg" alt="" width={24} height={24} />
                                    <span className={styles.tooltiptext}>Your payout schedule refers to how often Odero sends money to your bank account.</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rowBetween} >
                            <span className={styles.text}>Payout speed for Azerbaijan:</span>
                            <div className={styles.row}>
                                <span className={styles.payout}>{props.payoutSpeed} days </span>
                                <div style={{ width: "6px" }} />
                                <div className={styles.tooltip}>
                                    <Image className={styles.info} src="/mui-icons/info-filled.svg" alt="" width={24} height={24} />
                                    <span className={styles.tooltiptext}>Your payout speed refers to how fast do money get processed by your bank after being received.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divider} />
                    <span className={styles.title}>About your contract</span>
                    <span className={styles.description}>
                        Here you can find your contract with Odero and the information about it. It was sent to you on {formatDate(props.contractSentDate)}.
                        <br />
                        <br />
                        Please get familiar with the contents of the contract. Afterwards you <b>must print</b> and <b>sign</b> it. {props.type == UserType.COMPANY && `Please, do not forget to put a stamp on it!`} And lastly, you need to <b>send us</b> the <b>physical</b> version of the contract, <b>signed</b>{props.type == UserType.COMPANY && ` and stamped`}.
                    </span>
                    <div style={{ width: "15%", marginTop: "2rem", marginBottom: "1rem" }}>
                        <Button
                            label="Preview Contract"
                            backgroundColor='var(--info-primary)'
                            color='white'
                            padding='0.6rem 1rem'
                            borderRadius='0.4rem'
                            size="1rem"
                            onClick={() => viewAndDownloadPDF(props.contract)}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.rowEnd} style={{ marginTop: "2rem" }}>
                <Button
                    label="Decline"
                    backgroundColor='white'
                    color='var(--primary)'
                    padding='0.6rem 1rem'
                    borderRadius='0.4rem'
                    size="1rem"
                    border="0.1rem solid var(--primary)"
                />
                <div style={{ width: "1rem" }} />
                <Button
                    label="Accept Terms and Contract"
                    backgroundColor='var(--primary)'
                    color='white'
                    padding='0.7rem 1rem'
                    borderRadius='0.4rem'
                    size="1rem"
                />
            </div>
        </>
    )

    function viewAndDownloadPDF(data: string) {
        let pdfWindow = window.open("")
        pdfWindow!.document.write(
            "<iframe width='100%' height='100%' src='" +
            encodeURI(data) + "'></iframe>"
        )
        pdfWindow!.document.title = `Your Odero Contract`
    }

}

export default ContractAndFinancialsModule
