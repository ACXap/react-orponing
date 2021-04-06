export default class ServiceOrponingComponent {
    constructor(api) {
        this.api = api;
    }

    async getListServices() {
        const list = await this.api.apiGetListServices();
        return list.sort((a, b) => a.index - b.index);
    }

    async getStatusService(id) {
        return await this.api.apiGetStatusService(id);
    }

    async startService(id) {
        return await this.api.apiStartService(id);
    }

    delay(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}