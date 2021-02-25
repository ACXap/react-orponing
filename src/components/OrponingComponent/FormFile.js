import React from "react";
import { serviceOrponingFile } from "../../init";

import ProcessingOrponing from "../ProcessingOrponing";
import FileResult from "./FileResult";
import PreviewOrponing from "./Preview/PreviewOrponing";

export default class FormFile extends React.Component {
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

    async orponing() {
        if (this.state.countRow === 0) return;

        try {
            this.setState({ processing: true });
            const result = await serviceOrponingFile.orponing();
            if (result.error) throw new Error(result.error);

            this.setState({ resultFile: result.data, isShowPreview: false, previewList: [], processing: false })
        } catch (e) {
            this.notifyError(e.message, "Ошибка орпонизации");
            this.setState({ processing: false, resultFile: "" })
        }
    }

    onChange(e) {
        this.initListAddress(e.currentTarget.files, e)
    }

    ondrop(e) {
        this.ondragleave(e);
        this.initListAddress(e.dataTransfer.files, e)
    }

    async initListAddress(files, input) {
        try {
            const result = await serviceOrponingFile.initListAddress(files[0]);
            if (result.error) throw new Error(result.error);

            this.setState({ countRow: result.count, isShowPreview: true, previewList: result.previewList });
            input.target.files = files;
        } catch (er) {
            input.target.value = "";
            this.setState({ countRow: 0, isShowPreview: false, previewList: [] });
            this.notifyError(er.message, "Ошибка обработки данных");
        }
    }

    ondragover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.classList.add("bg-secondary");
        e.target.parentElement.classList.add("bg-secondary");
    }

    ondragleave(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.classList.remove("bg-secondary");
        e.target.parentElement.classList.remove("bg-secondary");
    }

    render() {
        return (
            <div>
                <div className="input-group p-5">
                    <input className="form-control" type="file"
                        onDrop={e => this.ondrop(e)} value={this.state.files}
                        onDragLeave={e => this.ondragleave(e)}
                        onDragOver={e => this.ondragover(e)}
                        onChange={e => this.onChange(e)} />
                    <button className="btn btn-primary" disabled={this.state.processing} type="button"
                        onClick={() => this.orponing()}>Орпонизируй меня полностью</button>
                </div>
                <div className="px-2">Всего записей: {this.state.countRow}</div>
                { this.state.processing ? <ProcessingOrponing message="Обработка запроса..." /> : ""}
                { this.state.resultFile ? <FileResult result={this.state.resultFile} nameDownload="file.csv" /> : ""}
                { this.state.isShowPreview ? <PreviewOrponing list={this.state.previewList} /> : ""}
            </div >
        );
    }
}