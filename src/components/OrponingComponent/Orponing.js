import React from "react";
import TabControl from "./TabContol.js";
import FormAddress from "./FormAddress.js";
import FormFile from "./FormFile.js";
import FormClipboard from "./FormClipboard.js";
import History from "./History/History.js";

export default class Orponing extends React.Component {

    constructor({ notifyError }) {
        super();
        this.state = {
            lastTab: window.localStorage.getItem("lastTabName") ?? "tab-orponing-address",
            notifyError: notifyError
        }
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
                            <FormAddress notifyError={(m, t) => this.state.notifyError(m, t)} />
                        </div>
                        <div style={this.getStyleShowTab("tab-orponing-file")}>
                            <FormFile notifyError={(m, t) => this.state.notifyError(m, t)} />
                        </div>
                        <div style={this.getStyleShowTab("tab-orponing-clipboard")}  >
                            <FormClipboard notifyError={(m, t) => this.state.notifyError(m, t)} />
                        </div>
                        <div style={this.getStyleShowTab("tab-orponing-history")}  >
                            <History notifyError={(m, t) => this.state.notifyError(m, t)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}