import React from "react";
import { faSync, faPlay, faServer, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { serviceOrponingComponent } from "../../init";

export default class OrponingComponentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.item.name,
            id: props.item.id,
            icon: props.item.icon,
            description: props.item.description,
            isStartable: props.item.isStartable,
            status: "STOP",
            message: "",
            dateStatus: new Date().toLocaleString(),
            isLoadStatus: false
        };
    }

    async componentDidMount() {
        this.updateStatus(() => serviceOrponingComponent.getStatusService(this.state.id));
    }

    async updateStatus(excute) {
        this.setState({ isLoadStatus: true });

        try {
            const result = await excute();
            this.setState({ isLoadStatus: false, status: result.status, message: result.message, dateStatus: result.dateStatus });
        } catch (e) {
            this.setState({ isLoadStatus: false, status: "ERROR", message: e.message, dateStatus: new Date() });
        }
    }

    clickSync() {
        this.updateStatus(() => serviceOrponingComponent.getStatusService(this.state.id));
    }

    clickStart() {
        this.updateStatus(() => serviceOrponingComponent.startService(this.state.id));
    }

    getIcon(icon) {
        if (icon === "server") return faServer;
        if (icon === "db") return faDatabase;

        return faServer;
    }

    getColor(status) {
        if (status === "START") return "green";
        if (status === "ERROR") return "red";
        if (status === "STOP") return "black";
        if (status === "NO_CONNECT") return "blue";
    }

    render() {
        return (
            <div className="col">
                <div className="card shadow p-3 mb-2">
                    <div className="m-5">
                        <FontAwesomeIcon icon={this.getIcon(this.state.icon)}
                            title={this.state.name} size="5x"
                            style={{ color: this.getColor(this.state.status) }} />
                    </div>

                    <div className="card-body">
                        <p className="card-text" title={this.state.description}>{this.state.name}</p>
                        <div>
                            <b>Статус: </b><span title={this.state.status}>{this.state.message}</span>
                            <br />
                            <b>Дата: </b><span>{this.state.dateStatus.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="container m-2">
                        <div className="row">
                            <div className="col-sm-6">
                                <FontAwesomeIcon icon={faSync}
                                    style={{ cursor: "pointer" }}
                                    spin={this.state.isLoadStatus}
                                    onClick={() => this.clickSync()}
                                    title="Обновить статус компонента" />
                            </div>
                            {this.state.isStartable ? <div className="col-sm-6">
                                <FontAwesomeIcon icon={faPlay}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => this.clickStart()}
                                    title="Запустить компонент" />
                            </div> : ""}
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}