import Image from "next/image"
import styles from "../footer/Footer.module.css"
import FooterProps from "./interface"

const Footer = (props: FooterProps) => {
    return (
        <footer className={styles.footer}>
            <a
                href="https://odero.az"
                target="_blank"
                rel="noopener noreferrer"
            >
                Token Azerbaijan LLC &copy; 2022
            </a>
            <div className={styles.languages}>
                <div>
                    <Image src="/flags/az.svg" alt="Azerbaijani Flag Language" width={24} height={24} />
                </div>
                <div style={{ margin: "0 1rem" }}>
                    <Image src="/flags/ru.svg" alt="Russian Flag Language" width={24} height={24} />
                </div>
                <div>
                    <Image src="/flags/en.svg" alt="USA Flag Language" width={24} height={24} />
                </div>
            </div>
        </footer>
    )
}

export default Footer