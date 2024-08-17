import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import './ImageModal.scss';

const ImageModal = ({ isOpen, toggle, imageSrc }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="image-modal" centered>
            <ModalBody>
                <img src={imageSrc} alt="Large View" className="full-size-image" />
            </ModalBody>
        </Modal>
    );
};

export default ImageModal;
