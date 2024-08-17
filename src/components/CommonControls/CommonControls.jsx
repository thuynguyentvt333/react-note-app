import React from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import { FaPlus, FaSearch, FaTasks, FaStickyNote, FaTrash } from 'react-icons/fa';
import './CommonControls.scss';

const CommonControls = ({
    searchTerm,
    handleSearch,
    handleSelectAll,
    handleDeleteMultiple,
    handleNewItem,
    selectedItemsCount,
    totalItemsCount,
    type,
    startDateFilter,
    handleDateFilter
}) => {
    return (
        <div className="common-controls">
            <div className='controls-left'>
                <Button color="primary" onClick={handleSelectAll}>
                    {type === 'task' ? <FaTasks /> : <FaStickyNote />} 
                    {selectedItemsCount === totalItemsCount ? ' Unselect All' : ` All ${type === 'task' ? 'Tasks' : 'Notes'}`}
                </Button>
                {selectedItemsCount > 0 && (
                    <Button color="danger" className="delete-multiple-button" onClick={handleDeleteMultiple}>
                        <FaTrash /> Delete Selected
                    </Button>
                )}
            </div>
            <div className='controls-right'>
                {type === 'task' &&
                    <Input
                        type="date"
                        value={startDateFilter}
                        onChange={handleDateFilter}
                        className="date-filter"
                    />
                }
                <InputGroup className="search-bar">
                    <Input
                        placeholder={`Search ${type === 'task' ? 'tasks' : 'notes'}...`}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Button>
                        <FaSearch />
                    </Button>
                </InputGroup>
                <Button color="primary" className="new-item-button" onClick={handleNewItem}>
                    <FaPlus /> New
                </Button>
            </div>
        </div>
    );
};

export default CommonControls;
