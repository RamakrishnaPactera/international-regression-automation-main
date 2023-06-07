import fetch, { Headers } from 'cross-fetch';
import { createOrUpdateTrailerV3, createOrUpdateTrailerV3Var } from '../graphqls/trailerGraphql';
import { getErrFromRes, updateVarWithParam } from '../utilities/utilities';
import globalData from '../../globalData/envData.json';

const {
  graphqlUrl,
} = globalData[Cypress.env('environment')];
const createOrUpdateTrailer = async ({ bearerToken: accToken, dataObj: tempDataObj }) => {
  const graphqlHeader = new Headers();
  graphqlHeader.append('Authorization', 'Bearer ' + accToken);
  graphqlHeader.append('Content-Type', 'application/json');
  //parameterizing GraphQL variables
  const varMapObj = {
    trailerCode: tempDataObj.trailerCode,
    trailerDisplayName: tempDataObj.trailerDisplayName,
    makeTerm: tempDataObj.makeTerm,
    year: tempDataObj.year,
    containerProgramTerm: tempDataObj.containerProgramTerm,
    notes: tempDataObj.notes,
    color: tempDataObj.color,
    typeTerm: tempDataObj.typeTerm,
    modelTerm: tempDataObj.modelTerm,
  };
  const graphqlVar = updateVarWithParam({ varObj: createOrUpdateTrailerV3Var, mapObj: varMapObj });
  const graphql = JSON.stringify({
    query: createOrUpdateTrailerV3,
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
    throw new Error(`Error in createTrailer call. response status: ${response.status}.
    ***Error in Response Body: ${JSON.stringify(resErrObj)}***`);
  }
  return responseBody;
};

export {
  createOrUpdateTrailer,
};