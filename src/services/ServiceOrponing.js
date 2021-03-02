import validationPreviewListAddress from "./Validators/ValidationPreviewLiatAddress";
import { convertStringToAddress, convertAddressInfoToString } from "./Converters/ConverterAddress";
import { createPlainTextFile } from "./WorkFiles/CreateFiles";

export default class ServiceOrponing {
    _repository;
    _listAddress = [];
    _previewList = [];
    _result = "";
    _name = "";

    constructor(repository) {
        this._repository = repository;
    }

    async orponing() {
        this._result = "";
        let error = "";

        const result = await this._repository.orponingListAddress(this._listAddress, this._name);

        if (result.data) {
            try {
                const list = convertAddressInfoToString(result.data);
                const dataFile = createPlainTextFile(list);

                this._result = dataFile;
            } catch (e) {
                error = e.message;
            }
        }

        this._previewList = [];
        error = result.error;

        return { error: error, countRow: this._listAddress.length, previewList: this._previewList, data: this._result }
    }

    _initList(data) {
        try {
            this._listAddress = convertStringToAddress(data);
            this._previewList = validationPreviewListAddress(this._listAddress.slice(0, 9));
            return { count: this._listAddress.length, error: "", previewList: this._previewList, name: this._name };
        } catch (e) {
            this._restartState();
            return { count: this._listAddress.length, error: e.message, previewList: this._previewList, name: this._name };
        }
    }

    _restartState() {
        this._listAddress = [];
        this._previewList = [];
        this._result = "";
    }

    getResult() {
        return this._result;
    }
    getCountRow() {
        return this._listAddress.length;
    }
    getListAddress() {
        return this._listAddress;
    }
    getPreviewList() {
        return this._previewList;
    }
    getName() {
        return this._name;
    }
}