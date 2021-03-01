import React from "react";
import { serviceOrponingClipboard, history } from "../../init";

import ProcessingOrponing from "../ProcessingOrponing";
import FileResult from "./FileResult";
import PreviewOrponing from "./Preview/PreviewOrponing";

export default class FormClipboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            processing: false,
            countRow: serviceOrponingClipboard.getCountRow() ?? 0,
            previewList: serviceOrponingClipboard.getPreviewList() ?? [],
            resultFile: serviceOrponingClipboard.getResult() ?? ""
        }
        this.notifyError = props.notifyError;
        this.getResult = () => serviceOrponingClipboard.orponing();
        this.initListAddress = (data) => serviceOrponingClipboard.initListAddress(data);
    }

    orponing = async () => {
        if (this.state.countRow === 0 || this.state.processing) return;

        this.setState({ processing: true });
        const result = await this.getResult();
        if (result.error) this.notifyError(result.error, "Ошибка орпонизации адресов");
        this.setState({ resultFile: result.data, previewList: result.previewList, countRow: result.countRow, processing: false })
    }

    initList = async () => {
        if (this.state.processing || !navigator.clipboard) return;

        try {
            const data = await navigator.clipboard.readText();
            if (!data) throw new Error("В буфере обмена нет подходящих данных");
            const result = this.initListAddress(data);
            if (result.error) this.notifyError(result.error, "Ошибка обработки полученных данных");
            this.setState({ countRow: result.count, previewList: result.previewList, resultFile: "" });
        } catch (e) {
            this.notifyError(e.message, "Ошибка получения данных из буфера");
        }
    }

    render() {
        return (
            <div hidden={this.props.hidden}>
                <div className="d-flex p-5">
                    <button className="btn btn-primary" disabled={this.state.processing}
                        onClick={this.initList}>Вставить данные из буфера обмена</button>
                    <button className="btn btn-primary ms-auto" disabled={this.state.processing}
                        onClick={this.orponing}>Орпонизируй меня полностью</button>
                </div>
                <div className="px-2">Всего записей: {this.state.countRow}</div>

                { this.state.processing && <ProcessingOrponing message="Обработка запроса..." />}
                { this.state.resultFile && <FileResult result={this.state.resultFile} nameDownload="clipboard.csv" />}
                { this.state.previewList.length > 0 && <PreviewOrponing list={this.state.previewList} />}
            </div>
        )
    }
}