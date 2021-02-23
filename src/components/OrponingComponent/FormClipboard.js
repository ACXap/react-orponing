import React from "react";
import ProcessingOrponing from "../ProcessingOrponing.js";
import FileResult from "./FileResult.js";
import ServiceOrponingClipboard from "../../services/ServiceOrponingClipboard.js";
import PreviewOrponing from "./PreviewOrponing.js";

export default class FormClipboard extends React.Component {
    constructor({ notifyError }) {
        super();

        this.state = {
            processing: false,
            countRow: 0,
            isShowPreview: false,
            previewList: [],
            resultFile: "",
            notifyError: notifyError
        }
    }

    async orponing() {

        const { countRow } = this.state;
        if (countRow === 0) return;

        try {
            this.setState({ processing: true });

            const result = await ServiceOrponingClipboard.orponing();
            if (result.error) {
                this.state.notifyError(result.error);
                this.setState({ processing: false, resultFile: "" })
            } else {
                this.setState({ resultFile: result.data, isShowPreview: false, previewList: [], processing: false })
            }
        } catch (e) {
            this.state.notifyError(e.message);
        }
    }

    async initListAddress() {
        if (navigator.clipboard) {
            const data = await navigator.clipboard.readText();

            if (data) {
                this.setState({ isShowPreview: false });
                const result = ServiceOrponingClipboard.initListAddress(data);
                if (result.error) {
                    this.state.notifyError(result.error);
                    this.setState({ countRow: 0, isShowPreview: false, previewList: [] });
                } else {
                    this.setState({ countRow: result.count, isShowPreview: true, previewList: result.previewList });

                }
            } else {
                this.state.notifyError("В буфере обмена нет подходящих данных");

            }
        }
    }

    render() {
        console.log("rend formClipboard");
        return (
            <div id="div-form-clipboard">
                <div className="d-flex p-5">
                    <button className="btn btn-primary" type="button" id="input-clipboard" onClick={() => this.initListAddress()}>Вставить данные из буфера
                                обмена</button>
                    <button className="btn btn-primary ms-auto start" type="button"
                        id="orponing-clipboard" onClick={() => this.orponing()}>Орпонизируй меня полностью</button>
                </div>
                <div className="count-address px-2">Всего записей: {this.state.countRow}</div>

                { this.state.processing ? <ProcessingOrponing message="Обработка запроса..." /> : ""}
                { this.state.resultFile ? <FileResult result={this.state.resultFile} /> : ""}
                { this.state.isShowPreview ? <PreviewOrponing list={this.state.previewList} /> : ""}
            </div>
        )
    }
}