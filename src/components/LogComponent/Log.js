import React from "react";
import ServiceLog from "../../services/ServiceLog";
import LogItem from "./LogItem";
import PropTypes from "prop-types";

export default class Log extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            processing: false,
            log: "",
            listHistory: []
        }

        this.notifyError = props.notifyError;
    }

    async componentDidMount() {
        this.loadLog();
        this.loadAllLog();
    }

    async loadLog() {
        try {
            const log = await ServiceLog.loadLog();
            this.setState({ log: log });
        } catch (e) {
            this.state.notifyError(e.message);
        }
    }

    async loadAllLog() {
        try {
            const log = await ServiceLog.getAllLogs();
            this.setState({ listHistory: log });
        } catch (e) {
            this.state.notifyError(e.message);
        }
    }

    async clearArchive() {
        const password = window.prompt("Укажите пароль для операции:");
        if (password) {
            const result = await ServiceLog.clearArchive(password);

            if (result.status === "COMPLETED") {
                this.setState({ listHistory: [] });
            } else {
                this.state.notifyError(result.message);
            }
        }
    }

    onChange(e) { }

    async clickItemLog(log) {
        try {
            const l = await ServiceLog.readLog(log);
            this.setState({ log: l });
        } catch (e) {
            this.state.notifyError(e.message);
        }
    }

    render() {
        return (
            <div className="container py-5 shadow-lg p-5">
                <div className="row p-5 text-center">
                    <h2>События у сервиса орпонизации</h2>
                </div>

                <div className="container border border-primary">
                    <div className="row p-2">
                        <div className="col-sm-10 px-1">
                            <textarea className="form-control p-2" value={this.state.log} style={{ height: "600px" }}
                                onChange={(e) => this.onChange(e)} />
                        </div>

                        <div className="col-sm-2 px-1 border d-flex flex-column">
                            <div className="d-flex justify-content-center pt-2">
                                <h3>Архив</h3>
                            </div>
                            <div className="overflow-auto text-center" style={{ maxHeight: "470px" }}>
                                {this.state.listHistory.map((i, index) => <LogItem item={i} onClickItem={() => this.clickItemLog(i)} key={index} />)}
                            </div>

                            <div className="mt-auto mx-auto p-2">
                                <button className="btn btn-primary" type="button" onClick={() => this.clearArchive()}>Очистить архив</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-5">
                    <button className="btn btn-primary" type="button" onClick={() => this.loadLog()}>Что случилось сегодня?</button>
                </div>
            </div >
        );
    }
}

    Log.prototype={
    notifyError: PropTypes.func.isRequired
}