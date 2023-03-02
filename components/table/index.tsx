import Image from 'next/image'
import styles from './Table.module.css'
import React from 'react'
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
                        <div
                            key={index}
                            className={styles.headerItem}
                            style={{ width: props.dimensions[index] }}>
                            <span className={styles.headerTitle} onClick={() => onClick(index)}>
                                {header}
                            </span>
                            {activeSort == index && <Image src={`/mui-icons/${descending ? 'descending' : 'ascending'}.svg`} alt="sort" width={30} height={30} />}
                        </div>
                    ))}
                </div>

                <div className={styles.body}>
                    {props.data.map((data: any, index: number) => (
                        <div key={index} className={styles.row}>
                            {Object.values(data.data).map((value: any, index: number) => (
                                <span
                                    key={index}
                                    className={styles.bodyItem}
                                    style={{ width: props.dimensions[index] }}
                                >
                                    {value}
                                </span>
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