import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

export default class ProcessingOrponing extends React.Component {
    render() {
        return (
            <div className="text-center">
                <h5>{this.props.message}</h5>
                <Spinner animation="grow" variant="primary" />
            </div>
        );
    }
}

ProcessingOrponing.propTypes = {
    message: PropTypes.string.isRequired
}