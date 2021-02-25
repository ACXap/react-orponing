export default class ServiceOrponingAddress {
    constructor(api) {
        this.api = api;
    }

    async orponing(address) {
        const json = await this.api.apiOrponingAddress(address);
        return json;
    }
}