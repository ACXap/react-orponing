export default class ApiNegative {
    async apiClearArchive(password) {
        throw new Error("apiClearArchive");
    }

    async apiGetAllLogs() {
        throw new Error("apiGetAllLogs");
    }

    async apiGetListServices() {
        throw new Error("apiGetListServices");
    }

    async apiStartService(id) {
        throw new Error("apiStartService");
    }

    async apiGetStatusService(id) {
        throw new Error("apiGetStatusService");
    }

    async apiOrponingAddress(address) {
        throw new Error("apiOrponingAddress");
    }

    async apiOrponingListAddress(listAddress) {
        throw new Error("apiOrponingListAddress");
    }

    async apiGetStatusTask(id) {
        throw new Error("apiGetStatusTask");
    }

    async apiGetResultTask(id) {
        throw new Error("apiGetResultTask");
    }

    async apiGetLog() {
        throw new Error("apiGetLog");
    }

    async apiGetLogFile(file) {
        throw new Error("apiGetLogFile");
    }
}