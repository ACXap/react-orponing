//import Api from "../services/test/Api.js";
import Api from "../services/Api.js";

class ServiceOrponingComponent {
    async getListServices() {
        return await Api.apiGetListServices();
    }

    async getStatusService(id) {
        return await Api.apiGetStatusService(id);
    }

    async startService(id) {
        return await Api.apiStartService(id);
    }
}

export default new ServiceOrponingComponent();