import React from "react";
import { useMemo } from "react";

export const DOTS = '...';

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({totalCount, limit, siblingCount = 1, currentPage}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / limit);
        /*
        * Количество страниц для отображения: siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        * */
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        /*
          Показываем '...' слева в том случае если до leftShowIndex есть страницы,
          и справа если между totalPageCount и rightShowIndex есть хотя бы 1 страница
        */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        /*
        * Три случая: для показа '...' справа, слева и по обе стороны
        * */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

    }, [totalCount, limit, siblingCount, currentPage]);

    return paginationRange;
};
