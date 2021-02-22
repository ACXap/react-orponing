import { render } from "@testing-library/react";
import React from "react";
export default class NavControl extends React.Component {

    constructor({ onChangePage, lastOpenPage }) {
        super();
        this.state = {
            lastOpenPage: lastOpenPage,
            onChangePage: onChangePage
        }
    }

    openPage(e, pageId) {
        this.state.onChangePage(pageId);
        this.setState({ lastOpenPage: pageId });
    }

    render() {
        return (
            <nav className="navbar navbar-expand fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className={`navbar-brand + ${this.state.lastOpenPage === "page-orponing" ? "active" : ""}`}
                        href="#" onClick={(e) => this.openPage(e, "page-orponing")}>Орпонизация</a>
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                        <li className="nav-item">
                            <a className={`nav-link " + ${this.state.lastOpenPage === "page-orponing-service" ? "active" : ""}`}
                                href="#" onClick={(e) => this.openPage(e, "page-orponing-service")}>Сервис орпонизации</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link " + ${this.state.lastOpenPage === "page-log" ? "active" : ""}`}
                                href="#" onClick={(e) => this.openPage(e, "page-log")}>События</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link " + ${this.state.lastOpenPage === "page-about" ? "active" : ""}`}
                                href="#" onClick={(e) => this.openPage(e, "page-about")}>Помощь</a>
                        </li>
                    </ul>
                </div>
            </nav >
        )
    }
}