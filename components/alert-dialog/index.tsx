import CloseButton from "../close-button"
import AlertDialogProps from "./interface"
import styles from "../alert-dialog/AlertDialog.module.css"
import React from "react";
import Image from 'next/image'

const AlertDialog = (props: AlertDialogProps) => {
    const alertRef = React.useRef<HTMLDivElement>(null)


    React.useEffect(() => {
        const timer = setTimeout(() => {
            props.onClick()
        }, props.delay);
        return () => clearTimeout(timer)
    }, [props])

    return (
        <div ref={alertRef} className={`${styles.grid} ${props.style}`}>
            <div className={styles.leadingGrid}>
                <Image src={`/alerts/${props.type}.png`} alt="successful alert" width={30} height={30} />
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