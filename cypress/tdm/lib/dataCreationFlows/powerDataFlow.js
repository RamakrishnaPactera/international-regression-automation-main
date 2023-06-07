import { getAccessToken } from '../networkCalls/commonCalls.js';
import { createOrUpdatePowerV2 } from '../networkCalls/powerCalls.js';
import { generateRandomAlphaNumByLength } from '../utilities/utilities.js';

const createOrUpdatePower = async ({ dataCondition: dataReq, dataObj: scenarioDataSet }) => {
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

    const powerCode = generateRandomAlphaNumByLength({ lengthOfString: 8 });
    const powerData = {
      powerCode,
    };
    tempDataObj = { ...tempDataObj, ...powerData };
    outputDataObj = { ...outputDataObj, ...powerData };
    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdatePowerV2' };
    const createPowerResult = await createOrUpdatePowerV2({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createPowerResult };
    const powerObject = createPowerResult.data.createOrUpdatePowerV2.power;
    const powerID = powerObject.id;
    outputDataObj = { ...outputDataObj, powerID };
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
  createOrUpdatePower,
};