const convertStringToAddress = (data) => {
    const list = [];

    if (data) {
        const rows = data.split(/\r\n|\n/);

        if (rows[0].split(";").length > 1) {
            for (const row of rows) {
                const items = row.split(";");
                if (!items[0] || !items[1]) throw new Error(`Не хватает столбцов в данных. Данные: 1ст. "${items[0]}" 2ст. "${items[1]}"`);

                list.push({ Id: items[0], Address: items[1]?.trim() });
            }
        } else {
            let index = 1;
            for (const row of rows) {
                list.push({ Id: index++, Address: row?.trim() });
            }
        }
    }

    return list;
}

const convertObjectToAddress = (data) => {
    const list = [];

    if (data) {

        if (Object.keys(data[0]).length > 1) {
            data.forEach(el => {
                if (Object.keys(el).length < 2) throw new Error(`Не хватает столбцов в данных. Данные: 1ст. "${Object.values(el)[0]}" 2ст. "${Object.values(el)[1]}"`);

                list.push({ Id: Object.values(el)[0], Address: Object.values(el)[1] });
            });
        } else {
            let index = 1;
            data.forEach(el => list.push({ Id: index++, Address: Object.values(el)[0] }));
        }
    }

    return list;
}

const convertAddressInfoToString = (addressInfo) => {
    const data = ["id;Address;GlobalId;AddressOrpon;ParsingLevelCode;QualityCode;UnparsedParts;Error"];
    addressInfo.forEach(el => {
        const resp = el.ResponseAddress;
        data.push(`${el.RequestAddress.Id}; ${el.RequestAddress.Address}; ${resp.GlobalId ?? ""}; ${resp.AddressOrpon ?? ""}; ${resp.ParsingLevelCode ?? ""}; ${resp.QualityCode ?? ""}; ${resp.UnparsedParts ?? ""}; ${resp.Error ?? ""} `);
    });

    return data;
}

export { convertStringToAddress, convertAddressInfoToString, convertObjectToAddress }