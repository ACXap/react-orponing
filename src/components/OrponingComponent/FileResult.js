import React from "react";

export default class FileResult extends React.Component {
    render() {
        return (
            <div className="container border text-center p-3 mt-2">
                <a className="btn btn-primary" download={this.props.nameDownload} href={this.props.result}>Скачать</a>
            </div>
        );
    }
}