export default class ServiceOrponingAddress {
    constructor(api) {
        this.api = api;
    }

    async orponing(address) {
        if (!address) throw new Error("Адрес пустой");
        return await this.api.apiOrponingAddress(address);
    }
}