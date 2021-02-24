//import Api from "./test/Api.js";
import Api from "../services/Api.js";

class ServiceOrponingAddress {
    async orponing(address) {
        const json = await Api.apiOrponingAddress(address);
        return json;
    }
}

export default new ServiceOrponingAddress();