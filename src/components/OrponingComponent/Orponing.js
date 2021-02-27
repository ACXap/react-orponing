import React from "react";

import TabControl from "./Tab/TabControl";
import FormAddress from "./Address/FormAddress";
import FormFile from "./FormFile.js";
import FormClipboard from "./FormClipboard";
import History from "./History/History";
import HeaderPage from "../HeaderPage";

export default class Orponing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastTab: window.localStorage.getItem("lastTabName") ?? "tab-orponing-address"
        }

        this.notifyError = props.notifyError;
    }

    changeTab = (e) => {
        this.setState({ lastTab: e });
        window.localStorage.setItem("lastTabName", e);
    }

    render() {
        window.countRender++;
        console.log("render Orponing");

        const lt = this.state.lastTab;
        return (
            <div className="container p-5 shadow-lg">
                <HeaderPage header="Орпонизация" />

                <div className="container border border-primary mt-5">
                    <div className="tab-panel p-2">
                        <TabControl onChangeTab={this.changeTab} lastTab={this.state.lastTab} />

                        <FormAddress notifyError={this.notifyError} hidden={lt != "tab-orponing-address"} />
                        <FormFile notifyError={this.notifyError} hidden={lt != "tab-orponing-file"} />
                        <FormClipboard notifyError={this.notifyError} hidden={lt != "tab-orponing-clipboard"} />
                        <History notifyError={this.notifyError} hidden={lt != "tab-orponing-history"} />
                    </div>
                </div>
            </div>
        );
    }
}