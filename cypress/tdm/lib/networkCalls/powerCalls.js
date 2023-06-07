import fetch, { Headers } from 'cross-fetch';
import { createOrUpdatePowerV2Mutation, createOrUpdatePowerV2Var } from '../graphqls/powerGraphql';
import { getErrFromRes, updateVarWithParam } from '../utilities/utilities';
import globalData from '../../globalData/envData.json';

const {
  graphqlUrl,
} = globalData[Cypress.env('environment')];

const createOrUpdatePowerV2 = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  //parameterizing GraphQL variables
  const varMapObj = {
    powerCode: tempDataObj.powerCode,
  };
  const graphqlVar = updateVarWithParam({ varObj: createOrUpdatePowerV2Var, mapObj: varMapObj });
  const graphql = JSON.stringify({
    query: createOrUpdatePowerV2Mutation,
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
    throw new Error(`Error in createPower call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  }
  return responseBody;
};
export {
  createOrUpdatePowerV2,
};