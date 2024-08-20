import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import './NoteDetailModal.scss';

const NoteDetailModal = ({ isOpen, toggle, note }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="note-detail-modal">
            <ModalHeader toggle={toggle}>Note Details</ModalHeader>
            <ModalBody>
                {note ? (
                    <div>
                        <p><strong>Title:</strong> {note.title}</p>
                        <div className="note-content">
                            <p><strong>Content:</strong></p>
                            <div className="content-box">
                                {note.content}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No note selected</p>
                )}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default NoteDetailModal;
