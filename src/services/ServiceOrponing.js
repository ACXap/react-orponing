export default class ServiceOrponing {
    onUpdateTask = () => { console.warn("no listener onUpdateTask") };

    constructor(api) {
        this.api = api;
    }

    async orponingListAddress(list, name) {
        let idTask;
        try {
            idTask = await this.api.apiOrponingListAddress(list);
            this.onUpdateTask({ status: "START", name: name, taskId: idTask, countRecord: list.length, date: new Date(), message: "" });

            while (true) {
                await this.delay(5000);

                let result = await this.getStatus(idTask);

                if (result.status === "COMPLETED") {
                    this.onUpdateTask({ status: result.status, name: name, taskId: idTask, countRecord: list.length, date: new Date(), message: result.message });
                    result = await this.getResult(idTask);
                    return { data: this.convertAddressInfoToString(result, list), error: null }
                }
            }
        } catch (e) {
            this.onUpdateTask({ status: "ERROR", name: name, taskId: idTask, countRecord: list.length, date: new Date(), message: "" });
            return { data: "", error: e.message };
        }
    }

    delay(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    async getStatus(idTask) {
        await this.delay(5222);
        return await this.api.apiGetStatusTask(idTask);
    }

    async getResult(idTask) {
        return await this.api.apiGetResultTask(idTask);
    }

    convertAddressInfoToString(addressInfo, list) {
        let dataForSave = "data:application/txt;charset=utf-8,%EF%BB%BF";

        const data = [];
        data.push("id;Address;GlobalId;AddressOrpon;ParsingLevelCode;QualityCode;UnparsedParts;Error");

        addressInfo.forEach(el => {
            data.push(`${el.Id};${list.find(e => e.Id == el.Id).Address};${el.GlobalId ?? ""};${el.AddressOrpon ?? ""};${el.ParsingLevelCode ?? ""};${el.QualityCode ?? ""};${el.UnparsedParts ?? ""};${el.Error ?? ""}`);
        });

        dataForSave += encodeURIComponent(data.join("\r\n"));

        return dataForSave;
    }

    convertStringToAddress(data) {
        const list = [];

        if (data) {
            const rows = data.split(/\r\n|\n/);

            if (rows[0].split(";").length > 1) {
                for (const row of rows) {
                    const items = row.split(";");
                    list.push({ Id: items[0], Address: items[1] });
                }
            } else {
                let index = 1;
                for (const row of rows) {
                    list.push({ Id: index++, Address: row });
                }
            }
        }

        return list;
    }
}