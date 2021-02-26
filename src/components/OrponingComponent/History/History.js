import React from "react";
import { serviceHistory } from "../../../init";
import HistoryItem from "./HistoryItem";

export default class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listHistory: serviceHistory.getHistory()
        }
        this.notifyError = props.notifyError;
        serviceHistory.onUpdateHistory = (list) => this.onUpdateHistory(list);
    }

    onUpdateHistory(list) {
        this.setState({ listHistory: list });
    }

    removeItem(id) {
        serviceHistory.removeTask(id);
    }

    updateItem(id) {
        serviceHistory.updateStatusTask(id);
    }

    render() {
        const list = this.state.listHistory;

        return (
            <div hidden={this.props.hidden}>
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
                                {list.map((i) => <HistoryItem item={i} key={i.taskId}
                                    onUpdate={() => this.updateItem(i.taskId)}
                                    onRemove={() => this.removeItem(i.taskId)} />)}
                            </tbody>
                        </table>
                    </div>}
            </div>
        );
    }
}