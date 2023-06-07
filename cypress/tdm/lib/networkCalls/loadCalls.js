import fetch, { Headers } from 'cross-fetch';

import { getErrFromRes, updateVarWithParam } from '../../lib/utilities/utilities.js';
import { staticData } from '../../globalData/staticAssets.js';
import {
  createLoadV2Query,
  createLoadV2Variable,
  createUpdateStopV2Query,
  createUpdateStopV2Variable,
  acquireLockQuery,
  acquireLockVariable,
  assignVendToRtV2Query,
  assignVendToRtV2CarrierVar,
  assignVendToRtV2VendorVar,
  updateRouteVendorV2Query,
  updateRouteVendorV2Variable,
  releaseLockQuery,
  releaseLockVariable,
  driverAssignmentQuery,
  driverAssignmentVar,
  upsertStopEventV2Query,
  upsertStopEventV2Variable,
  updateRtMaxCostQuery,
  updateRtMaxCostVariable,
  createCostDetailsV2Query,
  createCostDetailsV2Variable,
  createRateDetailsQuery,
  createRateDetailsVariable,
  createVendorInvoiceQuery,
  createVendorInvoiceVar,
  getAllGlobalTenantChargeTypeConfigQuery,
  createOfferQuery,
  createOfferVar,
  updateOrderInvRequirementQuery,
  updateOrderInvRequirementVar,
  createLoadInvoiceBatchQuery,
  createLoadInvoiceBatchVar,
  processLoadInvoiceBatchQuery,
  processLoadInvoiceBatchVar,
  customerInvQueueV2Query,
  customerInvQueueV2Var,
} from '../graphqls/loadGraphql.js';

import globalData from '../../globalData/envData.json';
const {
  graphqlUrl,
  mastermindUserId,
} = globalData[Cypress.env('environment')];

