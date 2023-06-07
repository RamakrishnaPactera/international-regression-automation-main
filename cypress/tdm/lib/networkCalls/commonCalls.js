import fetch, { Headers } from 'cross-fetch';

import globalData from '../../globalData/envData.json';

import {
  getFacilitiesQuery,
  getFacilitiesVariable,
  getCarriersQuery,
  getCarriersVariable,
  getCustomersQuery,
  getCustomersVariable,
  dataDictionaryQuery,
} from '../graphqls/commonGraphql.js';
import { getErrFromRes, updateVarWithParam } from '../../lib/utilities/utilities.js';

const { apiClientId, apiAuthUrl, graphqlUrl, minionGraphqlUrl } = globalData[Cypress.env('environment')];

const getAccessToken = async () => {
  //call authentication service
  const authHeaders = new Headers();
  authHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'password');
  urlencoded.append('client_id', apiClientId);
  urlencoded.append('username', Cypress.env('username'));
  urlencoded.append('password', Cypress.env(`keycloakSuperUserPassword${Cypress.env('environment')}`));
  const requestOptions = {
    method: 'POST',
    headers: authHeaders,
    body: urlencoded,
    redirect: 'follow',
  };
  const response = await fetch(apiAuthUrl, requestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in Authentication call. response status: ${response.status}. Error in body: ${JSON.stringify(resErrObj)}`);
  };
  return responseBody.access_token;
};

const getFacilities = async ({ bearerToken: accToken, dataObj: tempDataObj, facilityIdentifier: facilityCode }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'q=allFacilitiesV2ForFacilityPicker';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    facilityCode,
  };
  const graphqlVar = updateVarWithParam({ varObj: getFacilitiesVariable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: getFacilitiesQuery,
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
    throw new Error(`Error in 'getFacilities' call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const getCarriers = async ({ bearerToken: accToken, dataObj: tempDataObj, searchCode: codeToSearch }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  const urlQueryParam = 'q=carriersForCarrierPickerV2';
  const graphqlUrlV2 = `${graphqlUrl}?${urlQueryParam}`;

  //parameterizing GraphQL variables
  const varMapObj = {
    carrierCode: codeToSearch,
  };
  const graphqlVar = updateVarWithParam({ varObj: getCarriersVariable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: getCarriersQuery,
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
    throw new Error(`Error in getCarriers call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const getCustomerDetails = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  //parameterizing GraphQL variables
  const varMapObj = {
    customerCode: tempDataObj.customerCode,
  };
  const graphqlVar = updateVarWithParam({ varObj: getCustomersVariable, mapObj: varMapObj });

  const graphql = JSON.stringify({
    query: getCustomersQuery,
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
    throw new Error(`Error in getCustomerDetails call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const getDataDictionaryFromMinion = async ({ bearerToken: accToken }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');

  const graphql = JSON.stringify({
    query: dataDictionaryQuery,
    variables: {},
  });
  const graphqlRequestOptions = {
    method: 'POST',
    headers: graphqlHeader,
    body: graphql,
    redirect: 'follow',
  };
  const response = await fetch(minionGraphqlUrl, graphqlRequestOptions);
  const responseBody = await response.json();
  const resErrObj = getErrFromRes(responseBody);
  if (!response.ok || ('errors' in resErrObj)) {
    throw new Error(`Error in getDataDictionaryFromMinion call. response status: ${response.status}. 
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

export {
  getAccessToken,
  getFacilities,
  getCarriers,
  getCustomerDetails,
  getDataDictionaryFromMinion,
};