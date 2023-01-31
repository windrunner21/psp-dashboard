import { useRouter } from "next/router"
import styles from "../back/Back.module.css"

const Back = () => {
    let router = useRouter()

    return (
        <span className={styles.button} onClick={() => router.back()}>&#8592; Back</span>
    )
}

export default Back