import React from "react";
import Orponing from "./components/OrponingComponent/Orponing";
import About from "./components/AboutComponent/About";
import Log from "./components/LogComponent/Log"
import OrponingService from "./components/OrponingServiceComponent/OrponingService";
import ModalB from "./components/Modal/ModalB";
import NavControlB from "./components/NavControlB";
import { Route, BrowserRouter } from "react-router-dom";

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
                <ModalB isShow={isShow}
                    message={message}
                    title={title}
                    onClose={() => this.setState({ modal: this.createModal(false, "", "") })} />
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