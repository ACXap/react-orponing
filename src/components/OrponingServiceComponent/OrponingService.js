import React from "react";

import { serviceOrponingComponent } from "../../init";
import ProcessingOrponing from "../ProcessingOrponing";
import OrponingComponentItem from "./OrponingComponentItem";

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
        const listComponent = this.state.listComponent.map((i, index) => <OrponingComponentItem item={i} key={index} />);

        return (
            <div className="container p-5 shadow-lg">
                <div className="row py-5 text-center">
                    <h2>Сервис Орпонизации</h2>
                </div>
                {this.state.processing ? <ProcessingOrponing message="Загрузка компонентов..." /> : ""}
                <div className="row row-cols-md-3 g-4 text-center">
                    {listComponent}
                </div>
            </div>
        );
    }
}