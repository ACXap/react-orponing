import React from "react";
import TabItem from "./TabItem";

export default class TabControl extends React.PureComponent {
    onChangeTab = () => { console.warn("no listener onChangeTab") };

    tabAddress = "tab-orponing-address";
    tabFile = "tab-orponing-file";
    tabClipboard = "tab-orponing-clipboard";
    tabHistory = "tab-orponing-history";

    render() {
        return (
            <div className="tab-panel-tabs p-2">
                <TabItem name="Адрес" title="Орпонизация одиночного адреса"
                    onClick={this.props.onChangeTab} tabName={this.tabAddress} isActiveTab={this.props.lastTab === this.tabAddress} />
                <TabItem name="Файл" title="Орпонизация выбранного файла"
                    onClick={this.props.onChangeTab} tabName={this.tabFile} isActiveTab={this.props.lastTab === this.tabFile} />
                <TabItem name="Буфер обмена" title="Орпонизация текстовых данных из буфера обмена"
                    onClick={this.props.onChangeTab} tabName={this.tabClipboard} isActiveTab={this.props.lastTab === this.tabClipboard} />
                <TabItem name="История" title="Отслеживать свои работы"
                    onClick={this.props.onChangeTab} tabName={this.tabHistory} isActiveTab={this.props.lastTab === this.tabHistory} />
            </div>
        );
    }
}