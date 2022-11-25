import Link from "next/link";
import styles from "../primary-link/PrimaryLink.module.css"
import PrimaryLinkProps from "./interface";

const PrimaryLink = (props: PrimaryLinkProps) => {
    return (
        props.href ?
            <Link href={props.href}>
                <span className={`${props.disabled ? styles.disabledLink : styles.link}`} onClick={props.onClick}>{props.label}</span>
            </Link> :
            <span className={`${props.disabled ? styles.disabledLink : styles.link}`} onClick={props.onClick} > {props.label}</span>
    )
}

export default PrimaryLink