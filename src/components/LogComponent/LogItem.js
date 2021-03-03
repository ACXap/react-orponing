import React from "react";

export default class LogItem extends React.PureComponent {

    render() {
        return (
            <button className="btn btn-outline-primary m-2" type="button" onClick={() => this.props.onClickItem(this.props.item)}>{this.props.item}</button>
        );
    }
}