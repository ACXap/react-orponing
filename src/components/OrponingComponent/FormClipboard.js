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
            countRow: 0,
            isShowPreview: false,
            previewList: [],
            resultFile: ""
        }

        this.notifyError = props.notifyError;
    }

    orponing = async () => {
        if (this.state.countRow === 0 || this.state.processing) return;

        try {
            this.setState({ processing: true });
            const result = await serviceOrponingClipboard.orponing();
            if (result.error) throw new Error(result.error);
            this.setState({ resultFile: result.data, isShowPreview: false, previewList: [], processing: false })
        } catch (e) {
            this.notifyError(e.message, "Ошибка орпонизации");
            this.setState({ processing: false, resultFile: "" })
        }
    }

    initListAddress = async () => {
        if (!navigator.clipboard || this.state.processing) return;

        try {
            const data = await navigator.clipboard.readText();
            if (!data) throw new Error("В буфере обмена нет подходящих данных");
            const result = serviceOrponingClipboard.initListAddress(data);
            if (result.error) throw new Error(result.error);
            this.setState({ countRow: result.count, isShowPreview: true, previewList: result.previewList });
        } catch (e) {
            this.notifyError(e.message, "Ошибка обработки данных");
            this.setState({ countRow: 0, isShowPreview: false, previewList: [] });
        }
    }

    render() {
        window.countRender++;
        console.log("render FormClipboard");

        return (
            <div hidden={this.props.hidden}>
                <div className="d-flex p-5">
                    <button className="btn btn-primary" type="button" disabled={this.state.processing}
                        onClick={this.initListAddress}>Вставить данные из буфера обмена</button>
                    <button className="btn btn-primary ms-auto" type="button" disabled={this.state.processing}
                        onClick={this.orponing}>Орпонизируй меня полностью</button>
                </div>
                <div className="px-2">Всего записей: {this.state.countRow}</div>

                { this.state.processing ? <ProcessingOrponing message="Обработка запроса..." /> : null}
                { this.state.resultFile ? <FileResult result={this.state.resultFile} nameDownload="clipboard.csv" /> : null}
                { this.state.isShowPreview ? <PreviewOrponing list={this.state.previewList} /> : null}
            </div>
        )
    }
}