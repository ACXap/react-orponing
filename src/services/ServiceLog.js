//import Api from "../services/test/Api.js";
import Api from "../services/Api.js";

class ServiceLog {
    async loadLog() {
        return await Api.apiGetLog();
    }

    async clearArchive(password) {
        return await Api.apiClearArchive(password);
    }

    async getAllLogs(password) {
        return await Api.apiGetAllLogs();
    }

    async readLog(file) {
        return await Api.apiGetLogFile(file);
    }
}

export default new ServiceLog();