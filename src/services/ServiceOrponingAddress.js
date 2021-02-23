import api from "./test/Api.js";
//import api from "../services/Api.js";
class ServiceOrponingAddress {
    async orponing(address) {
        const json = await api.apiOrponingAddress(address);
        return json;
    }
}

export default new ServiceOrponingAddress();