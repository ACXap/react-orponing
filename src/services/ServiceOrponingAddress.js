import api from "./test/Api.js";
//import api from "../services/Api.js";
class ServiceOrponingAddress {
    constructor(api) {
        this.api = api;
    }

    async orponing(address) {
        const json = await this.api.apiOrponingAddress(address);
        return json;
    }
}

export default new ServiceOrponingAddress(api);