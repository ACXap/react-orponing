export default class RepositoryOrponing {
    onAddTask = () => { console.warn("no listener onAddTask") };
    delayGetStatus = 5000;

    constructor(api) {
        this.api = api;
    }

    async orponingListAddress(list, name) {
        let idTask;
        try {
            if (!list || list.length < 1) return { data: [], error: "Список адресов пуст" };

            idTask = await this.api.apiOrponingListAddress(list);
            this.onAddTask({ status: "START", name: name, taskId: idTask, countRecord: list.length, dateStatus: new Date(), message: "" });

            while (true) {
                await this.delay(this.delayGetStatus);

                let result = await this.getStatus(idTask);
                if (result.status === "COMPLETED") {
                    result = await this.getResult(idTask);
                    return { data: result, error: null }
                }
            }
        } catch (e) {
            return { data: [], error: e.message };
        }
    }

    delay(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    async getStatus(idTask) {
        return await this.api.apiGetStatusTask(idTask);
    }

    async getResult(idTask) {
        return await this.api.apiGetResultTask(idTask);
    }
}