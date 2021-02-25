import React from "react";
import { serviceOrponingComponent } from "../../init";
import ProcessingOrponing from "../ProcessingOrponing";
import OrponingComponentItem from "./OrponingComponentItem";

export default class OrponingService extends React.Component {
    constructor({ notifyError }) {
        super();
        this.state = {
            processing: true,
            notifyError: notifyError,
            listComponent: []
        }
    }

    async componentDidMount() {
        try {
            const result = await serviceOrponingComponent.getListServices();

            this.setState({ processing: false, listComponent: result });
        } catch (e) {
            this.setState({ processing: false, listComponent: [] });
            this.state.notifyError(e.message, "Ошибка получения списка сервисов");
        }
    }

    render() {
        return (
            <div className="container py-5 text-center">
                <div className="row py-5">
                    <h2>Сервис Орпонизации</h2>
                </div>
                {this.state.processing ? <ProcessingOrponing message="Загрузка компонентов..." /> : ""}
                <div className="row row-cols-md-3 g-4">
                    {this.state.listComponent.map((i, index) => <OrponingComponentItem item={i} key={index} />)}
                </div>
            </div>
        );
    }
}