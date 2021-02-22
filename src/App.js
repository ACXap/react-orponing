import React from "react";
import Orponing from "./components/OrponingComponent/Orponing.js";
import About from "./components/About/About.js";
import NavControl from "./components/NavControl.js";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            lastPage: "page-orponing"
        }
    }

    openPage(e) {
        this.setState({ lastPage: e });
    }

    render() {
        return (
            <div>
                <NavControl onChangePage={(e) => this.openPage(e)} />

                <div style={this.state.lastPage === "page-orponing" ? {} : { display: 'none' }}>
                    <Orponing />
                </div>
                <div style={this.state.lastPage === "page-about" ? {} : { display: 'none' }}>
                    <About />
                </div>
            </div>
        );
    }
}