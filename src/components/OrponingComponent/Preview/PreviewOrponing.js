import React from "react";
import PreviewItem from "./PreviewItem";

export default class PreviewOrponing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const listP = this.props.list.map(el => <PreviewItem id={el.Id} address={el.Address} key={el.Id} isValid={parseInt(el.Id)} />);

        return (
            <div className="p-2">
                <h5 className="text-center">Предварительный обзор данных для обработки (первые 10 записей)</h5>
                <div className="container">
                    <div className="row border">
                        <div className="col-2 border-end">Идентификатор</div>
                        <div className="col-10">Адрес</div>
                    </div>
                    {listP}
                </div>
            </div>
        );
    }
}