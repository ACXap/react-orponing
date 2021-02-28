import React from "react";

export default class AboutSimpleText extends React.PureComponent {
    render() {
        return (
            <div className="container mt-5">
                <h1>{this.props.header}</h1>
                {this.props.children}
            </div>
        );
    }
}