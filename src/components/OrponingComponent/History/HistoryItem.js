import React from "react";
import { faTrash, faDownload, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        const i = props.item;

        this.state = {
            id: i.id,
            status: i.status,
            name: i.name,
            taskId: i.taskId,
            countRecord: i.countRecord,
            date: i.date,
            isProcessing: false
        };

        this.notifyError = props.notifyError
        this.onRemove = props.onRemove;
        this.onUpdate = props.onUpdate;
    }

    componentDidUpdate() {
        if (this.props.item.status != "START" && this.state.isProcessing) this.setState({ isProcessing: false });
    }

    onDownload() {
        console.log(this.state.id);
    }

    update() {
        this.setState({ isProcessing: true });
        this.onUpdate();
    }

    getColor(status) {
        if (status === "COMPLETED") return "text-success";
        if (status === "START") return "text-primary";
        if (status === "ERROR") return "text-danger";

        return "text-dark";
    }

    render() {
        const item = this.props.item;
        return (
            <tr className={this.getColor(item.status)}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.date}</td>
                <td>{item.name}</td>
                <td className="text-center" >{item.countRecord}</td>
                <td className="text-center" >
                    {item.taskId ? <FontAwesomeIcon icon={faSync} spin={this.state.isProcessing} onClick={() => this.update()} /> : ""}</td>
                <td className="text-center">
                    {(item.status === "COMPLETED" && item.taskId) ? <FontAwesomeIcon icon={faDownload} onClick={() => this.onDownload()} /> : ""} </td>
                <td className="text-center"><FontAwesomeIcon icon={faTrash} onClick={() => this.onRemove()} /></td>
            </tr>
        );
    }
}