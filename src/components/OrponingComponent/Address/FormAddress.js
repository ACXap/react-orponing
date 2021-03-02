import React from "react";
import { serviceOrponingAddress } from "../../../init";

import AddressResult from "./AddressResult";
import ProcessingOrponing from "../../ProcessingOrponing";

export default class FormAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultAddress: serviceOrponingAddress.getLastResult() ?? "",
            requestAddress: serviceOrponingAddress.getLastAddress() ?? "",
            processing: false
        }

        this.notifyError = props.notifyError;
        this.getResult = (adr) => serviceOrponingAddress.orponing(adr);
        this.inputAddress = React.createRef();
    }

    componentDidUpdate() {
        this.inputAddress.current.focus();
    }
    componentDidMount() {
        this.inputAddress.current.focus();
    }

    handleClickKey = (e) => {
        if (e.keyCode != 13) return;
        e.preventDefault();
        this.orponing();
    }

    orponing = async () => {
        if (this.state.processing) return;

        const address = this.state.requestAddress;
        if (address) {
            this.setState({ processing: true });

            const json = await this.getResult(address);
            if (json.error) this.notifyError(json.error, "Ошибка орпонизации адреса");

            this.setState({ processing: false, resultAddress: json.result });
        }
    }

    setAddress = (e) => {
        this.setState({ requestAddress: e.target.value });
    }

    render() {
        return (
            <div hidden={this.props.hidden}>
                <div className="input-group p-5">
                    <input className="form-control" disabled={this.state.processing} placeholder="Адрес" value={this.state.requestAddress} ref={this.inputAddress}
                        onKeyDown={this.handleClickKey}
                        onChange={this.setAddress} />
                    <button className="btn btn-primary" disabled={this.state.processing}
                        onClick={this.orponing}>Орпонизируй меня полностью</button>
                </div>
                {this.state.processing && <ProcessingOrponing message="Обработка запроса..." />}
                {this.state.resultAddress && <AddressResult result={this.state.resultAddress} />}
            </div>
        );
    }
}