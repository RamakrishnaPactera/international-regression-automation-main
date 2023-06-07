import fetch, { Headers } from 'cross-fetch';

import { getErrFromRes, updateVarWithParam } from '../../lib/utilities/utilities.js';

import globalData from '../../globalData/envData.json';

import {
  createOrUpdateFacilityV2Query,
  createOrUpdateFacilityV2Var,
  addressStatusUpdateQuery,
  addressStatusUpdateVar,
  createCarrierFacilityRelQuery,
  createCarrierFacilityRelVar,
  createOrUpdateFacilityIdV2Query,
  createOrUpdateFacilityIdV2Var,
  createUpdateFacilityDirectionQuery,
  createUpdateFacilityDirectionVar,
  createUpdateFacilityScheduleQuery,
  createUpdateFacilityScheduleVar,
} from '../graphqls/facilityGraphql.js';
const {
  graphqlUrl,
} = globalData[Cypress.env('environment')];

const createOrUpdateFacilityV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    facilityCode: tempDataObj.facilityCode,
    facilityName: tempDataObj.facilityName,
    facilityPh: tempDataObj.facilityPh,
    facilityStatus: tempDataObj.facilityStatus,
    city: tempDataObj.city,
    state: tempDataObj.state,
    street1: tempDataObj.street1,
    postalCode: tempDataObj.postalCode,
    country: tempDataObj.country,
    //trailerTypeId: tempDataObj.trailerTypeId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createOrUpdateFacilityV2Var, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createOrUpdateFacilityV2Query,
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
    throw new Error(`Error in createOrUpdateFacilityV2 call. response status: ${response.status}.
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
    addressId: tempDataObj.facilityAddressId,
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

const createOrUpdateFacilitySchedule = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    facilityId: tempDataObj.facilityId,
    trailerTypeId: tempDataObj.trailerTypeId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createUpdateFacilityScheduleVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createUpdateFacilityScheduleQuery,
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
    throw new Error(`Error in createOrUpdateFacilitySchedule call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createCarrierFacilityRel = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    relatedCarrierIdToFacility: tempDataObj.carrierId,
    facilityId: tempDataObj.facilityId,
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
    throw new Error(`Error in createCarrierFacilityRel call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createOrUpdateFacilityIdentifierV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    facilityCode: tempDataObj.facilityCode,
  };
  const graphqlVar = updateVarWithParam({ varObj: createOrUpdateFacilityIdV2Var, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createOrUpdateFacilityIdV2Query,
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
    throw new Error(`Error in createOrUpdateFacilityIdentifierV2 call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createOrUpdateFacilityDirection = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    facilityId: tempDataObj.facilityId,
  };
  const graphqlVar = updateVarWithParam({ varObj: createUpdateFacilityDirectionVar, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: createUpdateFacilityDirectionQuery,
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
    throw new Error(`Error in createOrUpdateFacilityDirection call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

export {
  createOrUpdateFacilityV2,
  addressStatusUpdate,
  createCarrierFacilityRel,
  createOrUpdateFacilityIdentifierV2,
  createOrUpdateFacilityDirection,
  createOrUpdateFacilitySchedule,
};