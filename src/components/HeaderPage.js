import React from "react";


export default class HeaderPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.header = props.header;
    }

    render() {
        window.countRender++;
        console.log("render HeaderPage");

        return (
            <div className="row py-5 text-center">
                <h2>{this.header}</h2>
            </div>
        );
    }
}