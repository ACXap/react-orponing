import React from "react";

export default class HeaderPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.header = props.header;
    }

    render() {
        return (
            <div className="row py-5 text-center">
                <h2>{this.header}</h2>
            </div>
        );
    }
}