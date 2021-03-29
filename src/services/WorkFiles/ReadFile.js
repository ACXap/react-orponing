import XLSX from "xlsx";
import { convertStringToAddress, convertObjectToAddress } from "../Converters/ConverterAddress";

const readFileUtfEncoding = (file) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (event) => {
            try {
                resolve({ data: decodeURIComponent(escape(event.target.result)), error: null });
            } catch (e) {
                if (e.message === "URI malformed") {
                    resolve({ data: "", error: "not correctly encoding" });
                } else {
                    resolve({ data: "", error: e.message });
                }
            }
        };
    });
}

const readFileOtherEncoding = (file) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsText(file, "windows-1251");
        reader.onload = (e) => {
            try {
                resolve({ data: e.target.result, error: null });
            } catch (e) {
                resolve({ data: "", error: e.message });
            }
        };
    });
}

const readFileAnyEncoding = async (file) => {
    let result = await readFileUtfEncoding(file);

    if (result.error === "not correctly encoding") {
        result = await readFileOtherEncoding(file);
    }

    return result;
}

const isExcelFile = (file) => {
    return file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.name.includes(".xlsx"));
}

const isPlainTextFile = (file) => {
    return file && (file.type === "text/plain" || (file.type === "application/vnd.ms-excel" && file.name.includes(".csv")));
}

const readExcel = (file) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const list = convertObjectToAddress(XLSX.utils.sheet_to_json(worksheet));
                resolve({ data: list, error: null });
            } catch (e) {
                resolve({ data: [], error: e.message });
            }
        };
        reader.readAsArrayBuffer(file);
    });
}

const readFile = async (file) => {
    if (!file) throw new Error("А кто файл то будет добавлять?");

    if (isPlainTextFile(file)) {
        const data = await readFileAnyEncoding(file);

        if (!data.error) {
            return { data: convertStringToAddress(data.data), error: "" };
        }
        return data;
    }

    if (isExcelFile(file)) {
        return await readExcel(file);
    }

    return { data: [], error: "Неверный тип файла.Допускается только *.txt, *.csv, *.xlsx" };
}

export { readFile };