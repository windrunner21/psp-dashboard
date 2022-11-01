import Image from "next/image";
import styles from "../primary-link/PrimaryLink.module.css"
import PrimaryLinkProps from "./interface";

const PrimaryLink = (props: PrimaryLinkProps) => {
    return (
        <a href={props.href} className={`${props.disabled ? styles.disabledLink : styles.link}`} onClick={props.onClick}>{props.label}</a>
    )
}

export default PrimaryLink