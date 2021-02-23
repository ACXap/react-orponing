import api from "../services/test/Api.js";
//import api from "../services/Api.js";

class ServiceOrponingComponent {
    async getListServices() {
        return await api.apiGetListServices();
    }

    async getStatusService(id) {
        return await api.apiGetStatusService(id);
    }

    async startService(id) {
        return await api.apiStartService(id);
    }
}

export default new ServiceOrponingComponent();