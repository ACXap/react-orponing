import React from "react";
import { serviceLog } from "../../init";

import LogItem from "./LogItem";
import PropTypes from "prop-types";

export default class Log extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            processing: false,
            log: "",
            listHistory: [],
            scrollTop: Number.MAX_SAFE_INTEGER
        }

        this.notifyError = props.notifyError;
        this.textLog = React.createRef();
    }

    async componentDidMount() {
        this.loadLog();
        this.loadAllLog();
    }

    componentDidUpdate() {
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight;;
    }

    async loadLog() {
        try {
            const log = await serviceLog.loadLog();
            this.setState({ log: log });
        } catch (e) {
            this.notifyError(e.message, "Ошибка загрузки текущего лога");
        }
    }

    async loadAllLog() {
        try {
            const log = await serviceLog.getAllLogs();
            this.setState({ listHistory: log });

        } catch (e) {
            this.notifyError(e.message, "Ошибка загрузки списка логов");
        }
    }

    async clearArchive() {
        const password = window.prompt("Укажите пароль для операции:");
        if (password) {
            const result = await serviceLog.clearArchive(password);

            if (result.status === "COMPLETED") {
                this.setState({ listHistory: [] });
            } else {
                this.notifyError(result.message, "Ошибка очистки логов");
            }
        }
    }

    async clickItemLog(log) {
        try {
            const l = await serviceLog.readLog(log);
            this.setState({ log: l, scrollTop: Number.MAX_SAFE_INTEGER });
        } catch (e) {
            this.notifyError(e.message, "Ошибка загрузки лога");
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
                            <textarea className="form-control p-2" ref={this.textLog} value={this.state.log} style={{ height: "600px" }}
                                onChange={() => { }} />
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

Log.propTypes = {
    notifyError: PropTypes.func.isRequired
}