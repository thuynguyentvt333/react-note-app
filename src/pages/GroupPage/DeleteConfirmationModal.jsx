import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const DeleteConfirmationModal = ({ isOpen, toggle, onConfirm, group }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="delete-confirmation-modal">
            <ModalHeader toggle={toggle}>Xác nhận xóa</ModalHeader>
            <ModalBody>
                Bạn có muốn xóa group: <strong>{group?.name}</strong>?
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={onConfirm}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteConfirmationModal;
