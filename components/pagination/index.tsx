import styles from './Pagination.module.css'
import SecondaryBack from '../secondary-back'
import SecondaryNext from '../secondary-next'
import PaginationProps from './interface'
import { PAGE_SIZE } from '../../constants'
import React from 'react'

const Pagination = (props: PaginationProps) => {

    const totalPages = Math.ceil(props.total / PAGE_SIZE)
    const [currentPage, setCurrentPage] = React.useState(1)

    return (
        <div className={styles.container}>
            <SecondaryBack onClick={() => {
                const pageWillSet = currentPage == 1 ? 1 : currentPage - 1;
                setCurrentPage(pageWillSet)
            }} />
            <span className={styles.total}>{currentPage} of {totalPages}</span>
            <SecondaryNext onClick={() => {
                const pageWillSet = currentPage >= totalPages ? currentPage : currentPage + 1;
                setCurrentPage(pageWillSet)
            }} />
        </div>
    )
}

export default Pagination