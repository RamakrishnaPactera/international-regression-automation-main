import fetch, { Headers } from 'cross-fetch';
import { createDriverMutation, createDriverVar, CreateOrUpdateDriverTraining, CreateOrUpdateDriverTrainingVar } from '../graphqls/driverGraphql';
import { getErrFromRes, updateVarWithParam } from '../utilities/utilities';
import globalData from '../../globalData/envData.json';

const {
  graphqlUrl,
} = globalData[Cypress.env('environment')];

const createOrUpdateDriver = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  //parameterizing GraphQL variables
  const varMapObj = {
    driverCode: tempDataObj.driverCode,
    firstName: tempDataObj.firstName,
    lastName: tempDataObj.lastName,
    displayName: tempDataObj.displayName,
  };
  const graphqlVar = updateVarWithParam({ varObj: createDriverVar, mapObj: varMapObj });
  const graphql = JSON.stringify({
    query: createDriverMutation,
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
    throw new Error(`Error in createDriver call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

const createDriverTraining = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  //parameterizing GraphQL variables
  const varMapObj = {
    typeTerm: tempDataObj.typeTerm,
    driverID: tempDataObj.driverID,
  };
  const graphqlVar = updateVarWithParam({ varObj: CreateOrUpdateDriverTrainingVar, mapObj: varMapObj });
  const graphql = JSON.stringify({
    query: CreateOrUpdateDriverTraining,
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
    throw new Error(`Error in createDriver call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  };
  return responseBody;
};

export {
  createOrUpdateDriver,
  createDriverTraining,
};