export default class ServiceOrponingClipboard {
    _serviceOrponing = null;
    _listAddress = [];
    _previewList = [];
    _result = ""

    constructor(serviceOrponing) {
        this._serviceOrponing = serviceOrponing;
    }

    async orponing() {
        let error = "";

        if (this._listAddress.length === 0) {
            error = "Список адресов пустой";
            this._previewList = [];
            this._result = "";
        } else {
            const result = await this._serviceOrponing.orponingListAddress(this._listAddress, "Буфер обмена");
            this._previewList = [];
            this._result = result.data;
            error = result.error;
        }

        return { error: error, countRow: this._listAddress.length, previewList: this._previewList, data: this._result }
    }

    initListAddress(data) {
        try {
            this._listAddress = this._serviceOrponing.convertStringToAddress(data);
            this._previewList = this._listAddress.slice(0, 9).map(a => {
                a.isValidId = parseInt(a.Id) ? true : false;
                a.isValidAddress = a.Address ? true : false;
                return a;
            });

            return { count: this._listAddress.length, error: "", previewList: this._previewList };
        } catch (e) {
            this._listAddress = [];
            this._previewList = [];
            this._result = "";
            return { count: this._listAddress.length, error: e.message, previewList: this._previewList };
        }
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
}