import React from "react";
import HistoryItem from "./HistoryItem.js";
import { serviceHistory } from "../../../init.js";

export default class History extends React.Component {
    notifyError;

    constructor({ notifyError }) {
        super();

        this.state = {
            listHistory: serviceHistory.getHistory()
        }
        this.notifyError = notifyError;
        serviceHistory.handlerUpdateHistory = () => this.onUpdateHistory();
    }

    onUpdateHistory() {
        this.setState({ listHistory: new Map() });
        this.setState({ listHistory: serviceHistory.getHistory() });
    }

    componentDidMount() {
        console.log("load history");
    }

    removeItem(id) {
        serviceHistory.removeItem(id);
        //this.setState({ listHistory: ServiceHistory.getHistory() });
    }

    updateItem(id) {
        serviceHistory.updateItem(id);
        //this.setState({ listHistory: ServiceHistory.getHistory() });
    }

    render() {
        console.log("rend history");
        const list = Array.from(this.state.listHistory.values());
        return (
            <div id="div-form-history p-5">
                {list.length === 0 ?
                    <h3 className="text-center clear py-5">История пуста</h3>
                    :
                    <div className="p-5">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="col-0 text-center" scope="col">№</th>
                                    <th className="col-3 text-center" scope="col">Дата</th>
                                    <th className="col-6" scope="col">Что было</th>
                                    <th className="col-0 text-center" scope="col">Записей</th>
                                    <th className="col-0 text-center" scope="col">Статус</th>
                                    <th className="col-0 text-center" scope="col">Скачать</th>
                                    <th className="col-0 text-center" scope=" col">Удалить</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((i, index) => <HistoryItem item={i} key={index}
                                    onUpdate={() => this.updateItem(i.taskId)}
                                    onRemove={() => this.removeItem(i.taskId)} />)}
                            </tbody>
                        </table>
                    </div>}
            </div>
        );
    }
}