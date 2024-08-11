import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Table, InputGroup, Input, Button } from 'reactstrap';
import { FaSort, FaSearch, FaPlus, FaTasks } from 'react-icons/fa';
import './TaskPage.scss';

const TaskPage = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
        axios.get(`http://localhost:5000/tasks?account_id=${user.id}`)
            .then(response => {
                setTasks(response.data);
        })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
        }
    }, [user]);

    return (
        <div className="task-page">
            <div className="task-header">
                <h3>Task List</h3>
                <div className="task-controls">
                    <div className='controls-left'>
                        <FaTasks />
                        All tasks
                    </div>
                    <div className='controls-right'>
                        <InputGroup className="search-bar">
                            <Input placeholder="Search tasks..." />
                            <Button>
                            <FaSearch />
                            </Button>
                        </InputGroup>
                        <Button color="primary" className="new-task-button">
                            <FaPlus /> New
                        </Button>
                    </div>
                </div>
            </div>
            <Table className="task-table" hover>
                <thead>
                <tr>
                    <th>Status <FaSort /></th>
                    <th>Task Name <FaSort /></th>
                    <th>Description <FaSort /></th>
                    <th>Priority <FaSort /></th>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                    <td><input type="checkbox" /></td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                        <span className={task.priority_id === 1 ? 'high' : task.priority_id === 2 ? 'medium' : 'low'}>
                            {task.priority_id === 1 ? 'High' : task.priority_id === 2 ? 'Medium' : 'Low'}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="task-footer">
                <span>Count {tasks.length}</span>
            </div>
        </div>
    );
}

export default TaskPage;
