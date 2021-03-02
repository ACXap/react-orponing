const convertStringToAddress = (data) => {
    const list = [];

    if (data) {
        const rows = data.split(/\r\n|\n/);

        if (rows[0].split(";").length > 1) {
            for (const row of rows) {
                const items = row.split(";");
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

const convertAddressInfoToString = (addressInfo) => {
    const data = ["id;Address;GlobalId;AddressOrpon;ParsingLevelCode;QualityCode;UnparsedParts;Error"];
    addressInfo.forEach(el => {
        const resp = el.ResponseAddress;
        data.push(`${el.RequestAddress.Id}; ${el.RequestAddress.Address}; ${resp.GlobalId ?? ""}; ${resp.AddressOrpon ?? ""}; ${resp.ParsingLevelCode ?? ""}; ${resp.QualityCode ?? ""}; ${resp.UnparsedParts ?? ""}; ${resp.Error ?? ""} `);
    });

    return data;
}

export { convertStringToAddress, convertAddressInfoToString }