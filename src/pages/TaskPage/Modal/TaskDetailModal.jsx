import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './TaskDetailModal.scss';

const TaskDetailModal = ({ isOpen, toggle, task }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="task-detail-modal">
            <ModalHeader toggle={toggle}>Task Details</ModalHeader>
            <ModalBody>
                {task ? (
                    <div>
                        <p><strong>Task Name:</strong> {task.title}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Status:</strong> {task.status_id}</p>
                        <p><strong>Priority:</strong> {task.priority_id === 1 ? 'High' : task.priority_id === 2 ? 'Medium' : 'Low'}</p>
                        <p><strong>Group:</strong> {task.group_id ? `Group ${task.group_id}` : 'No Group'}</p>
                        <p><strong>Parent Task:</strong> {task.parent_id ? `Task ${task.parent_id}` : 'No Parent'}</p>
                        <p><strong>Start Date:</strong> {task.start_date}</p>
                        <p><strong>End Date:</strong> {task.end_date}</p>
                        <p><strong>Start Time:</strong> {task.start_time}</p>
                        <p><strong>End Time:</strong> {task.end_time}</p>
                    </div>
                ) : (
                    <p>No task selected</p>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default TaskDetailModal;
