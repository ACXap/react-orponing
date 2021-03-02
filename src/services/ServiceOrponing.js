import validationPreviewListAddress from "./Validators/ValidationPreviewLiatAddress";
import { convertStringToAddress } from "./Converters/ConverterAddress";

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
                const dataFile = this._convertAddressInfoToString(result.data, this._listAddress);
                this._result = dataFile;
            } catch (e) {
                error = e.message;
            }
        }

        this._previewList = [];
        error = result.error;

        return { error: error, countRow: this._listAddress.length, previewList: this._previewList, data: this._result }
    }

    _convertAddressInfoToString(addressInfo, list) {
        let dataForSave = "data:application/txt;charset=utf-8,%EF%BB%BF";

        const data = [];
        data.push("id;Address;GlobalId;AddressOrpon;ParsingLevelCode;QualityCode;UnparsedParts;Error");
        addressInfo.forEach(el => {
            data.push(`${el.Id};${list.find(e => e.Id == el.Id).Address};${el.GlobalId ?? ""};${el.AddressOrpon ?? ""};${el.ParsingLevelCode ?? ""};${el.QualityCode ?? ""};${el.UnparsedParts ?? ""};${el.Error ?? ""}`);
        });

        dataForSave += encodeURIComponent(data.join("\r\n"));
        return dataForSave;
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