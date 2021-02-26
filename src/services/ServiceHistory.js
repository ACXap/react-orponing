export default class ServiceHistory {
    serviceOrponing;
    onUpdateHistory = () => { console.warn("no listener onUpdateHistory") };

    constructor(serviceOrponing) {
        this.serviceOrponing = serviceOrponing;

        this.serviceOrponing.onUpdateTask = (task) => {


            const list = this.getHistory();

            const t = list.filter(h => h.taskId === task.taskId)[0];
            if (t) {
                t.status = task.status;
                t.message = task.message;
                t.date = new Date(task.date).toLocaleString();
            } else {
                task.id = list.length + 1;
                task.date = new Date(task.date).toLocaleString();
                list.push(task);
            }

            this.setHistory(list);
            this.onUpdateHistory(this.getHistory());


        }
    }

    addTask(task) {

    }

    removeTask(taskId) {
        const list = this.getHistory();
        const newList = list.filter(t => t.taskId != taskId);
        this.setHistory(newList);

        return this.getHistory();
    }

    async updateTask(taskId) {
        const list = this.getHistory();

        const currentTask = list.filter(t => t.taskId === taskId)[0];

        if (currentTask) {
            currentTask.status = "START";
            currentTask.message = "";
            currentTask.date = new Date().toLocaleString();

            this.setHistory(list);
            this.onUpdateHistory(this.getHistory());
            this.update(taskId);
        }

        this.setHistory(list);
        this.onUpdateHistory(this.getHistory());
    }

    async update(taskId) {
        const list = this.getHistory();
        const currentTask = list.filter(t => t.taskId === taskId)[0];

        try {
            if (currentTask) {
                const task = await this.serviceOrponing.getStatus(taskId);
                currentTask.status = task.status;
                currentTask.message = task.message;
                currentTask.date = new Date(task.dateStatus).toLocaleString();
            }
        } catch (e) {
            currentTask.status = "ERROR";
            currentTask.message = e.message;
            currentTask.date = new Date().toLocaleString();
        }

        this.setHistory(list);
        this.onUpdateHistory(this.getHistory());
    }

    getHistory() {
        const list = JSON.parse(window.localStorage.getItem("history"));
        if (!list) return [];

        return list;
    }

    setHistory(list) {
        window.localStorage.setItem("history", JSON.stringify(list));
    }
}