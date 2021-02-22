import React from "react";

export default class ProcessingOrponing extends React.Component {
    constructor(props) {
        super();

        this.message = props.message;
    }

    render() {
        return (
            <div className="processing row py-2 text-center">
                <div className="container">
                    <h5>{this.message}</h5>
                    <div className="spinner-grow text-primary" role="status"></div>
                </div>
            </div>
        )
    }
}