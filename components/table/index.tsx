import Image from 'next/image'
import styles from './Table.module.css'
import React from 'react'
import Link from 'next/link'
import TableProps from './interface'
import Pagination from '../pagination'

const Table = (props: TableProps) => {
    const [activeSort, setActiveSort] = React.useState(0);
    const [descending, setDescending] = React.useState(true)

    function onClick(index: number) {
        setActiveSort(index)
        setDescending(!descending)
    }

    return (
        <div className={styles.container}>
            <div className={styles.table}>
                <div className={styles.header}>
                    {props.headers.map((header: string, index: number) => (
                        <span
                            key={index}
                            className={`${styles.headerItem} ${activeSort == index && styles.headerActive}`}
                            onClick={() => onClick(index)}
                            style={{ width: props.customWidthIndex == index ? props.customWidth : props.width }}
                        >
                            {header} {activeSort == index && <Image src={`/mui-icons/${descending ? 'descending' : 'ascending'}.svg`} alt="sort" width={30} height={30} />}
                        </span>
                    ))}
                </div>
                <div className={styles.body}>
                    {props.data.map((data: any, index: number) => (
                        data.href ?
                            <Link key={index} href={data.href}>
                                <div className={`${data.href ? styles.row : styles.simpleRow} ${index % 2 == 0 && styles.zebra}`}>
                                    {Object.values(data.data).map((value: any, index: number) => (
                                        <span key={index} className={styles.bodyItem} style={{ width: props.customWidthIndex == index ? props.customWidth : props.width }}>{value}</span>
                                    ))}
                                </div>
                            </Link> :
                            <div key={index} className={`${data.href ? styles.row : styles.simpleRow} ${index % 2 == 0 && styles.zebra}`}>
                                {Object.values(data.data).map((value: any, index: number) => (
                                    <span key={index} className={styles.bodyItem} style={{ width: props.customWidthIndex == index ? props.customWidth : props.width }}>{value}</span>
                                ))}
                            </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <Pagination total={props.data.length} />
                </div>
            </div>
        </div>
    )
}

export default Table