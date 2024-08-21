import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './TaskUpcoming.scss';

const TaskUpcoming = ({ tasks }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const toggleModal = () => setModalOpen(!modalOpen);

    const handleViewDetails = (task) => {
        setSelectedTask(task);
        toggleModal();
    };

    return (
        <div className="task-upcoming-container">
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="task-reminder">
                        <div className="task-info">
                            <p className="task-title">{task.title}</p>
                            <p className="task-deadline">
                                Deadline: {task.end_date} {task.end_time}
                            </p>
                        </div>
                        <Button
                            size="sm"
                            color="primary"
                            onClick={() => handleViewDetails(task)}
                        >
                            Chi tiết
                        </Button>
                    </li>
                ))}
            </ul>

            {selectedTask && (
                <Modal isOpen={modalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Chi tiết công việc</ModalHeader>
                    <ModalBody>
                        <p><strong>Title:</strong> {selectedTask.title}</p>
                        <p><strong>Description:</strong> {selectedTask.description}</p>
                        <p><strong>Deadline:</strong> {selectedTask.end_date} {selectedTask.end_time}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleModal}>Đóng</Button>
                    </ModalFooter>
                </Modal>
            )}
        </div>
    );
};

export default TaskUpcoming;
