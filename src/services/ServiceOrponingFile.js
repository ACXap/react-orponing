import ServiceOrponing from "./ServiceOrponing";
import { readFile } from "./WorkFiles/ReadFile";

export default class ServiceOrponingFile extends ServiceOrponing {
    _files;
    _name = "file.csv";

    async initListAddress(files) {
        const file = files[0];
        this._files = files;
        this._name = files[0].name;

        try {
            const result = await readFile(file);

            if (result.error) throw new Error(result.error);
            return this._initList(result.data);
        } catch (e) {
            this._restartState();
            return { count: this._listAddress.length, error: e.message, previewList: this._previewList };
        }
    }

    getFiles() {
        return this._files;
    }
}