import React from "react";
import { serviceOrponingFile } from "../../init";

import ProcessingOrponing from "../ProcessingOrponing";
import FileResult from "./FileResult";
import PreviewOrponing from "./Preview/PreviewOrponing";
import ServiceOrponingFile from './../../services/ServiceOrponingFile';

export default class FormFile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            processing: false,
            countRow: serviceOrponingFile.getCountRow() ?? 0,
            previewList: serviceOrponingFile.getPreviewList() ?? [],
            resultFile: serviceOrponingFile.getResult() ?? "",
            files: serviceOrponingFile.getFiles() ?? null
        }
        this.notifyError = props.notifyError;
        this.getResult = () => serviceOrponingFile.orponing();
        this.initListAddress = (files) => serviceOrponingFile.initListAddress(files);

        this.inputFile = React.createRef();
    }

    componentDidMount() {
        this.inputFile.current.files = this.state.files;
    }

    orponing = async () => {
        if (this.state.countRow === 0 || this.state.processing) return;

        this.setState({ processing: true });
        const result = await this.getResult();
        if (result.error) this.notifyError(result.error, "Ошибка орпонизации адресов");
        this.setState({ resultFile: result.data, previewList: result.previewList, countRow: result.countRow, processing: false });
    }

    initList = async (files, input) => {
        if (this.state.processing || !files || files.length < 1) return;

        try {
            const result = await this.initListAddress(files);

            if (result.error) this.notifyError(result.error, "Ошибка обработки полученных данных");
            this.setState({ countRow: result.count, previewList: result.previewList, resultFile: "" });
            input.target.files = files;
        } catch (er) {
            this.setState({ countRow: 0, previewList: [] });
            this.notifyError(er.message, "Ошибка обработки данных");
        }
    }

    onChange = (e) => {
        this.initList(e.currentTarget.files, e)
    }

    ondrop = (e) => {
        this.ondragleave(e);
        this.initList(e.dataTransfer.files, e)
    }

    ondragover = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.target.classList.add("bg-secondary");
        e.target.parentElement.classList.add("bg-secondary");
    }

    ondragleave = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.target.classList.remove("bg-secondary");
        e.target.parentElement.classList.remove("bg-secondary");
    }

    render() {
        return (
            <div hidden={this.props.hidden}>
                <div className="input-group p-5">
                    <input className="form-control" type="file" disabled={this.state.processing} ref={this.inputFile}
                        onDrop={this.ondrop}
                        onDragLeave={this.ondragleave}
                        onDragOver={this.ondragover}
                        onChange={this.onChange} />
                    <button className="btn btn-primary" disabled={this.state.processing} type="button"
                        onClick={this.orponing}>Орпонизируй меня полностью</button>
                </div>
                <div className="px-2">Всего записей: {this.state.countRow}</div>

                { this.state.processing && <ProcessingOrponing message="Обработка запроса..." />}
                { this.state.resultFile && <FileResult result={this.state.resultFile} nameDownload="file.csv" />}
                { this.state.previewList.length > 0 && <PreviewOrponing list={this.state.previewList} />}
            </div>
        );
    }
}