import React from "react";

export default class AddressResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { IsValid, Error, GlobalId, AddressOrpon, ParsingLevelCode, UnparsedParts, QualityCode, CheckStatus } = this.props.result;
        const header = IsValid ? "Адрес разобран" : "Адрес разобран c ошибками";
        const cn = IsValid ? "text-success" : "text-danger";

        return (
            <div className="container border p-3 mt-2">
                <div className="row">
                    <div className="text-center">
                        <h3 className={cn}>{header}</h3>
                    </div>

                    {IsValid ? "" : <div className="col-sm-12" >
                        <label className="form-label">Ошибка</label>
                        <input className="form-control" type="text" value={Error} onChange={() => { }} />
                    </div>}

                    {IsValid ?
                        <div className="col-sm-2">
                            <label className="form-label">ГИД</label>
                            <input className="form-control" type="text" value={GlobalId} onChange={() => { }} />
                        </div> : ""}

                    {IsValid ?
                        <div className="col-sm-10">
                            <label className="form-label">Адрес в системе ОРПОН</label>
                            <input className="form-control" type="text" value={AddressOrpon} onChange={() => { }} />
                        </div> : ""}

                    <div className="col-sm-3 py-1">
                        <label className="form-label">Уровень разбора адреса</label>
                        <input className="form-control" type="text" value={ParsingLevelCode} onChange={() => { }} />
                    </div>

                    <div className="col-sm-3 py-1">
                        <label className="form-label">Неразобранные части адреса</label>
                        <input className="form-control" type="text" value={UnparsedParts} onChange={() => { }} />
                    </div>

                    <div className="col-sm-3 py-1">
                        <label className="form-label">Качество переданного адреса</label>
                        <input className="form-control" type="text" value={QualityCode} onChange={() => { }} />
                    </div>

                    <div className="col-sm-3 py-1">
                        <label className="form-label">Статус проверки адреса</label>
                        <input className="form-control" type="text" value={CheckStatus} onChange={() => { }} />
                    </div>
                </div>
            </div>
        );
    }
}