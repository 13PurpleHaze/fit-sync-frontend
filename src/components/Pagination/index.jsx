import React, {useContext, useState} from 'react';
import classes from "./style.module.css";
import { ReactComponent as ArrowIconn } from "./style.module.css";
import {StoreContext} from "../../store";

const Pagination = ({totalCount, limit, pageNeighbours}) => {
    const ctx = useContext(StoreContext);
    const totalPages = Math.ceil(totalCount / limit);
    const [currPage, setCurrPage] = useState();
    this.pageNeighbours = typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;
    return (
        <div className={classes.pages}>
            ctx.
        </div>
    );
};

export default Pagination;
