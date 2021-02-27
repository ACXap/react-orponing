export default class ServiceOrponingComponent {
    constructor(api) {
        this.api = api;
    }

    async getListServices() {
        return await this.api.apiGetListServices();
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