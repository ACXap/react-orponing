import React from "react";
import ServiceOrponingAddress from "../../services/ServiceOrponingAddress.js";
import AddressResult from "./AddressResult.js";
import ProcessingOrponing from "../ProcessingOrponing.js";

class FormAddress extends React.Component {

    constructor({ notifyError }) {
        super();
        this.state = {
            resultAddress: null,
            processing: false,
            notifyError: notifyError
        }
    }

    async orponing() {
        try {
            const address = document.querySelector("#input-address").value;

            if (address) {
                this.setState({ processing: true });
                const json = await ServiceOrponingAddress.orponing(address);
                this.setState({ resultAddress: json, processing: false });
            }
        } catch (e) {
            this.setState({ processing: false });
            this.state.notifyError(e.message);
        }
    }

    render() {
        console.log("rend formAddress");
        return (
            <div id="div-form-address">
                <div className="input-group p-5">
                    <input type="text" className="form-control" placeholder="Адрес" id="input-address" />
                    <button className="btn btn-primary start" disabled={this.state.processing} type="button" id="orponing-address" onClick={() => this.orponing()}>Орпонизируй меня полностью</button>
                </div>
                {this.state.processing ? <ProcessingOrponing message="Обработка запроса..." /> : ""}
                {this.state.resultAddress ? <AddressResult result={this.state.resultAddress} /> : ""}
            </div>
        )
    }
}

export default FormAddress