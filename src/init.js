//import Api from "./services/Api.js";
//import Api from "./test/ApiNegative.js";
import Api from "./test/ApiPositive.js";

import ServiceLog from "./services/ServiceLog.js";
import ServiceOrponing from "./services/ServiceOrponing.js";
import ServiceOrponingAddress from "./services/ServiceOrponingAddress.js";
import ServiceOrponingClipboard from "./services/ServiceOrponingClipboard.js";
import ServiceOrponingComponent from "./services/ServiceOrponingComponent.js";
import ServiceOrponingFile from "./services/ServiceOrponingFile.js";
import ServiceHistory from "./services/ServiceHistory.js";

import { createBrowserHistory } from 'history';

const api = new Api();
const serviceOrponing = new ServiceOrponing(api);
const serviceLog = new ServiceLog(api);
const serviceOrponingAddress = new ServiceOrponingAddress(api);
const serviceOrponingComponent = new ServiceOrponingComponent(api);
const serviceOrponingClipboard = new ServiceOrponingClipboard(serviceOrponing);
const serviceOrponingFile = new ServiceOrponingFile(serviceOrponing);
const serviceHistory = new ServiceHistory(serviceOrponing);
const history = createBrowserHistory();

export { serviceLog, serviceOrponingAddress, serviceOrponingClipboard, serviceOrponingComponent, serviceOrponingFile, serviceHistory, history }