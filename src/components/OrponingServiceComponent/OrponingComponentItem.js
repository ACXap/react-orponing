import React from "react";
import { faSync, faPlay, faServer, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { serviceOrponingComponent } from "../../init";

export default class OrponingComponentItem extends React.PureComponent {
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
            processing: true
        };
    }

    async componentDidMount() {
        this.updateStatus((id) => serviceOrponingComponent.getStatusService(id));
    }

    async updateStatus(excute) {
        this.setState({ processing: true });

        try {
            const result = await excute(this.state.id);
            this.setState({ processing: false, status: result.status, message: result.message, dateStatus: result.dateStatus });
        } catch (e) {
            debugger
            this.setState({ processing: false, status: "ERROR", message: e.message, dateStatus: new Date() });
        }
    }

    clickSync = () => {
        if (this.state.processing) return;
        this.updateStatus((id) => serviceOrponingComponent.getStatusService(id));
    }
    clickStart = () => {
        if (this.state.processing) return;
        this.updateStatus((id) => serviceOrponingComponent.startService(id));
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
        window.countRender++;
        console.log("render OrponingComponentItem");

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
                                    cursor="pointer"
                                    spin={this.state.processing}
                                    onClick={this.clickSync}
                                    title="Обновить статус компонента" />
                            </div>
                            {this.state.isStartable ? <div className="col-sm-6">
                                <FontAwesomeIcon icon={faPlay} cursor="pointer"
                                    onClick={this.clickStart}
                                    title="Запустить компонент" />
                            </div> : ""}
                        </div>
                    </div>
                </div >
            </div >
        );
    }
}