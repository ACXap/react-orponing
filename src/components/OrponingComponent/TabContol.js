import React from "react";

export default class TabControl extends React.Component {
    constructor({ onChangeTab }) {
        super();
        this.onChangeTab = onChangeTab;
    }

    tabClick(e) {
        this.onChangeTab(e);
    }

    render() {
        return (
            <div className="tab-panel-tabs p-2">
                <button className="btn btn-primary mx-1"
                    title="Орпонизация одиночного адреса" onClick={e => this.tabClick("tab-orponing-address")} >Адрес</button>
                <button className="btn btn-primary mx-1"
                    title="Орпонизация выбранного файла" onClick={e => this.tabClick("tab-orponing-file")}>Файл</button>
                <button className="btn btn-primary mx-1"
                    title="Орпонизация текстовых данных из буфера обмена" onClick={e => this.tabClick("tab-orponing-clipboard")}>Буфер обмена</button>
                <button className="btn btn-primary mx-1"
                    title="Отслеживать свои работы" onClick={e => this.tabClick("tab-orponing-history")}>История</button>
            </div>
        )
    }
}