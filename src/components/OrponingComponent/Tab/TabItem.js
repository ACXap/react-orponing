import React from "react";

export default class TabItem extends React.PureComponent {
    handleTabClick = () => this.props.onClick(this.props.tabName);

    render() {
        return (
            <button className={`btn btn-outline-primary mx-1 ${this.props.isActiveTab && "active"}`}
                title={this.props.title} onClick={this.handleTabClick}>{this.props.name}</button>
        );
    }
}