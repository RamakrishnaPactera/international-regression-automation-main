import { getAccessToken } from '../networkCalls/commonCalls.js';
import { createOrUpdateTrailer } from '../networkCalls/trailerCalls.js';
import { generateRandomAlphaNumByLength, genrateRandomName, getMinionValues } from '../utilities/utilities.js';
import { minionDataValues } from '../../globalData/staticAssets';

const containerProgramTermList = [];
const makeTermList = [];
const modelTermList = [];
const typeTermList = [];

const createTrailer = async ({ dataCondition: dataReq, dataObj: scenarioDataSet }) => {
  let outputDataObj = {};
  let tempDataObj = {};
  try {
    outputDataObj = {
      ...{ creationTime: new Date().toLocaleString(), isDataCreationSuccessful: false },
      ...scenarioDataSet,
    };

    await getMinionValues(minionDataValues.minionDrpDwnContainerProgramTerm, 1)
      .then((resultOptions) => {
        resultOptions.forEach(element => {
          containerProgramTermList.push(element);
        });
      });
    await getMinionValues(minionDataValues.minionDrpDwnMakeTerm, 1)
      .then((resultOptions) => {
        resultOptions.forEach(element => {
          makeTermList.push(element);
        });
      });
    await getMinionValues(minionDataValues.minionDrpDwnModelTerm, 1)
      .then((resultOptions) => {
        resultOptions.forEach(element => {
          modelTermList.push(element);
        });
      });

    await getMinionValues(minionDataValues.minionDrpDwnTypeTerm, 1)
      .then((resultOptions) => {
        resultOptions.forEach(element => {
          typeTermList.push(element);
        });
      });

    tempDataObj = { ...tempDataObj, ...scenarioDataSet };
    tempDataObj = { ...tempDataObj, lastCall: 'getAccessToken' };
    //call authentication service and get token
    const accToken = await getAccessToken();
    tempDataObj = { ...tempDataObj, lastResponse: accToken };
    //getDataDictionary call
    tempDataObj = { ...tempDataObj, lastCall: 'getDataDictionary' };
    const trailerCode = generateRandomAlphaNumByLength({ lengthOfString: 8 });
    const trailerDisplayName = genrateRandomName();
    const makeTerm = makeTermList[0];
    const year = new Date().getFullYear();
    const containerProgramTerm = containerProgramTermList[0];
    const notes = 'testnotes';
    const color = 'Blue';
    const typeTerm = typeTermList[0];
    const modelTerm = modelTermList[0];
    const trailerData = {
      trailerCode,
      trailerDisplayName,
      makeTerm,
      year,
      containerProgramTerm,
      notes,
      color,
      typeTerm,
      modelTerm,
    };
    tempDataObj = { ...tempDataObj, ...trailerData };
    outputDataObj = { ...outputDataObj, ...trailerData };
    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateTrailer' };
    const createTrailerResult = await createOrUpdateTrailer({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createTrailerResult };
    const trailerObject = createTrailerResult.data.createOrUpdateTrailerV3.trailer;
    const trailerID = trailerObject.id;
    outputDataObj = { ...outputDataObj, trailerID };
    outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
  } catch (err) {
    if (err.message) {
      outputDataObj = { ...outputDataObj, lastCall: `***${tempDataObj.lastCall}***` };
      outputDataObj = { ...outputDataObj, error: `Error Message ***${err.message}***` };
      if (!(err.message).includes('Error in Response Body')) {
        outputDataObj = { ...outputDataObj, lastResponse: `***${JSON.stringify(tempDataObj.lastResponse)}***` };
      }
    }
  }
  return outputDataObj;
};

export {
  createTrailer,
};