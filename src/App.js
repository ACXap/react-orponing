import React from "react";
import Orponing from "./components/OrponingComponent/Orponing.js";
import About from "./components/AboutComponent/About.js";
import NavControl from "./components/NavControl.js";
import Log from "./components/LogComponent/Log.js"
import Modal from "./components/Modal.js";
import OrponingService from "./components/OrponingServiceComponent/OrponingService.js";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            lastPage: "page-orponing",
            message: "",
            isOpenModal: false
        }
    }

    openPage(e) {
        this.setState({ lastPage: e });
    }

    closeModal() {
        this.setState({ isOpenModal: false });
    }

    notifyError(message) {
        this.setState({ isOpenModal: true, message: message });
    }

    render() {
        return (
            <div>
                <NavControl onChangePage={(e) => this.openPage(e)} />
                {this.state.isOpenModal ? <Modal message={this.state.message} close={() => this.closeModal()} /> : ""}

                <div style={this.state.lastPage === "page-orponing" ? {} : { display: 'none' }}>
                    <Orponing notifyError={(m) => this.notifyError(m)} />
                </div>
                {this.state.lastPage === "page-about" ? <About notifyError={(m) => this.notifyError(m)} /> : ""}
                {this.state.lastPage === "page-log" ? <Log notifyError={(m) => this.notifyError(m)} /> : ""}
                {this.state.lastPage === "page-orponing-service" ? <OrponingService notifyError={(m) => this.notifyError(m)} /> : ""}
            </div>
        );
    }
}