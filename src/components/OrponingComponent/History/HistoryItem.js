import React from "react";
import { faTrash, faDownload, faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        const i = props.item;

        this.state = {
            processing: false
        };

        this.notifyError = props.notifyError;
        this.onRemove = () => props.onRemove(i.taskId);
        this.onDownload = () => props.onDownload(i.taskId);
    }

    componentDidUpdate() {
        if (this.props.item.status != "START" && this.state.processing) this.setState({ processing: false });
    }

    update = () => {
        if (this.state.processing) return;
        this.setState({ processing: true });
        this.props.onUpdate(this.props.item.taskId);
    }

    getColor(status) {
        if (status === "COMPLETED") return "text-success";
        if (status === "START") return "text-primary";
        if (status === "ERROR") return "text-danger";

        return "text-dark";
    }

    render() {
        const { status, message, id, countRecord, date, taskId, name } = this.props.item;
        const canDownload = status === "COMPLETED" && taskId;
        return (
            <tr className={this.getColor(status)} title={`${status} ${message}`}>
                <td className="text-center">{id}</td>
                <td className="text-center">{date}</td>
                <td>{name}</td>
                <td className="text-center">{countRecord}</td>
                <td className="text-center" >
                    {taskId && <FontAwesomeIcon icon={faSync} cursor="pointer" spin={this.state.processing} onClick={this.update} />}</td>
                <td className="text-center">
                    {canDownload && <FontAwesomeIcon cursor="pointer" icon={faDownload} onClick={this.onDownload} />}</td>
                <td className="text-center"><FontAwesomeIcon cursor="pointer" icon={faTrash} onClick={this.onRemove} /></td>
            </tr>
        );
    }
}