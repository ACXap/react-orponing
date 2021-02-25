import React from "react";

export default class LogItem extends React.Component {
    constructor(props) {
        super(props);
        this.item = props.item;
        this.onClickItem = props.onClickItem;
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