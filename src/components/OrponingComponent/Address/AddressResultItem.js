import React from "react";

export default class AddressResultItem extends React.PureComponent {
    render() {
        window.countRender++;
        console.log("render AddressResultItem");

        return (
            <div className={this.props.className}>
                <label className="form-label">{this.props.title}</label>
                <input className="form-control" type="text" value={this.props.value} onChange={() => { }} />
            </div>
        );
    }
}