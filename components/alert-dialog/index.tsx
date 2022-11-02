import CloseButton from "../close-button"
import AlertDialogProps from "./interface"
import styles from "../alert-dialog/AlertDialog.module.css"
import AlertType from "./AlertType";
import React from "react";
import Image from 'next/image'

const AlertDialog = (props: AlertDialogProps) => {
    const alertRef = React.useRef<HTMLDivElement>(null)
    const [style, setStyle] = React.useState(``)
    const [icon, setIcon] = React.useState("")

    React.useEffect(() => {
        switch (props.type) {
            case AlertType.SUCCESS:
                setStyle(`${styles.grid} ${styles.success}`)
                setIcon("success")
                return;
            case AlertType.INFORMATION:
                setStyle(`${styles.grid} ${styles.info}`)
                setIcon("info")
                return;
            case AlertType.WARNING:
                setStyle(`${styles.grid} ${styles.warning}`)
                setIcon("warning")
                return;
            case AlertType.ERROR:
                setStyle(`${styles.grid} ${styles.error}`)
                setIcon("error")
                break;
            default:
                return;
        }
    }, [props.type])

    return (
        <div ref={alertRef} className={style}>
            <div className={styles.leadingGrid}>
                <Image src={`/alerts/${icon}.png`} alt="successful alert" width={30} height={30} />
                <div className={`${styles.texts}`}>
                    <span className={styles.title}>{props.title}</span>
                    <span className={styles.description}>{props.description}</span>
                </div>
            </div>
            <CloseButton onClick={props.onClick} shouldBeBlack={true} />
        </div>
    )
}

export default AlertDialog