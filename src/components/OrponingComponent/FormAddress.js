import React from "react";
import { serviceOrponingAddress, history } from "../../init";

import AddressResult from "./AddressResult";
import ProcessingOrponing from "../ProcessingOrponing";

class FormAddress extends React.Component {
    constructor({ notifyError }) {
        super();
        this.state = {
            resultAddress: history.location?.resultAddress,
            requestAddress: history.location?.resultAddress?.requestAddress,
            processing: false
        }

        this.notifyError = notifyError;
    }

    async orponing() {
        try {
            const address = this.state.requestAddress;
            if (this.state.requestAddress) {
                this.setState({ processing: true });
                const json = await serviceOrponingAddress.orponing(address);
                json.requestAddress = address;
                this.setState({ resultAddress: json, processing: false });

                history.push({ resultAddress: json });
            }
        } catch (e) {
            this.setState({ processing: false, resultAddress: null });
            this.notifyError(e.message, "Ошибка орпонизации адреса");
        }
    }

    render() {
        return (
            <div>
                <div className="input-group p-5">
                    <input type="text" className="form-control" placeholder="Адрес" defaultValue={this.state.requestAddress}
                        onChange={(e) => this.setState({ requestAddress: e.target.value })} />
                    <button className="btn btn-primary" disabled={this.state.processing} type="button"
                        onClick={() => this.orponing()}>Орпонизируй меня полностью</button>
                </div>
                {this.state.processing ? <ProcessingOrponing message="Обработка запроса..." /> : ""}
                {this.state.resultAddress ? <AddressResult result={this.state.resultAddress} /> : ""}
            </div>
        )
    }
}

export default FormAddress