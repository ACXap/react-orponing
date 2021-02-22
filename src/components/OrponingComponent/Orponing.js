import React from "react";
import TabControl from "./TabContol.js";
import FormAddress from "./FormAddress.js";
import FormFile from "./FormFile.js";
import FormClipboard from "./FormClipboard.js";
import Modal from "./Modal.js";

export default class Orponing extends React.Component {

    constructor() {
        super();
        this.state = {
            lastTab: window.localStorage.getItem("lastTabName") ?? "tab-orponing-address",
            message: "",
            isOpenModal: false
        }
    }

    changeTab(e) {
        this.setState({ lastTab: e });
        window.localStorage.setItem("lastTabName", e);
    }

    closeModal() {
        this.setState({ isOpenModal: false });
    }

    notifyError(message) {
        this.setState({ isOpenModal: true, message: message });
    }

    render() {
        return (
            <div className="container p-5" id="page-orponing">
                {this.state.isOpenModal ? <Modal message={this.state.message} close={() => this.closeModal()} /> : ""}
                <div className="row py-5 text-center">
                    <h2>Орпонизация</h2>
                </div>

                <div className="container border border-primary mt-5">
                    <div className="tab-panel p-2">
                        <TabControl onChangeTab={(e) => this.changeTab(e)} />
                        <div style={this.state.lastTab === "tab-orponing-address" ? {} : { display: 'none' }}>
                            <FormAddress notifyError={(m) => this.notifyError(m)} />
                        </div>
                        <div style={this.state.lastTab === "tab-orponing-file" ? {} : { display: 'none' }}>
                            <FormFile notifyError={(m) => this.notifyError(m)} />
                        </div>
                        <div style={this.state.lastTab === "tab-orponing-clipboard" ? {} : { display: 'none' }}>
                            <FormClipboard notifyError={(m) => this.notifyError(m)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}