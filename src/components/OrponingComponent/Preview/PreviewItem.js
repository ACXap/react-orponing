import React from "react";

export default class PreviewItem extends React.PureComponent {
    render() {
        window.countRender++;
        console.log("render PreviewItem");

        const cn = `col-2 border-end ${this.props.isValid ? "" : " bg-danger"}`;
        const t = this.props.isValid ? "" : "Идентификатор должен быть числом";

        return (
            <div className="row border">
                <div className={cn} title={t}>{this.props.id}</div>
                <div className="col-10">{this.props.address}</div>
            </div>
        );
    }
}