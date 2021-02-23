"use strict"
import ServiceOrponing from "./ServiceOrponing.js";

class ServiceHistory {
    listHistory = new Map();
    index = 1;
    handlerUpdateHistory;

    constructor() {
        ServiceOrponing.onStartTask = (item) => {
            this.addItem(item);
        }
        ServiceOrponing.onCompletedTask = (task) => {
            this.setStatusTask(task);
        }
        this.updateList();
    }

    addItem(item) {
        this.updateList();
        this.listHistory.set(item.taskId, { id: this.index++, status: item.status, name: item.name, taskId: item.taskId, countRecord: item.countRecord, date: item.date.toLocaleString("ru-RU") });

        window.localStorage.setItem("history", JSON.stringify(Array.from(this.listHistory.entries())));
        if (this.handlerUpdateHistory) this.handlerUpdateHistory();
    }

    removeItem(taskId) {
        this.updateList();
        console.log(this.listHistory.has(taskId));
        this.listHistory.delete(taskId);

        window.localStorage.setItem("history", JSON.stringify(Array.from(this.listHistory.entries())));
        this.updateList();
        if (this.handlerUpdateHistory) this.handlerUpdateHistory();
    }

    async updateItem(taskId) {
        this.updateList();

        const result = await ServiceOrponing.getStatus(taskId);
        if (result) {
            const t = this.listHistory.get(taskId);
            t.status = result.status;
            t.date = new Date(result.dateStatus).toLocaleString("ru-RU");
        }

        window.localStorage.setItem("history", JSON.stringify(Array.from(this.listHistory.entries())));
        if (this.handlerUpdateHistory) this.handlerUpdateHistory();
    }

    setStatusTask(task) {
        this.updateList();

        const t = this.listHistory.get(task.taskId);
        t.status = task.status;
        t.date = task.date;

        window.localStorage.setItem("history", JSON.stringify(Array.from(this.listHistory.entries())));
        if (this.handlerUpdateHistory) this.handlerUpdateHistory();
    }

    updateList() {
        try {
            const history = new Map(JSON.parse(window.localStorage.getItem("history")));

            if (history) {
                const list = new Map();
                this.index = 1;

                for (const item of history.values()) {
                    list.set(item.taskId, { id: this.index++, status: item.status, name: item.name, taskId: item.taskId, countRecord: item.countRecord, date: item.date });
                }

                this.listHistory.clear();
                list.forEach(i => this.listHistory.set(i.taskId, i));
            }
        } catch (e) {
            console.error(e);
        }
    }

    getHistory() {
        return this.listHistory;
    }
}

export default new ServiceHistory(ServiceOrponing);