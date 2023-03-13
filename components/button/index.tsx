import Image from "next/image"
import styles from "./Button.module.css"
import ButtonProps from "./interface"

const Button = (props: ButtonProps) => {
    return (
        <button
            style={{ backgroundColor: props.backgroundColor, color: props.color, borderRadius: props.borderRadius, padding: props.padding, fontSize: props.size, border: props.border }}
            className={styles.button}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <div className={styles.content}>
                {props.icon && <Image className={styles.icon} src={`/mui-icons/${props.icon}.svg`} alt="icon" width={15} height={15} />}
                {props.label}
            </div>
        </button>
    )
}

export default Button