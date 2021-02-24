import React from "react";
import Orponing from "./components/OrponingComponent/Orponing.js";
import About from "./components/AboutComponent/About.js";
import Log from "./components/LogComponent/Log.js"
import OrponingService from "./components/OrponingServiceComponent/OrponingService.js";
import Modal from "./components/Modal/Modal.js";
import NavControlB from "./components/NavControlB.js";
import { BrowserRouter, Route } from "react-router-dom";

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

    notifyError(message, title) {
        this.setState({ messageModal: message, isShow: true, title: title });
    }

    closeModal() {
        this.setState({ messageModal: "", isShow: false, title: "" });
    }

    render() {
        return (
            <BrowserRouter>
                <NavControlB />
                <Modal isShow={this.state.isShow}
                    message={this.state.messageModal}
                    title={this.state.title}
                    onClose={() => this.closeModal()} />
                <Route exact path="/" render={() => <Orponing notifyError={(m) => this.notifyError(m)} />} />
                <Route path="/about" render={() => <About notifyError={(m) => this.notifyError(m)} />} />
                <Route path="/log" render={() => <Log notifyError={(m) => this.notifyError(m)} />} />
                <Route path="/orponing-service" render={() => <OrponingService notifyError={(m) => this.notifyError(m)} />} />
            </BrowserRouter>
        );
    }
}