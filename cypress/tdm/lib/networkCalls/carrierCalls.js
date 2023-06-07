import fetch, { Headers } from 'cross-fetch';
import { getErrFromRes, updateVarWithParam } from '../../lib/utilities/utilities.js';
import globalData from '../../globalData/envData.json';
import {
  createOrUpdateCarrierQuery,
  createOrUpdateCarrierVar,
  createUpdateCarrierSettingQuery,
  createUpdateCarrierSettingVar,
  copyGlobalVendorReqDocCarrierQuery,
  copyGlobalVendorReqDocCarrierVar,
  addressStatusUpdateQuery,
  addressStatusUpdateVar,
  updateCarrierStandingV2Query,
  updateCarrierStandingV2Var,
  createCarrierCertificationV2Query,
  createCarrierCertificationV2Var,
  createUpdateCarrierCustRelQuery,
  createUpdateCarrierCustRelVar,
  createCarrierFacilityRelQuery,
  createCarrierFacilityRelVar,
  crmOpportunitySaveV2Query,
  crmOpportunitySaveV2Var,
  crmOpportunityEntityLookupV2Query,
  crmContactEntityLookupQuery,
  crmSaveContactVar,
  crmSaveContactQuery,
} from '../graphqls/carrierGraphql.js';
import {
  allEmployeesV2Query,
  allEmployeesV2Var,
} from '../graphqls/commonGraphql';
const {
  graphqlUrl,
  mastermindUserId,
} = globalData[Cypress.env('environment')];

const createOrUpdateCarrier = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const urlQueryParam = 'm=createOrUpdateCarrierV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    carrierCode: tempDataObj.carrierCode,
    carrierName: tempDataObj.carrierName,
    insurances: tempDataObj.insuranceArr,
    carrierUrl: tempDataObj.carrierUrl,
    carrierDBAName: tempDataObj.carrierDBAName,
    scacNumber: tempDataObj.scacNumber,
    carrierEmail: tempDataObj.carrierEmail,
    carrierPh: tempDataObj.carrierPh,
    mastermindUserId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createOrUpdateCarrierVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createOrUpdateCarrierQuery,
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
    throw new Error(`Error in createOrUpdateCarrier call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createOrUpdateCarrierSetting = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'm=createOrUpdateCarrierSettingV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    carrierId: tempDataObj.carrierId,
    trailerId: tempDataObj.trailerTypeId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createUpdateCarrierSettingVar, mapObj: varMapObj });
  const graphql = JSON.stringify({
    query: createUpdateCarrierSettingQuery,
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
    throw new Error(`Error in createOrUpdateCarrierSetting call. response status: ${response.status}.
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
  const entityLookupIDVal = entityLookupIDBody?.data?.crmOpportunityEntityLookupV2[0]?.entityLookupId;

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
    carrierId: tempDataObj.carrierId,
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
  const entityLookupIDVal = entityLookupIDBody.data.crmContactEntityLookup[0].entityLookupId;

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
    carrierId: tempDataObj.carrierId,
    entityLookupID: entityLookupIDVal,
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
const copyGlobalVendorRequiredDocumentForCarrier = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    carrierId: tempDataObj.carrierId,
  };
  const graphqlVar = updateVarWithParam({ varObj: copyGlobalVendorReqDocCarrierVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: copyGlobalVendorReqDocCarrierQuery,
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
    throw new Error(`Error in copyGlobalVendorRequiredDocumentForCarrier call. response status: ${response.status}.
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
    addressId: tempDataObj.carrierAddressId,
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

const updateCarrierStandingV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    carrierId: tempDataObj.carrierId,
    carrierStandingStatus: tempDataObj.carrierStandingStatus,
    carrierStandingReasonCodeObject: tempDataObj.carrierStandingReasonCodeId,
  };
  const graphqlVar = updateVarWithParam({ varObj: updateCarrierStandingV2Var, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: updateCarrierStandingV2Query,
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
    throw new Error(`Error in updateCarrierStandingV2 call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createCarrierCertificationV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    carrierId: tempDataObj.carrierId,
    carrierCertTypeId: tempDataObj.carrierCertTypeId,
    carrierCertExpDate: tempDataObj.carrierCertExpDate,
  };
  const graphqlVar = updateVarWithParam({ varObj: createCarrierCertificationV2Var, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createCarrierCertificationV2Query,
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
    throw new Error(`Error in createCarrierCertificationV2 call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createOrUpdateCarrierCustomerRel = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    carrierId: tempDataObj.carrierId,
    relatedCustomerIdToCarrier: tempDataObj.relatedCustomerId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createUpdateCarrierCustRelVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createUpdateCarrierCustRelQuery,
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
    throw new Error(`Error in createOrUpdateCarrierCustomerRel call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createCarrierFacilityRelationship = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    carrierId: tempDataObj.carrierId,
    relatedFacilityIdToCarrier: tempDataObj.facilityId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createCarrierFacilityRelVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createCarrierFacilityRelQuery,
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
    throw new Error(`Error in createCarrierFacilityRelationship call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

export {
  createOrUpdateCarrier,
  createOrUpdateCarrierSetting,
  copyGlobalVendorRequiredDocumentForCarrier,
  addressStatusUpdate,
  updateCarrierStandingV2,
  createCarrierCertificationV2,
  createOrUpdateCarrierCustomerRel,
  createCarrierFacilityRelationship,
  crmOpportunitySaveV2,
  crmSaveContact,
};