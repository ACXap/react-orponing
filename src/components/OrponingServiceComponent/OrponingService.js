import React from "react";

import { serviceOrponingComponent } from "../../init";
import ProcessingOrponing from "../ProcessingOrponing";
import OrponingComponentItem from "./OrponingComponentItem";
import HeaderPage from "../HeaderPage";

export default class OrponingService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: true,
            listComponent: []
        }

        this.notifyError = props.notifyError;
    }

    async componentDidMount() {
        try {
            const result = await serviceOrponingComponent.getListServices();
            this.setState({ processing: false, listComponent: result });
        } catch (e) {
            this.setState({ processing: false, listComponent: [] });
            this.notifyError(e.message, "Ошибка получения списка сервисов");
        }
    }

    render() {
        window.countRender++;
        console.log("render OrponingService");

        const listComponent = this.state.listComponent.map((i, index) => <OrponingComponentItem item={i} key={index} />);

        return (
            <div className="container p-5 shadow-lg">
                <HeaderPage header="Сервис Орпонизации" />

                {this.state.processing ? <ProcessingOrponing message="Загрузка компонентов..." /> : ""}
                <div className="row row-cols-md-3 g-4 text-center">
                    {listComponent}
                </div>
            </div>
        );
    }
}