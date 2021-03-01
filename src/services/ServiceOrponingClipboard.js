import ServiceOrponing from "./ServiceOrponing";

export default class ServiceOrponingClipboard extends ServiceOrponing {
    _name = "Буфер обмена";

    initListAddress(data) {
        return this._initList(data);
    }
}