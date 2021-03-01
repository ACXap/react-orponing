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

export { readFileUtfEncoding, readFileOtherEncoding, readFileAnyEncoding };