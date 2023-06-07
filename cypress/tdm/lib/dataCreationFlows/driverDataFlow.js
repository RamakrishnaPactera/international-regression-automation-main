import {
  getAccessToken,
} from '../networkCalls/commonCalls.js';
import { createDriverTraining, createOrUpdateDriver } from '../networkCalls/driverCalls.js';
import { generateRandomAlphaNumByLength, genrateRandomName } from '../utilities/utilities.js';

const createDriver = async ({ dataCondition: dataReq, dataObj: scenarioDataSet }) => {
  let outputDataObj = {};
  let tempDataObj = {};
  try {
    outputDataObj = {
      ...{ creationTime: new Date().toLocaleString(), isDataCreationSuccessful: false },
      ...scenarioDataSet,
    };

    tempDataObj = { ...tempDataObj, ...scenarioDataSet };
    tempDataObj = { ...tempDataObj, lastCall: 'getAccessToken' };
    //call authentication service and get token
    const accToken = await getAccessToken();
    tempDataObj = { ...tempDataObj, lastResponse: accToken };

    //getDataDictionary call
    tempDataObj = { ...tempDataObj, lastCall: 'getDataDictionary' };

    const driverCode = generateRandomAlphaNumByLength({ lengthOfString: 8 });
    const firstName = `${genrateRandomName()} L`;
    const lastName = `${genrateRandomName()} F`;
    const displayName = firstName + ' ' + lastName;

    const driverData = {
      driverCode,
      firstName,
      lastName,
      displayName,
    };
    tempDataObj = { ...tempDataObj, ...driverData };
    outputDataObj = { ...outputDataObj, ...driverData };

    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateDriver' };
    const createDriverResult = await createOrUpdateDriver({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createDriverResult };

    const driverObject = createDriverResult?.data?.createDriver;

    //CreateOrUpdateDriverTraining call
    if (tempDataObj.trainingsRequired) {
      const typeTerm = tempDataObj.typeTerm;
      const driverID = driverObject.id;
      tempDataObj = { ...tempDataObj, typeTerm, driverID };
      tempDataObj = { ...tempDataObj, lastCall: 'createDriverTraining' };
      const rowCount = tempDataObj.maxRows;
      let createDriverTrainingRes;
      for (let i = 0; i <= rowCount; i++) {
        createDriverTrainingRes = await createDriverTraining({ bearerToken: accToken, dataObj: tempDataObj });
      }
      tempDataObj = { ...tempDataObj, lastResponse: createDriverTrainingRes };
    }
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
  createDriver,
};