const ValidationPreviewListAddress = (list) => {

    const result = list.map(a => {
        a.isValidId = parseInt(a.Id) ? true : false;
        a.isValidAddress = a.Address ? true : false;
        return a;
    });

    return result;
}

export default ValidationPreviewListAddress;