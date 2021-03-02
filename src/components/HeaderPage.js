import React from "react";

export default class HeaderPage extends React.PureComponent {
    render() {
        return (
            <div className="row py-5 text-center">
                <h2>{this.props.header}</h2>
            </div>
        );
    }
}