export default class ServiceOrponingAddress {
    _api = null;
    _lastAddress = "";
    _lastResultAddress = null;

    constructor(api) {
        this._api = api;
    }

    async orponing(address) {
        if (!address) throw new Error("Адрес пустой");

        this._lastAddress = address;
        try {
            this._lastResultAddress = await this._api.apiOrponingAddress(address);
            return { result: this.getLastResult(), error: "" };
        } catch (e) {
            this._lastResultAddress = null;
            return { result: null, error: e.message };
        }
    }

    getLastAddress() {
        return this._lastAddress;
    }

    getLastResult() {
        return this._lastResultAddress;
    }
}