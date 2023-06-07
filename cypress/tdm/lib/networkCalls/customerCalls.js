import fetch, { Headers } from 'cross-fetch';

import { getErrFromRes, updateVarWithParam } from '../../lib/utilities/utilities.js';

import globalData from '../../globalData/envData.json';

import {
  createOrUpdateCustomerQuery,
  createOrUpdateCustomerVar,
  createUpdateCustomerSettingQuery,
  createUpdateCustomerSettingVar,
  createCreditHistoryQuery,
  createCreditHistoryVar,
  addressStatusUpdateQuery,
  addressStatusUpdateVar,
  createUpdateCarCustRelQuery,
  createUpdateCarCustRelVar,
  createUpdateCustFacilityRelQuery,
  createUpdateCustFacilityRelVar,
  createCustomerLoadDefaultsVar,
  createCustomerLoadDefaultsQuery,
  crmOpportunitySaveV2Query,
  crmOpportunitySaveV2Var,
  crmOpportunityEntityLookupV2Query,
  crmContactEntityLookupQuery,
  crmSaveContactQuery,
  crmSaveContactVar,
} from '../graphqls/customerGraphql.js';
import {
  allEmployeesV2Query,
  allEmployeesV2Var,
} from '../graphqls/commonGraphql';
const {
  graphqlUrl,
  mastermindUserId,
} = globalData[Cypress.env('environment')];

