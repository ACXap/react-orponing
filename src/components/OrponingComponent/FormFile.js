import React from "react";
import ProcessingOrponing from "../ProcessingOrponing.js";
import FileResult from "./FileResult.js";
import ServiceOrponingFile from "../../services/ServiceOrponingFile.js";
import PreviewOrponing from "./PreviewOrponing.js";

export default class FormFile extends React.Component {

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

            const result = await ServiceOrponingFile.orponing();
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

    async onChange(e) {
        const file = e.currentTarget.files[0];

        const result = await ServiceOrponingFile.initListAddress(file);
        this.setState({ isShowPreview: false });
        if (result.error) {
            e.target.value = "";
            this.setState({ countRow: 0, isShowPreview: false, previewList: [] });
            this.state.notifyError(result.error);
        } else {
            this.setState({ countRow: result.count, isShowPreview: true, previewList: result.previewList });
        }
    }

    ondragover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.classList.add("bg-secondary");
        document.querySelector("#div-form-file").classList.add("bg-secondary");
    }

    ondragleave(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.classList.remove("bg-secondary");
        document.querySelector("#div-form-file").classList.remove("bg-secondary");
    }

    async ondrop(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.classList.remove("bg-secondary");
        document.querySelector("#div-form-file").classList.remove("bg-secondary");

        const files = e.dataTransfer.files;
        const result = await ServiceOrponingFile.initListAddress(files[0]);
        this.setState({ isShowPreview: false });
        if (result.error) {
            e.target.value = "";
            this.setState({ countRow: 0, isShowPreview: false, previewList: [] });
            this.state.notifyError(result.error);
        } else {
            this.setState({ countRow: result.count, isShowPreview: true, previewList: result.previewList });
            e.target.files = files;
        }
    }

    render() {
        console.log("rend formFile");
        return (
            <div id="div-form-file">
                <div className="input-group p-5">
                    <input className="form-control" type="file" id="input-file"
                        onDrop={e => this.ondrop(e)}
                        onDragLeave={e => this.ondragleave(e)}
                        onDragOver={e => this.ondragover(e)}
                        onChange={e => this.onChange(e)} />
                    <button className="btn btn-primary start" disabled={this.state.processing} type="button" id="orponing-file" onClick={() => this.orponing()}>Орпонизируй меня полностью</button>
                </div>
                <div className="count-address px-2">Всего записей: {this.state.countRow}</div>
                { this.state.processing ? <ProcessingOrponing message="Обработка запроса..." /> : ""}
                { this.state.resultFile ? <FileResult result={this.state.resultFile} /> : ""}
                { this.state.isShowPreview ? <PreviewOrponing list={this.state.previewList} /> : ""}
            </div >
        )
    }
}