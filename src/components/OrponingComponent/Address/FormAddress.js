import React from "react";
import { serviceOrponingAddress, history } from "../../../init";

import AddressResult from "./AddressResult";
import ProcessingOrponing from "../../ProcessingOrponing";

export default class FormAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultAddress: history.location?.resultAddress,
            requestAddress: history.location?.resultAddress?.requestAddress,
            processing: false
        }

        this.notifyError = props.notifyError;
    }

    async orponing() {
        try {
            const address = this.state.requestAddress;

            if (address) {
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

    setAddress(e) {
        this.setState({ requestAddress: e.target.value });
    }

    render() {
        return (
            <div>
                <div className="input-group p-5">
                    <input type="text" className="form-control" placeholder="Адрес" value={this.state.requestAddress}
                        onChange={(e) => this.setAddress(e)} />
                    <button className="btn btn-primary" disabled={this.state.processing} type="button"
                        onClick={() => this.orponing()}>Орпонизируй меня полностью</button>
                </div>
                {this.state.processing ? <ProcessingOrponing message="Обработка запроса..." /> : ""}
                {this.state.resultAddress ? <AddressResult result={this.state.resultAddress} /> : ""}
            </div>
        );
    }
}