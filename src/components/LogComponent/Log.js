import React from "react";
import PropTypes from "prop-types";
import { serviceLog } from "../../init";

import LogItem from "./LogItem";
import ProcessingOrponing from "../ProcessingOrponing";

export default class Log extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            processing: false,
            log: "",
            listHistory: []
        }

        this.notifyError = props.notifyError;
        this.textLog = React.createRef();
    }

    async componentDidMount() {
        this.loadLogForToday();
        this.loadListLog();
    }

    componentDidUpdate() {
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight;;
    }

    async loadLogForToday() {
        this.setState({ processing: true });

        try {
            const log = await serviceLog.loadLog();
            this.setState({ log: log });
        } catch (e) {
            this.setState({ log: "" });
            this.notifyError(e.message, "Ошибка загрузки текущего лога");
        } finally {
            this.setState({ processing: false });
        }
    }

    async loadListLog() {
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
            this.setState({ processing: true });

            try {
                const result = await serviceLog.clearArchive(password);

                if (result.status === "COMPLETED") {
                    this.setState({ listHistory: [] });
                } else {
                    this.notifyError(result.message, "Ошибка очистки логов");
                }
            } catch (e) {
                this.notifyError(e.message, "Ошибка очистки логов");
            } finally {
                this.setState({ processing: false });
            }
        }
    }

    async clickItemLog(log) {
        this.setState({ processing: true });
        try {
            const l = await serviceLog.readLog(log);
            this.setState({ log: l, processing: false });
        } catch (e) {
            this.setState({ log: "", processing: false });
            this.notifyError(e.message, "Ошибка загрузки лога");
        }
    }

    render() {
        const listLog = this.state.listHistory.map((i, index) => <LogItem item={i} onClickItem={() => this.clickItemLog(i)} key={index} />);

        return (
            <div className="container p-5 shadow-lg">
                <div className="row p-5 text-center">
                    <h2>События у сервиса орпонизации</h2>
                </div>
                <div className="container border border-primary">
                    <div className="row p-2">

                        <div className="col-sm-10 px-1">
                            <textarea className="form-control p-2" ref={this.textLog} value={this.state.log} style={{ height: "600px" }}
                                onChange={() => { }} />
                            {this.state.processing ? <ProcessingOrponing message="Обработка запроса..." /> : ""}
                        </div>

                        <div className="col-sm-2 px-1 border d-flex flex-column">
                            <div className="d-flex justify-content-center pt-2">
                                <h3>Архив</h3>
                            </div>
                            <div className="overflow-auto text-center" style={{ maxHeight: "470px" }}>
                                {listLog}
                            </div>

                            <div className="mt-auto mx-auto p-2">
                                <button className="btn btn-primary" type="button" onClick={() => this.clearArchive()}>Очистить архив</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row p-5">
                    <button className="btn btn-primary" type="button" onClick={() => this.loadLogForToday()}>Что случилось сегодня?</button>
                </div>
            </div >
        );
    }
}

Log.propTypes = {
    notifyError: PropTypes.func.isRequired
}