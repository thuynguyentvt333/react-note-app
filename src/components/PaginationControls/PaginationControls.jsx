import React, { useState, useEffect } from 'react';
import './PaginationControls.scss';

const PaginationControls = ({ data, pageSize, setPageSize, currentPage, setCurrentPage, setPaginatedData }) => {
    const totalPages = Math.ceil(data.length / pageSize);
    const [pageSizeOptions] = useState([2, 5, 10, 20]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedData = data.slice(startIndex, startIndex + pageSize);
        setPaginatedData(paginatedData);
    }, [data, currentPage, pageSize, setPaginatedData]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 7) {
            // nếu ít hơn 7 trang ==> hiển thị tất cả
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // hiển thị 2 trang đầu, 2 trang cuối, 3 trang ở giữa
            pageNumbers.push(1, 2);

            if (currentPage > 4) {
                pageNumbers.push('...');
            }

            const startPage = Math.max(3, currentPage - 1);
            const endPage = Math.min(totalPages - 2, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 3) {
                pageNumbers.push('...');
            }

            pageNumbers.push(totalPages - 1, totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="pagination-controls">
            <div className="pagination-buttons">
                <button
                    className="pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    &lt;
                </button>
                {renderPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={typeof page !== 'number'}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="pagination-button"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    &gt;
                </button>
            </div>
            <div className="page-size-selector">
                <select value={pageSize} onChange={handlePageSizeChange}>
                    {pageSizeOptions.map(size => (
                        <option key={size} value={size}>
                            {size} / page
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default PaginationControls;
