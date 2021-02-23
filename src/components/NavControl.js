import React from "react";
export default class NavControl extends React.Component {

    linkOrponing = "page-orponing";
    linkOrponingService = "page-orponing-service";
    linkLog = "page-log";
    linkAbout = "page-about";

    constructor({ onChangePage, lastOpenPage }) {
        super();
        this.state = {
            lastOpenPage: lastOpenPage,
            onChangePage: onChangePage
        }
    }

    openPage(pageId) {
        this.state.onChangePage(pageId);
        this.setState({ lastOpenPage: pageId });
    }

    getActiveLink(linkActive) {
        return `nav-link ${this.state.lastOpenPage === linkActive ? "active" : ""}`;
    }

    render() {
        return (
            <nav className="navbar navbar-expand fixed-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className={`navbar-brand + ${this.state.lastOpenPage === this.linkOrponing ? "active" : ""}`}
                        href="#" onClick={() => this.openPage(this.linkOrponing)}>Орпонизация</a>
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                        <li className="nav-item">
                            <a className={this.getActiveLink(this.linkOrponingService)}
                                href="#" onClick={() => this.openPage(this.linkOrponingService)}>Сервис орпонизации</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.getActiveLink(this.linkLog)}
                                href="#" onClick={() => this.openPage(this.linkLog)}>События</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.getActiveLink(this.linkAbout)}
                                href="#" onClick={() => this.openPage(this.linkAbout)}>Помощь</a>
                        </li>
                    </ul>
                </div>
            </nav >
        );
    }
}