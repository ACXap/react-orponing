import React, { useState } from "react";

class FileResult extends React.Component {

    constructor({ result }) {
        super();

        this.state = {
            result: result
        }
    }

    render() {
        return (
            <div className="container border text-center p-3 mt-2 result">
                <a className="btn btn-primary" download="load.csv" href={this.state.result}>Скачать</a>
            </div>
        )
    }
}

export default FileResult;