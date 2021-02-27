import React from "react";

export default class LogItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.item = props.item;
        this.onClickItem = props.onClickItem.bind(null, props.item);
    }

    render() {
        window.countRender++;
        console.log("render LogItem");

        return (
            <button className="btn btn-outline-primary  m-2" type="button" onClick={this.onClickItem}>{this.item}</button>
        );
    }
}