import React from "react";

export default class TabItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            tabName: props.tabName,
            name: props.name,
            title: props.title
        };

        this.onChangeTab = props.onClick
    }

    handleTabClick = () => {
        this.onChangeTab(this.state.tabName);
    }

    render() {
        return (
            <button className={`btn btn-outline-primary mx-1 ${this.props.isActiveTab && "active"}`}
                title={this.state.title} onClick={this.handleTabClick}>{this.state.name}</button>
        );
    }
}