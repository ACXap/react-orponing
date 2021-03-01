import ServiceOrponing from "./ServiceOrponing";
import { readFileAnyEncoding } from "./WorkFiles/ReadPlainText";

export default class ServiceOrponingFile extends ServiceOrponing {
    _files;

    async initListAddress(files) {
        const file = files[0];
        this._files = files;

        try {
            if (!this.isValidFile(file)) throw new Error(!file ? "А кто файл то будет добавлять?" : "Неверный тип файла. Допускается только *.txt и *.csv");
            const result = await readFileAnyEncoding(file);
            if (result.error) throw new Error(result.error);
            return this._initList(result.data);
        } catch (e) {
            this._restartState();
            return { count: this._listAddress.length, error: e.message, previewList: this._previewList };
        }
    }

    isValidFile(file) {
        return file && (file.type === "text/plain" || (file.type === "application/vnd.ms-excel" && file.name.includes(".csv")));
    }

    getFiles() {
        return this._files;
    }
}