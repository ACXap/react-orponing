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
            processing: false
        };

        this.notifyError = props.notifyError;
        this.onRemove = () => props.onRemove(i.taskId);
        this.onUpdate = props.onUpdate;
    }

    componentDidUpdate() {
        if (this.props.item.status != "START" && this.state.processing) this.setState({ processing: false });
    }

    onDownload() {
        if (this.state.processing) return;
        console.log(this.state.id);
    }

    update = () => {
        if (this.state.processing) return;
        this.setState({ processing: true });
        this.onUpdate(this.state.taskId);
    }

    getColor(status) {
        if (status === "COMPLETED") return "text-success";
        if (status === "START") return "text-primary";
        if (status === "ERROR") return "text-danger";

        return "text-dark";
    }

    render() {
        const item = this.props.item;
        const canDownload = item.status === "COMPLETED" && item.taskId;
        return (
            <tr className={this.getColor(item.status)} title={`${item.status} ${item.message}`}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.date}</td>
                <td>{item.name}</td>
                <td className="text-center">{item.countRecord}</td>
                <td className="text-center" >
                    {item.taskId && <FontAwesomeIcon icon={faSync} cursor="pointer" spin={this.state.processing} onClick={this.update} />}</td>
                <td className="text-center">
                    {canDownload && <FontAwesomeIcon cursor="pointer" icon={faDownload} onClick={this.onDownload} />}</td>
                <td className="text-center"><FontAwesomeIcon cursor="pointer" icon={faTrash} onClick={this.onRemove} /></td>
            </tr>
        );
    }
}