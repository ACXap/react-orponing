import React from "react";
import TabItem from "./TabItem";

export default class TabControl extends React.PureComponent {
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

    tabClick = (tabId) => {
        this.setState({ lastTab: tabId })
        this.onChangeTab(tabId);
    }

    render() {
        window.countRender++;
        console.log("render TabControl");

        return (
            <div className="tab-panel-tabs p-2">
                <TabItem name="Адрес" title="Орпонизация одиночного адреса"
                    onClick={this.tabClick} tabName={this.tabAddress} isActiveTab={this.state.lastTab === this.tabAddress} />
                <TabItem name="Файл" title="Орпонизация выбранного файла"
                    onClick={this.tabClick} tabName={this.tabFile} isActiveTab={this.state.lastTab === this.tabFile} />
                <TabItem name="Буфер обмена" title="Орпонизация текстовых данных из буфера обмена"
                    onClick={this.tabClick} tabName={this.tabClipboard} isActiveTab={this.state.lastTab === this.tabClipboard} />
                <TabItem name="История" title="Отслеживать свои работы"
                    onClick={this.tabClick} tabName={this.tabHistory} isActiveTab={this.state.lastTab === this.tabHistory} />
            </div>
        );
    }
}