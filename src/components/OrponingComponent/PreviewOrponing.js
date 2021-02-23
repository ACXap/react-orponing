import React from "react";

export default class PreviewOrponing extends React.Component {
    constructor({ list }) {
        super();

        this.state = {
            list: list
        }
    }

    render() {
        return (
            <div className="preview p-5">
                <h5 className="text-center">Предварительный обзор данных для обработки (первые 10 записей)</h5>
                <div className="container">
                    <div className="row border">
                        <div className="col-2 border-end">Идентификатор</div>
                        <div className="col-10">Адрес</div>
                    </div>
                    {this.state.list.map(element => {
                        const result = parseInt(element.Id);
                        return (
                            <div className="row border" key={element.Id}>
                                <div className="col-2 border-end" style={{ color: result ? "" : "bg-danger" }}
                                    title={result ? "" : "Идентификатор должен быть числом"}>{element.Id}</div>
                                <div className="col-10">{element.Address}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}