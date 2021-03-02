import Api from "./services/Api.js";
//import Api from "./test/ApiNegative.js";
//import Api from "./test/ApiPositive.js";
import ServiceLog from "./services/ServiceLog.js";
import RepositoryOrponing from "./services/RepositoryOrponing.js";
import ServiceOrponingAddress from "./services/ServiceOrponingAddress.js";
import ServiceOrponingClipboard from "./services/ServiceOrponingClipboard.js";
import ServiceOrponingComponent from "./services/ServiceOrponingComponent.js";
import ServiceOrponingFile from "./services/ServiceOrponingFile.js";
import ServiceHistory from "./services/ServiceHistory.js";

const BASE_URL = "api/1.0/";

const api = new Api(BASE_URL);
const repositoryOrponing = new RepositoryOrponing(api);
const serviceLog = new ServiceLog(api);
const serviceOrponingAddress = new ServiceOrponingAddress(api);
const serviceOrponingComponent = new ServiceOrponingComponent(api);
const serviceOrponingClipboard = new ServiceOrponingClipboard(repositoryOrponing);
const serviceOrponingFile = new ServiceOrponingFile(repositoryOrponing);
const serviceHistory = new ServiceHistory(repositoryOrponing);

export { serviceLog, serviceOrponingAddress, serviceOrponingClipboard, serviceOrponingComponent, serviceOrponingFile, serviceHistory }