import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

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

    openModal(message, title) {
        this.setState({ modal: this.createModal(true, message, title) });
    }

    createModal(isShow, message, title) {
        return { isShow, message, title }
    }

    render() {
        const { isShow, message, title } = this.state.modal
        return (
            <div>
                { this.state.modal.isShow ? <Modal isShow={isShow}
                    message={message}
                    title={title}
                    onClose={() => this.setState({ modal: this.createModal(false, "", "") })} /> : ""}

                <BrowserRouter>
                    <NavControlB />
                    <Route exact path="/" render={() => <Orponing notifyError={(m, t) => this.openModal(m, t)} />} />
                    <Route path="/about" render={() => <About notifyError={(m, t) => this.openModal(m, t)} />} />
                    <Route path="/logs" render={() => <Log notifyError={(m, t) => this.openModal(m, t)} />} />
                    <Route path="/orponing-service" render={() => <OrponingService notifyError={(m, t) => this.openModal(m, t)} />} />
                </BrowserRouter >
            </div >
        );
    }
}