export default class ServiceOrponingClipboard {
    listAddress = [];

    constructor(serviceOrponing) {
        this.serviceOrponing = serviceOrponing;
    }

    async orponing() {
        if (this.listAddress.length === 0) throw new Error("Список адресов пустой");
        return await this.serviceOrponing.orponingListAddress(this.listAddress, "Буфер обмена");
    }

    initListAddress(data) {
        try {
            this.listAddress = this.serviceOrponing.convertStringToAddress(data);
            return { count: this.listAddress.length, error: null, previewList: this.listAddress.slice(0, 9) };
        } catch (e) {
            return { count: 0, error: e.message, previewList: [] };
        }
    }
}