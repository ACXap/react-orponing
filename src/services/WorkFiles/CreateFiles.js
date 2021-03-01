const createPlainTextFile = (list) => {
    let dataFile = "data:application/txt;charset=utf-8,%EF%BB%BF";
    dataFile += encodeURIComponent(list.join("\r\n"));

    return dataFile;
}

export { createPlainTextFile }