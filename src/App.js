import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";

import Orponing from "./components/OrponingComponent/Orponing";
import About from "./components/AboutComponent/About";
import Log from "./components/LogComponent/Log"
import OrponingService from "./components/OrponingServiceComponent/OrponingService";
import Modal from "./components/Modal/Modal";
import NavControlB from "./components/NavControlB";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modal: this.createModal(false, "", "") }
    }

    openModal = (message, title) => { this.setState({ modal: this.createModal(true, message, title) }); }
    closeModal = () => { this.setState({ modal: this.createModal(false, "", "") }); }
    createModal = (isShow, message, title) => ({ isShow, message, title });

    render() {
        window.countRender++;
        console.log("render app");

        const { isShow, message, title } = this.state.modal
        return (
            <React.Fragment>
                {this.state.modal.isShow ? <Modal isShow={isShow}
                    message={message}
                    title={title}
                    onClose={this.closeModal} /> : ""}

                <BrowserRouter>
                    <NavControlB />
                    <Route exact path="/"><Orponing notifyError={this.openModal} /></Route>
                    <Route path="/about"><About notifyError={this.openModal} /></Route>
                    <Route path="/logs"><Log notifyError={this.openModal} /></Route>
                    <Route path="/orponing-service"><OrponingService notifyError={this.openModal} /></Route>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}