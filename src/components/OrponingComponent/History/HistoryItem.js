import React from "react";
import { faTrash, faDownload, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class HistoryItem extends React.Component {
    constructor({ item, notifyError, onRemove, onUpdate }) {
        super();

        this.state = {
            id: item.id,
            status: item.status,
            name: item.name,
            taskId: item.taskId,
            countRecord: item.countRecord,
            date: item.date.toLocaleString("ru-RU"),
            isProcessing: false
        };

        this.notifyError = notifyError
        this.onRemove = onRemove;
        this.onUpdate = onUpdate;
    }

    onDownload() {
        console.log(this.state.id);
    }

    update() {
        this.setState({ isProcessing: true });
        this.onUpdate();
    }

    render() {
        return (
            <tr>
                <td className="text-center">{this.state.id}</td>
                <td className="text-center">{this.state.date}</td>
                <td>{this.state.name}</td>
                <td className="text-center" >{this.state.countRecord}</td>
                <td className="text-center" ><FontAwesomeIcon icon={faSync} spin={this.state.isProcessing} onClick={() => this.update()} /></td>
                <td className="text-center">{this.state.status === "COMPLETED" ? <FontAwesomeIcon icon={faDownload} onClick={() => this.onDownload()} /> : ""} </td>
                <td className="text-center"><FontAwesomeIcon icon={faTrash} onClick={() => this.onRemove()} /></td>
            </tr>
        );
    }
}