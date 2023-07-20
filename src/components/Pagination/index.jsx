import React from 'react';
import classes from "./style.module.css";
import {ReactComponent as ArrowIcon} from "./arrow.svg";
import {Link} from "react-router-dom";
import {DOTS, usePagination} from "../../hooks/usePaginate";

const Pagination = ({onPageChange, totalCount, siblingCount = 1, currentPage = 1, limit = 10}) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        limit
    });

    if (currentPage === 0 || paginationRange?.length < 2) {
        return null;
    }

    let lastPage = paginationRange?.[paginationRange?.length - 1];
    const onNext = () => {
        if (currentPage + 1 <= lastPage) {
            onPageChange(currentPage + 1);
        }
    };
    const onPrevious = () => {
        if (currentPage - 1 > 0) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <div className={classes.pages}>
            {
                paginationRange ? <>
                        <Link to="#" onClick={onPrevious}
                              className={`${classes.page__link} ${classes.page__prev}`}><ArrowIcon/></Link>
                        {paginationRange.map(page => {
                            if (page === DOTS) {
                                return <div className={classes.page__link}>&#8230;</div>;
                            }
                            return (
                                <Link to="#" onClick={() => onPageChange(page)}
                                      className={page === currentPage ? `${classes.page__link} ${classes.active}` : `${classes.page__link}`}>{page}</Link>
                            );
                        })}
                        <Link to="#" onClick={onNext}
                              className={`${classes.page__link} ${classes.page__next} ${classes.page__link__icon}`}><ArrowIcon/></Link>
                    </>
                    : null}
        </div>
    );
};

export default Pagination;
