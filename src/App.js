import React from "react";
import TabControl from "./components/TabContol.js";
import FormAddress from "./components/FormAddress.js";
import FormFile from "./components/FormFile.js";
import FormClipboard from "./components/FormClipboard.js";
import Modal from "./components/Modal.js";

export default class App extends React.Component {

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

    checkShow(tab) {
        const style = {
            div: {
                display: this.state.lastTab === tab ? "display" : "none"
            }
        }
        return style.div;
    }

    closeModal() {
        this.setState({ isOpenModal: false });
    }

    notifyError(message) {
        this.setState({ isOpenModal: true, message: message });
    }


    render() {
        console.log("rend new tab");

        return (
            <div className="container p-5" >
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