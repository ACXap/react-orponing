import React from "react";

import TabControl from "./TabContol";
import FormAddress from "./Address/FormAddress";
import FormFile from "./FormFile.js";
import FormClipboard from "./FormClipboard";
import History from "./History/History";


export default class Orponing extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lastTab: window.localStorage.getItem("lastTabName") ?? "tab-orponing-address"
        }

        this.notifyError = props.notifyError;
    }

    changeTab(e) {
        this.setState({ lastTab: e });
        window.localStorage.setItem("lastTabName", e);
    }

    getStyleShowTab(tabName) {
        return this.state.lastTab === tabName ? null : { display: 'none' };
    }

    render() {
        return (
            <div className="container p-5 shadow-lg" id="page-orponing">

                <div className="row py-5 text-center">
                    <h2>Орпонизация</h2>
                </div>

                <div className="container border border-primary mt-5">
                    <div className="tab-panel p-2">
                        <TabControl onChangeTab={(e) => this.changeTab(e)} lastTab={this.state.lastTab} />
                        <div style={this.getStyleShowTab("tab-orponing-address")}>
                            <FormAddress notifyError={(m, t) => this.notifyError(m, t)} />
                        </div>
                        <div style={this.getStyleShowTab("tab-orponing-file")}>
                            <FormFile notifyError={(m, t) => this.notifyError(m, t)} />
                        </div>
                        <div style={this.getStyleShowTab("tab-orponing-clipboard")}  >
                            <FormClipboard notifyError={(m, t) => this.notifyError(m, t)} />
                        </div>
                        <div style={this.getStyleShowTab("tab-orponing-history")}  >
                            <History notifyError={(m, t) => this.notifyError(m, t)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}