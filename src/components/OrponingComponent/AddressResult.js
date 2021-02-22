import React from "react";

class AddressResult extends React.Component {

    result;

    constructor({ result }) {
        super();
        this.result = result;
    }

    onChange(e) { }

    render() {
        console.log("rend addressResult");

        const address = this.result;
        const styles = {
            h: {
                color: address.IsValid ? "green" : "red"
            }
        };

        return (
            <div className="container border p-3 mt-2 result">
                <div className="row">
                    <div className="text-center">
                        <h3 style={styles.h} id="headerInfoAddress">{address.IsValid ? "Адрес разобран" : "Адрес разобран c ошибками"}</h3>
                    </div>

                    {address.IsValid ? "" : <div className="col-sm-12" id="errorInfo" >
                        <label className="form-label">Ошибка</label>
                        <input className="form-control" type="text" id="error" />
                    </div>}

                    {address.IsValid ?
                        <div className="col-sm-2" id="gidInfo">
                            <label className="form-label">ГИД</label>
                            <input className="form-control" type="text" id="gid" value={address.GlobalId} onChange={this.onChange} />
                        </div> : ""}

                    {address.IsValid ?
                        <div className="col-sm-10" id="addressInfo">
                            <label className="form-label">Адрес в системе ОРПОН</label>
                            <input className="form-control" type="text" id="addressOrpon" value={address.AddressOrpon} onChange={this.onChange} />
                        </div> : ""}

                    <div className="col-sm-3 py-1">
                        <label className="form-label">Уровень разбора адреса</label>
                        <input className="form-control" type="text" id="parsingLevelCode" value={address.ParsingLevelCode} onChange={this.onChange} />
                    </div>

                    <div className="col-sm-3 py-1">
                        <label className="form-label">Неразобранные части адреса</label>
                        <input className="form-control" type="text" id="unparsedParts" value={address.UnparsedParts} onChange={this.onChange} />
                    </div>

                    <div className="col-sm-3 py-1">
                        <label className="form-label">Качество переданного адреса</label>
                        <input className="form-control" type="text" id="qualityCode" value={address.QualityCode} onChange={this.onChange} />
                    </div>

                    <div className="col-sm-3 py-1">
                        <label className="form-label">Статус проверки адреса</label>
                        <input className="form-control" type="text" id="checkStatus" value={address.CheckStatus} onChange={this.onChange} />
                    </div>
                </div>
            </div>
        )
    }
}

export default AddressResult;