import styles from './Status.module.css'
import StatusProps from "./interface";
import Image from 'next/image';

const Status = (props: StatusProps) => {
    return (
        <div className={`${styles.container} ${props.style}`}>
            <Image src={`/mui-icons/${props.icon}.svg`} alt="icon" width={15} height={15} />
            <div style={{ width: "0.25rem" }} />
            {props.label}
        </div>
    )
}

export default Status