const createOrUpdateCustomerV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=createOrUpdateCustomerV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    customerCode: tempDataObj.customerCode,
    customerName: tempDataObj.customerName,
    customerPh: tempDataObj.customerPh,
    customerUrl: tempDataObj.customerUrl,
    customerLevelType: tempDataObj.customerLevelType,
    customerOpportunityType: tempDataObj.customerOpportunityType,
    customerStatus: tempDataObj.customerStatus,
    customerCargoInsurance: tempDataObj.customerCargoInsurance,
    customerGeneralInsurance: tempDataObj.customerGeneralInsurance,
    customerLiabilityInsurance: tempDataObj.customerGeneralInsurance,
    city: tempDataObj.city,
    state: tempDataObj.state,
    street1: tempDataObj.street1,
    postalCode: tempDataObj.postalCode,
    country: tempDataObj.country,
    invoiceDistributionMethodId: tempDataObj.invoiceDistributionMethodId,
    identiferCode: tempDataObj.identiferCode,
    identifierTypeId: tempDataObj.identifierTypeId,
    mastermindUserId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createOrUpdateCustomerVar, mapObj: varMapObj });

  if (tempDataObj.generalContact === 'NO') {
    delete (graphqlVar?.input.contacts);
  }

  const graphql = JSON.stringify({
    query: createOrUpdateCustomerQuery,
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
    throw new Error(`Error in createOrUpdateCustomerV2 call. response status: ${response.status}. 
      ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createOrUpdateCustomerSettingV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  const varMapObj = {
    customerId: tempDataObj.customerId,
    //trailerTypeIds: tempDataObj.trailerTypeIds,
  };
  const graphqlVar = updateVarWithParam({ varObj: createUpdateCustomerSettingVar, mapObj: varMapObj });
  const graphql = JSON.stringify({
    query: createUpdateCustomerSettingQuery,
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
    throw new Error(`Error in createOrUpdateCustomerSettingV2 call. response status: ${response.status}. 
      ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const crmOpportunitySaveV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  const entityLookupIDGql = JSON.stringify({
    query: crmOpportunityEntityLookupV2Query,
    variables: {},
  });

  const entityLookupIDReq = {
    method: 'POST',
    headers: graphqlHeader,
    body: entityLookupIDGql,
    redirect: 'follow',
  };
  const entityLookupIDRes = await fetch(graphqlUrl, entityLookupIDReq);
  const entityLookupIDBody = await entityLookupIDRes.json();
  const entityLookupIDVal = entityLookupIDBody.data.crmOpportunityEntityLookupV2[1].entityLookupId;

  const varUserDetailsMapObj = {
    userNameOrEmail: Cypress.env('username'),
  };
  const userDeatailsGqlVar = updateVarWithParam({ varObj: allEmployeesV2Var, mapObj: varUserDetailsMapObj });
  const userDetailsGQL = JSON.stringify({
    query: allEmployeesV2Query,
    variables: userDeatailsGqlVar,
  });
  const userDeatailsGqlReq = {
    method: 'POST',
    headers: graphqlHeader,
    body: userDetailsGQL,
    redirect: 'follow',
  };
  const userDetailsRes = await fetch(graphqlUrl, userDeatailsGqlReq);
  const userDetailsResBody = await userDetailsRes.json();
  const employeeIDVal = userDetailsResBody.data.allEmployeesV2.edges[0].node.id;
  const employeeUserIDVal = userDetailsResBody.data.allEmployeesV2.edges[0].node.userId;

  const varMapObj = {
    customerId: tempDataObj.customerId,
    entityLookupID: entityLookupIDVal,
    employeeID: employeeIDVal,
    employeeUserID: employeeUserIDVal,
    opprStage: tempDataObj.opprStage,
    opprStatus: tempDataObj.opprStatus,
  };
  const graphqlVar = updateVarWithParam({ varObj: crmOpportunitySaveV2Var, mapObj: varMapObj });
  const graphql = JSON.stringify({
    query: crmOpportunitySaveV2Query,
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
    throw new Error(`Error in crmOpportunitySaveV2Query call. response status: ${response.status}. 
      ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};
const crmSaveContact = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  const entityLookupIDGql = JSON.stringify({
    query: crmContactEntityLookupQuery,
    variables: {},
  });

  const entityLookupIDReq = {
    method: 'POST',
    headers: graphqlHeader,
    body: entityLookupIDGql,
    redirect: 'follow',
  };
  const entityLookupIDRes = await fetch(graphqlUrl, entityLookupIDReq);
  const entityLookupIDBody = await entityLookupIDRes.json();
  const entityLookupIDVal = entityLookupIDBody.data.crmContactEntityLookup[1].entityLookupId;

  const varUserDetailsMapObj = {
    userNameOrEmail: Cypress.env('username'),
  };
  const userDeatailsGqlVar = updateVarWithParam({ varObj: allEmployeesV2Var, mapObj: varUserDetailsMapObj });
  const userDetailsGQL = JSON.stringify({
    query: allEmployeesV2Query,
    variables: userDeatailsGqlVar,
  });
  const userDeatailsGqlReq = {
    method: 'POST',
    headers: graphqlHeader,
    body: userDetailsGQL,
    redirect: 'follow',
  };
  const userDetailsRes = await fetch(graphqlUrl, userDeatailsGqlReq);
  const userDetailsResBody = await userDetailsRes.json();
  //const employeeIDVal = userDetailsResBody.data.allEmployeesV2.edges[0].node.id;
  const employeeUserIDVal = userDetailsResBody.data.allEmployeesV2.edges[0].node.userId;

  const varMapObj = {
    customerId: tempDataObj.customerId,
    entityLookupID: entityLookupIDVal,
    //employeeID: employeeIDVal,
    employeeUserID: employeeUserIDVal,
    contactName: tempDataObj.contactName,
    departmentName: tempDataObj.contactDepartment,
  };
  const graphqlVar = updateVarWithParam({ varObj: crmSaveContactVar, mapObj: varMapObj });
  const graphql = JSON.stringify({
    query: crmSaveContactQuery,
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
    throw new Error(`Error in crmOpportunitySaveV2Query call. response status: ${response.status}. 
      ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};
const createCustomerLoadDefaults = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  const varMapObj = {
    customerId: tempDataObj.customerId,
    trailerTypeIds: tempDataObj.trailerTypeIds,
  };
  const graphqlVar = updateVarWithParam({ varObj: createCustomerLoadDefaultsVar, mapObj: varMapObj });
  const graphql = JSON.stringify({
    query: createCustomerLoadDefaultsQuery,
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
    throw new Error(`Error in createCustomerLoadDefaults call. response status: ${response.status}. 
      ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createCreditHistoryV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    customerId: tempDataObj.customerId,
    creditStatus: tempDataObj.creditStatus,
    creditLimit: parseInt(tempDataObj.creditLimit),
    customerCreditExpiryDate: tempDataObj.customerCreditExpiryDate,
  };
  const graphqlVar = updateVarWithParam({ varObj: createCreditHistoryVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createCreditHistoryQuery,
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
    throw new Error(`Error in createCreditHistoryV2 call. response status: ${response.status}. 
      ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const addressStatusUpdate = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    addressId: tempDataObj.customerAddressId,
  };
  const graphqlVar = updateVarWithParam({ varObj: addressStatusUpdateVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: addressStatusUpdateQuery,
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
    throw new Error(`Error in addressStatusUpdate call. response status: ${response.status}. 
      ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createUpdateCarrierCustRelV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    relatedCarrierIdToCustomer: tempDataObj.carrierId,
    customerId: tempDataObj.customerId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createUpdateCarCustRelVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createUpdateCarCustRelQuery,
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
    throw new Error(`Error in createUpdateCarrierCustRelV2 call. response status: ${response.status}. 
      ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createUpdateCustFacilityRelV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    relatedFacilityIdToCustomer: tempDataObj.facilityId,
    customerId: tempDataObj.customerId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createUpdateCustFacilityRelVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createUpdateCustFacilityRelQuery,
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
    throw new Error(`Error in createUpdateCustFacilityRelV2 call. response status: ${response.status}. 
      ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

export {
  createOrUpdateCustomerV2,
  createOrUpdateCustomerSettingV2,
  createCreditHistoryV2,
  addressStatusUpdate,
  createUpdateCarrierCustRelV2,
  createUpdateCustFacilityRelV2,
  createCustomerLoadDefaults,
  crmOpportunitySaveV2,
  crmSaveContact,
};