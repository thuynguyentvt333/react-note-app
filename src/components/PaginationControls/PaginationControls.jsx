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
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
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
