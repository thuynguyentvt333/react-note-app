import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const DeleteConfirmationModal = ({ isOpen, toggle, onConfirm, multiple }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="delete-confirmation-modal">
            <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
            <ModalBody>
                {multiple
                    ? 'Bạn có muốn xóa các task được chọn?'
                    : 'Bạn có muốn xóa task này không?'}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={onConfirm}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default DeleteConfirmationModal;
