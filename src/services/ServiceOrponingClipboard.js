import ServiceOrponing from "./ServiceOrponing";
import { convertStringToAddress } from "./Converters/ConverterAddress";

export default class ServiceOrponingClipboard extends ServiceOrponing {
    _name = "Буфер обмена";

    initListAddress(data) {
        const list = convertStringToAddress(data);
        return this._initList(list);
    }
}