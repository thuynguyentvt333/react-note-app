import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Table, Button } from 'reactstrap';
import { FaSort, FaTrash, FaEdit } from 'react-icons/fa';
import TaskDetailModal from './Modal/TaskDetailModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import './TaskPage.scss';
import { useNavigate } from 'react-router-dom';
import TaskControls from './TaskControls/TaskControls';
import PaginationControls from '../../components/PaginationControls/PaginationControls';

const TaskPage = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [paginatedTasks, setPaginatedTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteMultiple, setDeleteMultiple] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const navigate = useNavigate();

    const statusMap = {
        1: 'Todo',
        2: 'Doing',
        3: 'Done'
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = () => {
        axios.get(`http://localhost:5000/tasks?account_id=${user.id}`)
            .then(response => {
                setTasks(response.data);
                setFilteredTasks(response.data); // Initialize with all tasks
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);

    const handleNewTask = () => {
        navigate('/app/tasks/new');
    };

    const handleEditTask = (task) => {
        navigate(`/app/tasks/edit/${task.id}`);
    };

    const handleViewTask = (task) => {
        setSelectedTask(task);
        toggleModal();
    };

    const handleDeleteTask = (task) => {
        setSelectedTask(task);
        setDeleteMultiple(false);
        toggleDeleteModal();
    };

    const confirmDeleteTask = () => {
        if (deleteMultiple) {
            axios.all(selectedTasks.map(taskId => axios.delete(`http://localhost:5000/tasks/${taskId}`)))
                .then(() => {
                    fetchTasks();
                    toggleDeleteModal();
                    setSelectedTasks([]);
                })
                .catch(error => {
                    console.error('Error deleting tasks:', error);
                });
        } else {
            axios.delete(`http://localhost:5000/tasks/${selectedTask.id}`)
                .then(() => {
                    fetchTasks();
                    toggleDeleteModal();
                })
                .catch(error => {
                    console.error('Error deleting task:', error);
                });
        }
    };

    const handleSelectTask = (taskId) => {
        if (selectedTasks.includes(taskId)) {
            setSelectedTasks(selectedTasks.filter(id => id !== taskId));
        } else {
            setSelectedTasks([...selectedTasks, taskId]);
        }
    };

    const handleSelectAllTasks = () => {
        if (selectedTasks.length === paginatedTasks.length) {
            setSelectedTasks([]);
        } else {
            setSelectedTasks(paginatedTasks.map(task => task.id));
        }
    };

    const handleDeleteMultipleTasks = () => {
        setDeleteMultiple(true);
        toggleDeleteModal();
    };

    return (
        <div className="task-page">
            <TaskControls
                tasks={tasks}
                setFilteredTasks={setFilteredTasks}
                handleSelectAll={handleSelectAllTasks}
                handleDeleteMultiple={handleDeleteMultipleTasks}
                handleNewItem={handleNewTask}
                selectedItemsCount={selectedTasks.length}
                totalItemsCount={filteredTasks.length}
            />
            <Table className="task-table" hover>
                <thead>
                    <tr>
                        <th><input type="checkbox" onChange={handleSelectAllTasks} checked={selectedTasks.length === paginatedTasks.length} /></th>
                        <th>Status <FaSort /></th>
                        <th>Task Name <FaSort /></th>
                        <th>Description <FaSort /></th>
                        <th>Priority <FaSort /></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedTasks.map(task => (
                        <tr key={task.id}>
                            <td><input type="checkbox" checked={selectedTasks.includes(task.id)} onChange={(e) => { e.stopPropagation(); handleSelectTask(task.id); }} /></td>
                            <td onClick={() => handleViewTask(task)} style={{ cursor: 'pointer' }}>{statusMap[task.status_id]}</td>
                            <td onClick={() => handleViewTask(task)} style={{ cursor: 'pointer' }}>{task.title}</td>
                            <td onClick={() => handleViewTask(task)} style={{ cursor: 'pointer' }}>{task.description}</td>
                            <td onClick={() => handleViewTask(task)} style={{ cursor: 'pointer' }}>
                                <span className={task.priority_id === 1 ? 'high' : task.priority_id === 2 ? 'medium' : 'low'}>
                                    {task.priority_id === 1 ? 'High' : task.priority_id === 2 ? 'Medium' : 'Low'}
                                </span>
                            </td>
                            <td className='action'>
                                <Button size="sm" color="info" className="action-button" onClick={() => handleEditTask(task)}>
                                    <FaEdit />
                                </Button>
                                <Button size="sm" color="danger" className="action-button" onClick={() => handleDeleteTask(task)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <PaginationControls
                data={filteredTasks}
                pageSize={pageSize}
                setPageSize={setPageSize}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setPaginatedData={setPaginatedTasks}
            />
            <div className="task-footer">
                <span>Count {filteredTasks.length}</span>
            </div>

            <TaskDetailModal
                isOpen={modalOpen}
                toggle={toggleModal}
                task={selectedTask}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                toggle={toggleDeleteModal}
                onConfirm={confirmDeleteTask}
                multiple={deleteMultiple}
            />
        </div>
    );
};

export default TaskPage;
