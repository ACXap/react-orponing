import React from "react";
import AddressResultItem from "./AddressResultItem";

export default class AddressResult extends React.Component {
    render() {
        window.countRender++;
        console.log("render AddressResult");

        const { IsValid, Error, GlobalId, AddressOrpon, ParsingLevelCode, UnparsedParts, QualityCode, CheckStatus } = this.props.result;
        const header = IsValid ? "Адрес разобран" : "Адрес разобран c ошибками";
        const cn = IsValid ? "text-success" : "text-danger";

        return (
            <div className="container border p-3 mt-2">
                <div className="row">
                    <div className="text-center">
                        <h3 className={cn}>{header}</h3>
                    </div>

                    {IsValid ? null : <AddressResultItem value={Error} title="Ошибка" className="col-sm-12" />}
                    {IsValid ? <AddressResultItem value={GlobalId} title="ГИД" className="col-sm-2" /> : null}
                    {IsValid ? <AddressResultItem value={AddressOrpon} title="Адрес в системе ОРПОН" className="col-sm-10" /> : null}
                    <AddressResultItem value={ParsingLevelCode} title="Уровень разбора адреса" className="col-sm-3 py-1" />
                    <AddressResultItem value={UnparsedParts} title="Неразобранные части адреса" className="col-sm-3 py-1" />
                    <AddressResultItem value={QualityCode} title="Качество переданного адреса" className="col-sm-3 py-1" />
                    <AddressResultItem value={CheckStatus} title="Статус проверки адреса" className="col-sm-3 py-1" />
                </div>
            </div>
        );
    }
}