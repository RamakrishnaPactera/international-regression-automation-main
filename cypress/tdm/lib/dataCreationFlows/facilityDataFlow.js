import {
  createOrUpdateFacilityV2,
  createCarrierFacilityRel,
  createOrUpdateFacilityIdentifierV2,
  createOrUpdateFacilityDirection,
  createOrUpdateFacilitySchedule,
} from '../networkCalls/facilityCalls.js';

import {
  getAccessToken,
  getDataDictionaryFromMinion,
  getCarriers,
} from '../networkCalls/commonCalls.js';

import { generateRandomAlphaNumByLength, genrateRandomName, generateRandomNumberByLength } from '../utilities/utilities';

import { staticData } from '../../globalData/staticAssets.js';
const { defaultTrailerType } = staticData[Cypress.env('environment')];

const createFacility = async ({ dataCondition: dataReq, dataObj: scenarioDataSet }) => {
  let outputDataObj = { };
  let tempDataObj = { };
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
    const getDataDictionaryRes = await getDataDictionaryFromMinion({ bearerToken: accToken });
    const dataDictionaryArr = getDataDictionaryRes?.data?.tenantConfiguration?.types;
    const city = tempDataObj.city || 'Atlanta';
    const state = tempDataObj.state || 'GA';
    const street1 = tempDataObj.street1 || '2455 Paces Ferry Rd SE';
    const postalCode = tempDataObj.postalCode || '30339-6444';
    const country = tempDataObj.country || 'USA';
    //call createOrUpdateFacilityV2
    const facilityCode = generateRandomAlphaNumByLength({ lengthOfString: 8 });
    const facilityName = `${genrateRandomName()} Warehouse`;
    const facilityPh = `+1202${generateRandomNumberByLength({ lengthOfNum: 7 })}`;
    const facilityData = {
      facilityCode,
      facilityName,
      facilityPh,
      city,
      state,
      street1,
      postalCode,
      country,
    };
    tempDataObj = { ...tempDataObj, ...facilityData };
    outputDataObj = { ...outputDataObj, ...facilityData };

    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateFacilityV2' };
    const createUpdateFacilityRes = await createOrUpdateFacilityV2({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createUpdateFacilityRes };

    const facilityObject = createUpdateFacilityRes?.data?.createOrUpdateFacilityV2?.facility;
    if (!facilityObject) {
      throw new Error('***Newly created facility details not found in the createOrUpdateFacilityV2 response.***');
    };
    const addressArray = facilityObject?.addresses;
    const addressIds = (addressArray || []).map((address, key) => {
      return address.id;
    });
    const facilityId = facilityObject.id;
    const facilityAddressId = addressIds.shift();
    const facilityMainAddressId = facilityObject.mainAddress.id;
    tempDataObj = { ...tempDataObj, facilityId, facilityAddressId, facilityMainAddressId };

    //retrieve trailer type id for facility default equipment
    const trailerTypeDic = (dataDictionaryArr || []).find(item => { return item.name === 'trailerType'; });
    const trailerTypeOptions = trailerTypeDic?.options;
    const trailerTypeObj = (trailerTypeOptions || []).find(item => {
      return item.name === defaultTrailerType;
    });
    const trailerTypeId = trailerTypeObj?.id;
    if (!trailerTypeId) {
      throw new Error(`***Trailer Type Id not found in minion response for default Trailer Type '${defaultTrailerType}'.***`);
    };
    tempDataObj = { ...tempDataObj, trailerTypeId };

    //createOrUpdateFacilitySchedule call
    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateFacilitySchedule' };
    const createUpdateFacilityScheduleRes = await createOrUpdateFacilitySchedule({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createUpdateFacilityScheduleRes };

    if (tempDataObj.relatedCarrier) {
      //carriersForCarrierPicker call for details of carrier to be attached
      const carrierCode = tempDataObj.relatedCarrier;
      tempDataObj = { ...tempDataObj, lastCall: 'getCarriers' };
      const resGetCarriers = await getCarriers({ bearerToken: accToken, dataObj: tempDataObj, searchCode: carrierCode });
      tempDataObj = { ...tempDataObj, lastResponse: resGetCarriers };
      const carrierArray = resGetCarriers?.data?.carriersNullable?.edges;
      const carriers = (carrierArray || []).map((carrier, key) => { return carrier.node; });
      const carrier = (carriers || []).shift();
      if (!carrier) {
        throw new Error(`***Details not found for related carrier '${carrierCode}'.***`);
      };
      tempDataObj = { ...tempDataObj, carrierId: carrier.id };

      //createCarrierFacilityRelationship call
      tempDataObj = { ...tempDataObj, lastCall: 'createCarrierFacilityRel' };
      const createCarrierFacilityRelRes = await createCarrierFacilityRel({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: createCarrierFacilityRelRes };
    };

    //createOrUpdateFacilityIdentifierV2 call
    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateFacilityIdentifierV2' };
    const createUpdateFacilityIdRes = await createOrUpdateFacilityIdentifierV2({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createUpdateFacilityIdRes };

    //createOrUpdateFacilityDirection call
    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateFacilityDirection' };
    const createUpdateFacilityDirectionRes = await createOrUpdateFacilityDirection({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createUpdateFacilityDirectionRes };

    outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
  } catch (err) {
    if (err.message) {
      outputDataObj = { ...outputDataObj, lastCall: `***${tempDataObj.lastCall}***` };
      outputDataObj = { ...outputDataObj, error: `Error Message ***${err.message}***` };
      if (!(err.message).includes('Error in Response Body')) {
        outputDataObj = { ...outputDataObj, lastResponse: `***${JSON.stringify(tempDataObj.lastResponse)}***` };
      }
    };
  }
  return outputDataObj;
};

export {
  createFacility,
};