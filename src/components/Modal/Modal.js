import React from "react";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
    render() {
        return (
            <div>
                <div className="modal" tabIndex="-1" style={{ display: this.props.isShow ? "block" : "none" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.title}</h5>
                            </div>
                            <div className="modal-body">
                                <p>{this.props.message}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={this.props.onClose}>Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop show"></div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
};