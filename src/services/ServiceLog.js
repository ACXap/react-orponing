import api from "../services/test/Api.js";
//import api from "../services/Api.js";

class ServiceLog {
    async loadLog() {
        return await api.apiGetLog();
    }

    async clearArchive(password) {
        return await api.apiClearArchive(password);
    }

    async getAllLogs(password) {
        return await api.apiGetAllLogs();
    }

    async readLog(file) {
        return await api.apiGetLogFile(file);
    }
}

export default new ServiceLog();