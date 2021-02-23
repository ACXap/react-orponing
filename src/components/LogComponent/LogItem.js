import React from "react";

export default class LogItem extends React.Component {
    constructor({ item, onClickItem }) {
        super();
        this.item = item;
        this.onClickItem = onClickItem;
    }

    clickItem() {
        this.onClickItem(this.item);
    }

    render() {
        return (
            <button className="btn btn-outline-primary p-2 m-2" type="button" onClick={() => this.clickItem()}>{this.item}</button>
        );
    }
}