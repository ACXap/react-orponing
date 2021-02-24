import React from "react";
import { Button, Modal } from 'react-bootstrap';
import PropTypes from "prop-types";

export default class ModalB extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal show={this.props.isShow}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.onClose()}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
};