const createLoadV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const unixTimestamp = Math.round((new Date()).getTime() / 1000);
  const isoTimestamp = new Date().toISOString().slice(0, 23) + 'Z';
  const varMapObj = {
    customerId: tempDataObj.customerId,
    trailerId: tempDataObj.trailerTypeId,
    trackingNumber: `${staticData.orderRefCommon}${unixTimestamp}`,
    orderNumber: `${staticData.orderRefCommon}-${isoTimestamp}`,
    mastermindUserId,
    activationStatus: tempDataObj.activationStatus,
    truckMode: tempDataObj.truckMode,
    sizeId: tempDataObj.sizeId,
    division: tempDataObj.division,
  };
  const graphqlVar = updateVarWithParam({ varObj: createLoadV2Variable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createLoadV2Query,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrl, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in createLoadV2 call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createUpdateStopV2 = async ({
  bearerToken: accToken,
  dataObj: tempDataObj,
  facilityId: facilityIdentifier,
  stopType: loadStopType,
  stopDateTime: stopTimeISO,
  loadFromId: loadFrom,
  unloadFromId: unloadFrom,
}) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=createOrUpdateStopV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    routeId: tempDataObj.routeId,
    facilityId: facilityIdentifier,
    loadStopType,
    stopDateTime: stopTimeISO,
    loadFromId: loadFrom,
    unloadFromId: unloadFrom,
  };
  const graphqlVar = updateVarWithParam({ varObj: createUpdateStopV2Variable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createUpdateStopV2Query,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in createUpdateStopV2 call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const acquireLock = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=acquireLock';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    routeId: tempDataObj.routeId,
  };
  const graphqlVar = updateVarWithParam({ varObj: acquireLockVariable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: acquireLockQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in acquireLock call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createOffers = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    routeId: tempDataObj.routeId,
    vendorId: tempDataObj.vendorId,
    isoTimestamp: (new Date(Date.now())).toISOString(),
  };
  const graphqlVar = updateVarWithParam({ varObj: createOfferVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createOfferQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrl, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in createOffer call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const assignVendorToRouteV2Carrier = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=assignVendorToRouteV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    mastermindUserId,
    routeId: tempDataObj.routeId,
    carrierId: tempDataObj.carrierId,
  };
  const graphqlVar = updateVarWithParam({ varObj: assignVendToRtV2CarrierVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: assignVendToRtV2Query,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in assignVendorToRouteV2Carrier call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const assignVendorToRouteV2Vendor = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=assignVendorToRouteV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    mastermindUserId,
    routeId: tempDataObj.routeId,
    vendorId: tempDataObj.vendorId,
  };
  const graphqlVar = updateVarWithParam({ varObj: assignVendToRtV2VendorVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: assignVendToRtV2Query,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in assignVendorToRouteV2Vendor call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const updateRouteVendorV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=updateRouteVendorV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    mastermindUserId,
    routeCarrierId: tempDataObj.routeCarrierId,
    trailerId: tempDataObj.trailerTypeId,
    utcExpectedEmptyDatetime: tempDataObj.utcExpEmptyDateTime,
  };
  const graphqlVar = updateVarWithParam({ varObj: updateRouteVendorV2Variable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: updateRouteVendorV2Query,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in updateRouteVendorV2 call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const releaseLock = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=releaseLock';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    routeId: tempDataObj.routeId,
  };
  const graphqlVar = updateVarWithParam({ varObj: releaseLockVariable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: releaseLockQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in releaseLock call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const upsertDriverAssignment = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=upsertDriverAssignment';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    routeId: tempDataObj.routeId,
    loadId: tempDataObj.loadId,
    trailerId: tempDataObj.trailerTypeId,
    centralOffsetTime: tempDataObj.centralOffsetTime,
    mastermindUserId,
  };
  const graphqlVar = updateVarWithParam({ varObj: driverAssignmentVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: driverAssignmentQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in upsertDriverAssignment call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const upsertStopEventsV2 = async ({
  bearerToken: accToken,
  dataObj: tempDataObj,
  isoDateTimeActual: actualISOTime,
  stopId: stopIdentifier,
  eventTypeId: eventType,
}) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=upsertStopEventsV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    mastermindUserId,
    loadId: tempDataObj.loadId,
    routeId: tempDataObj.routeId,
    pickUpStopId: stopIdentifier,
    eventTypeId: eventType,
    actualISOTime,
  };
  const graphqlVar = updateVarWithParam({ varObj: upsertStopEventV2Variable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: upsertStopEventV2Query,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in upsertStopEventsV2 call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const updateRouteMaxCost = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=updateRouteMaxCost';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    loadId: tempDataObj.loadId,
    routeId: tempDataObj.routeId,
  };
  const graphqlVar = updateVarWithParam({ varObj: updateRtMaxCostVariable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: updateRtMaxCostQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in updateRouteMaxCost call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const getAllGlobalTenantChargeTypeConfig = async ({ bearerToken: accToken }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  const graphql = JSON.stringify({
    query: getAllGlobalTenantChargeTypeConfigQuery,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrl, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in GetAllGlobalTenantChargeTypeConfig call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createCostDetailsV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=createCostDetailsV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    costLineItem: tempDataObj.chargeTypeId,
    loadId: tempDataObj.loadId,
    routeId: tempDataObj.routeId,
    carrierId: tempDataObj.carrierId,
    isoTimestamp: (new Date(Date.now())).toISOString(),
    costPerItem: parseInt(tempDataObj.chargePerItem),
    costUnit: parseInt(tempDataObj.units),
    stopId: tempDataObj.pickUpStopId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createCostDetailsV2Variable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createCostDetailsV2Query,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in createCostDetailsV2 call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createRateDetails = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=createRateDetails';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    customerId: tempDataObj.customerId,
    loadId: tempDataObj.loadId,
    orderId: tempDataObj.orderId,
    rateLineItem: tempDataObj.chargeTypeId,
    ratePerItem: parseInt(tempDataObj.chargePerItem),
    rateUnit: parseInt(tempDataObj.units),
    isoTimestamp: (new Date(Date.now())).toISOString(),
    stopId: tempDataObj.pickUpStopId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createRateDetailsVariable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createRateDetailsQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in createRateDetails call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createVendorInvoice = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=createVendorInvoice';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    vendorInvoiceNumber: Date.now().toString(),
    centralOffsetTime: tempDataObj.centralOffsetTime,
    loadId: tempDataObj.loadId,
    routeId: tempDataObj.routeId,
    carrierId: tempDataObj.carrierId,
    invoiceStatus: tempDataObj.invoiceStatus,
  };
  const graphqlVar = updateVarWithParam({ varObj: createVendorInvoiceVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createVendorInvoiceQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrlV2, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in createVendorInvoice call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const updateOrderInvRequirement = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    orderId: tempDataObj.orderId,
  };
  const graphqlVar = updateVarWithParam({ varObj: updateOrderInvRequirementVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: updateOrderInvRequirementQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrl, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in updateOrderInvRequirement call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createLoadInvoiceBatch = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    orderId: tempDataObj.orderId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createLoadInvoiceBatchVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createLoadInvoiceBatchQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrl, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in createLoadInvoiceBatch call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const processLoadInvoiceBatch = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  const dt = new Date(tempDataObj.centralOffsetTime).toISOString();
  const month = dt.slice(5, 7);
  const date = dt.slice(8, 10);
  const year = dt.slice(0, 4);
  const invoiceDate = (`${month}/${date}/${year}`);

  //parameterizing GraphQL variables
  const varMapObj = {
    customerId: tempDataObj.customerId,
    batchId: tempDataObj.invoiceBatchId,
    invoiceHeaderId: tempDataObj.invoiceHeaderId,
    rateDetailId: tempDataObj.rateDetailId,
    invDistributionMethod: tempDataObj.invDistributionMethod,
    paymentTerms: tempDataObj.paymentTerms,
    invoiceDate,
  };
  const graphqlVar = updateVarWithParam({ varObj: processLoadInvoiceBatchVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: processLoadInvoiceBatchQuery,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrl, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in processLoadInvoiceBatch call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const customerInvQueueV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    loadId: tempDataObj.loadId,
  };
  const graphqlVar = updateVarWithParam({ varObj: customerInvQueueV2Var, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: customerInvQueueV2Query,
    variables: graphqlVar,
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(graphqlUrl, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in CustomerInvQueueV2 call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

export {
  createLoadV2,
  createUpdateStopV2,
  acquireLock,
  assignVendorToRouteV2Carrier,
  assignVendorToRouteV2Vendor,
  updateRouteVendorV2,
  releaseLock,
  upsertDriverAssignment,
  upsertStopEventsV2,
  updateRouteMaxCost,
  createCostDetailsV2,
  createRateDetails,
  createVendorInvoice,
  getAllGlobalTenantChargeTypeConfig,
  createOffers,
  updateOrderInvRequirement,
  createLoadInvoiceBatch,
  processLoadInvoiceBatch,
  customerInvQueueV2,
};