export default class ServiceLog {
    constructor(api) {
        this.api = api;
    }

    async loadLog() {
        return await this.api.apiGetLog();
    }

    async clearArchive(password) {
        return await this.api.apiClearArchive(password);
    }

    async getAllLogs() {
        return await this.api.apiGetAllLogs();
    }

    async readLog(file) {
        return await this.api.apiGetLogFile(file);
    }

    delay(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}