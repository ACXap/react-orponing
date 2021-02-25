import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default class TabControl extends React.Component {
    onChangeTab = () => { console.warn("no listener onChangeTab") };

    tabAddress = "tab-orponing-address";
    tabFile = "tab-orponing-file";
    tabClipboard = "tab-orponing-clipboard";
    tabHistory = "tab-orponing-history";

    constructor(props) {
        super(props);

        this.state = {
            lastTab: props.lastTab
        };

        this.onChangeTab = props.onChangeTab
    }

    tabClick(nameTab) {
        this.setState({ lastTab: nameTab })
        this.onChangeTab(nameTab);
    }

    getClassName(tabName) {
        return `btn btn-outline-primary mx-1 ${this.state.lastTab === tabName ? "active" : ""}`;
    }

    render() {
        return (
            <div className="tab-panel-tabs p-2">
                <button className={this.getClassName(this.tabAddress)}
                    title="Орпонизация одиночного адреса" onClick={e => this.tabClick(this.tabAddress)}>Адрес</button>
                <button className={this.getClassName(this.tabFile)}
                    title="Орпонизация выбранного файла" onClick={e => this.tabClick(this.tabFile)}>Файл</button>
                <button className={this.getClassName(this.tabClipboard)}
                    title="Орпонизация текстовых данных из буфера обмена" onClick={e => this.tabClick(this.tabClipboard)}>Буфер обмена</button>
                <button className={this.getClassName(this.tabHistory)}
                    title="Отслеживать свои работы" onClick={e => this.tabClick(this.tabHistory)}>История</button>
            </div>
        )
    }
}