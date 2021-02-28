import React from "react";

export default class PreviewItem extends React.PureComponent {
    render() {
        const { Address, Id, isValidAddress, isValidId } = this.props.item;
        const titleId = isValidId ? "" : "Идентификатор должен быть числом";
        const titleAddress = isValidAddress ? "" : "Адрес не должен быть пустым";

        return (
            <div className="row border">
                <div className={`col-2 border-end ${isValidId || " bg-danger"}`} title={titleId}>{Id}</div>
                <div className={`col-10 ${isValidAddress || " bg-danger"}`} title={titleAddress}>{Address}</div>
            </div>
        );
    }
}