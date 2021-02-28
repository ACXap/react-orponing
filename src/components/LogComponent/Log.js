import React from "react";
import PropTypes from "prop-types";
import { serviceLog } from "../../init";

import LogItem from "./LogItem";
import ProcessingOrponing from "../ProcessingOrponing";
import HeaderPage from "../HeaderPage";
import { Button } from "react-bootstrap";

export default class Log extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            processing: true,
            log: "",
            listHistory: []
        }

        this.notifyError = props.notifyError;
        this.textLog = React.createRef();
    }

    async componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight;;
    }

    init = async () => {
        this.setState({ processing: true });

        try {
            const [logText, logAll] = await Promise.all([serviceLog.loadLog(), serviceLog.getAllLogs()]);
            this.setState({ log: logText, listHistory: logAll, processing: false });
        } catch (e) {
            this.setState({ log: "", listHistory: [], processing: false });
            this.notifyError(e.message, "Ошибка загрузки логов");
        }
    }

    clearArchive = async () => {
        if (this.state.processing) return;
        const password = window.prompt("Укажите пароль для операции:");
        if (!password) return;

        this.setState({ processing: true });

        try {
            const result = await serviceLog.clearArchive(password);
            if (result.status != "COMPLETED") throw new Error(result.message);
            this.setState({ listHistory: [], processing: false });
        } catch (e) {
            this.setState({ processing: false });
            this.notifyError(e.message, "Ошибка очистки логов");
        }
    }

    clickItemLog = async (log) => {
        if (this.state.processing) return;
        this.setState({ processing: true });

        try {
            const logText = await serviceLog.readLog(log);
            this.setState({ log: logText, processing: false });
        } catch (e) {
            this.setState({ log: "", processing: false });
            this.notifyError(e.message, "Ошибка загрузки лога");
        }
    }

    render() {
        const listLog = this.state.listHistory.map((i, index) => <LogItem item={i} onClickItem={this.clickItemLog} key={index} />);

        return (
            <div className="container p-5 shadow-lg">
                <HeaderPage header="События у сервиса орпонизации" />
                <div className="container border border-primary">
                    <div className="row p-2">
                        <div className="col-sm-10 px-1 d-flex align-items-center justify-content-center">
                            <textarea className="form-control p-2" ref={this.textLog} defaultValue={this.state.log} style={{ height: "600px", minHeight: "600px" }} />
                            {this.state.processing ? <div className="position-absolute"><ProcessingOrponing message="Обработка запроса..." /></div> : ""}
                        </div>
                        <div className="col-sm-2 px-1 border d-flex flex-column">
                            <div className="text-center pt-2">
                                <h3>Архив</h3>
                            </div>
                            <div className="overflow-auto text-center" style={{ maxHeight: "470px" }}>
                                {listLog}
                            </div>
                            <div className="mt-auto mx-auto p-2">
                                <Button disabled={this.state.processing} onClick={this.clearArchive} children="Очистить архив" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-5">
                    <Button disabled={this.state.processing} onClick={this.init} children="Что случилось сегодня?" />
                </div>
            </div >
        );
    }
}

Log.propTypes = {
    notifyError: PropTypes.func.isRequired
}