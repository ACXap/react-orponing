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

export { convertStringToAddress }