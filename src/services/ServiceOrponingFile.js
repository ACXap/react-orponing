export default class ServiceOrponingFile {
    serviceOrponing;
    listAddress = [];
    fileName = "";

    constructor(serviceOrponing) {
        this.serviceOrponing = serviceOrponing;
    }

    async orponing() {
        if (this.listAddress.length === 0) throw new Error("Список адресов пустой");
        return await this.serviceOrponing.orponingListAddress(this.listAddress, this.fileName);
    }

    async initListAddress(file) {
        if (!this.isValidFile(file)) {
            return { count: 0, error: !file ? "А кто файл то будет добавлять?" : "Неверный тип файла. Допускается только *.txt и *.csv" };
        }
        this.fileName = file.name;

        return await this.readFile(file);
    }

    async readFile(file) {
        try {
            let result = await this.readFileUtfEncoding(file);

            if (result.error === "not correctly encoding") {
                result = await this.readFileOtherEncoding(file);
            }

            return result;
        } catch (e) {
            return { count: 0, error: e.message };
        }
    }

    async readFileUtfEncoding(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = (event) => {
                try {
                    resolve(this.convertFileDataToAddress(decodeURIComponent(escape(event.target.result))));
                } catch (e) {
                    if (e.message === "URI malformed") {
                        resolve({ count: 0, error: "not correctly encoding" });
                    } else {
                        reject(e);
                    }
                }
            };
        });
    }

    async readFileOtherEncoding(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file, "windows-1251");
            reader.onload = (e) => {
                try {
                    resolve(this.convertFileDataToAddress(e.target.result));
                } catch (e) {
                    reject(e);
                }
            };
        });
    }

    convertFileDataToAddress(data) {
        this.listAddress = this.serviceOrponing.convertStringToAddress(data);
        return { count: this.listAddress.length, error: null, previewList: this.listAddress.slice(0, 10) };
    }

    isValidFile(file) {
        return file && (file.type === "text/plain" || (file.type === "application/vnd.ms-excel" && file.name.includes(".csv")));
    }
}