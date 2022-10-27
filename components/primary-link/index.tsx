import Image from "next/image";
import styles from "../primary-link/PrimaryLink.module.css"
import PrimaryLinkProps from "./interface";

const PrimaryLink = (props: PrimaryLinkProps) => {
    return (
        <a href={props.href} className={styles.link}>{props.label}</a>
    )
}

export default PrimaryLink