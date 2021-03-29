import XLSX from "xlsx";

const createPlainTextFile = (list) => {
    let dataFile = "data:application/txt;charset=utf-8,%EF%BB%BF";
    dataFile += encodeURIComponent(list.join("\r\n"));

    return dataFile;
}

const createExcelFile = (list) => {

    //const wb = XLSX.utils.book_new();
    //XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(allField, { sheet: "Данные" }));
    //XLSX.writeFile(wb, "Данные.xlsx");
}

export { createPlainTextFile, createExcelFile }