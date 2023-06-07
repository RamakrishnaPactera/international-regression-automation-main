import {
  createOrUpdateCarrier,
  createOrUpdateCarrierSetting,
  copyGlobalVendorRequiredDocumentForCarrier,
  updateCarrierStandingV2,
  createCarrierCertificationV2,
  createOrUpdateCarrierCustomerRel,
  createCarrierFacilityRelationship,
  crmOpportunitySaveV2,
  crmSaveContact,
} from '../networkCalls/carrierCalls.js';

import {
  getAccessToken,
  getDataDictionaryFromMinion,
  getFacilities,
  getCustomerDetails,
} from '../networkCalls/commonCalls.js';

import { generateRandomAlphaNumByLength, genrateRandomName, generateRandomNumberByLength } from '../utilities/utilities';
import { staticData } from '../../globalData/staticAssets.js';
const { carrierInsurance, defaultTrailerType } = staticData[Cypress.env('environment')];

const createCarrier = async ({ dataCondition: dataReq, dataObj: scenarioDataSet }) => {
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
    const getDataDictionaryRes = await getDataDictionaryFromMinion({ bearerToken: accToken });
    const dataDictionaryArr = getDataDictionaryRes?.data?.tenantConfiguration?.types;

    //call createOrUpdateCarrier
    const insuranceArr = [];
    let insuranceObj = carrierInsurance;
    const effectiveDate = new Date(new Date().getTime() - 3 * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    insuranceObj = { ...insuranceObj, effectiveDate };
    if (tempDataObj.insurance.toUpperCase() === 'YES' && tempDataObj.insuranceExpired.toUpperCase() === 'NO') { //Active insurance
      const expirationDate = new Date(new Date().getTime() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      insuranceObj = { ...insuranceObj, expirationDate };
      insuranceArr.push(insuranceObj);
    } else if (tempDataObj.insurance.toUpperCase() === 'YES' && tempDataObj.insuranceExpired.toUpperCase() === 'YES') { //expired insurance
      const expirationDate = new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      insuranceObj = { ...insuranceObj, expirationDate };
      insuranceArr.push(insuranceObj);
    };
    tempDataObj = { ...tempDataObj, insuranceArr };

    const carrierCode = generateRandomAlphaNumByLength({ lengthOfString: 8 });
    const carrierName = `${genrateRandomName()} Trucking ${generateRandomNumberByLength({ lengthOfNum: 8 })}`;
    const carrierUrl = `http://${carrierName.replace(/\s/g, '').toLowerCase()}${carrierCode.toLowerCase()}.net`;
    const carrierDBAName = `${genrateRandomName()} DBA`;
    const scacNumber = generateRandomAlphaNumByLength({ lengthOfString: 6 });
    const carrierEmail = `${carrierName.replace(/\s/g, '').toLowerCase()}.${carrierCode.toLowerCase()}@aol.net`;
    const carrierPh = `+1202${generateRandomNumberByLength({ lengthOfNum: 7 })}`;

    const carrierData = {
      carrierCode,
      carrierName,
      carrierUrl,
      carrierDBAName,
      scacNumber,
      carrierEmail,
      carrierPh,
    };
    tempDataObj = { ...tempDataObj, ...carrierData };
    outputDataObj = { ...outputDataObj, ...carrierData };

    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateCarrier' };
    const createUpdateCarrierRes = await createOrUpdateCarrier({ bearerToken: accToken, dataObj: tempDataObj });
    const contactName = createUpdateCarrierRes?.data?.createOrUpdateCarrierV2?.carrier?.contacts[0]?.name;
    tempDataObj = { ...tempDataObj, lastResponse: createUpdateCarrierRes };

    const carrierObject = createUpdateCarrierRes?.data?.createOrUpdateCarrierV2?.carrier;
    if (!carrierObject) {
      throw new Error('***Newly created carrier details not found in the createOrUpdateCarrier response.***');
    };
    const addressArray = carrierObject.addresses;
    const addressIds = (addressArray || []).map((address, key) => {
      return address.id;
    });
    const carrierId = carrierObject.id;
    const carrierAddressId = addressIds.shift();
    const carrierMainAddressId = carrierObject.mainAddress.id;
    tempDataObj = { ...tempDataObj, carrierId, carrierAddressId, carrierMainAddressId };
    //Create Opportunities call - CrmOpportunitySaveV2
    if (tempDataObj.opportunityReq === 'YES') {
      const opprStage = tempDataObj.opprStageTerm;
      const opprStatus = tempDataObj.opprStatusTerm;
      const opprData = {
        opprStage,
        opprStatus,
      };
      tempDataObj = { ...tempDataObj, ...opprData };
      tempDataObj = { ...tempDataObj, lastCall: 'crmOpportunitySaveV2' };
      const createOpportunityRes = await crmOpportunitySaveV2({ bearerToken: accToken, dataObj: tempDataObj });
      //eslint-disable-next-line no-var
      var opportunityName = createOpportunityRes?.data?.crmOpportunitySaveV2?.name;
    }
    //Create contact for crmV2
    if (tempDataObj.contactReq === 'YES') {
      const contactName = `AutoContact${generateRandomNumberByLength({ lengthOfNum: 8 })}`;
      const contactDepartment = 'Administration';
      const contactData = {
        contactName,
        contactDepartment,
      };
      tempDataObj = { ...tempDataObj, ...contactData };
      tempDataObj = { ...tempDataObj, lastCall: 'CrmSaveContact' };
      const crmSaveContactRes = await crmSaveContact({ bearerToken: accToken, dataObj: tempDataObj });
      //eslint-disable-next-line no-var
      var crmV2ContactName = crmSaveContactRes?.data?.crmSaveContact?.name;
      //eslint-disable-next-line no-var
      var crmV2ContactId = crmSaveContactRes?.data?.crmSaveContact?.contactId;
    }

    //createOrUpdateCarrierSetting call
    //const defaultTrailerType = 'Van';
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
    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateCarrierSetting' };
    const createUpdateCarrierSettingsRes = await createOrUpdateCarrierSetting({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createUpdateCarrierSettingsRes };

    //copyGlobalVendorRequiredDocumentForCarrier call
    tempDataObj = { ...tempDataObj, lastCall: 'copyGlobalVendorRequiredDocumentForCarrier' };
    const copyGlobalVendorReqDocCarrierRes = await copyGlobalVendorRequiredDocumentForCarrier({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: copyGlobalVendorReqDocCarrierRes };

    //addressStatusUpdate call
    //tempDataObj = { ...tempDataObj, lastCall: 'addressStatusUpdate' };
    //const addressStatusUpdateRes = await addressStatusUpdate({ bearerToken: accToken, dataObj: tempDataObj });
    //tempDataObj = { ...tempDataObj, lastResponse: addressStatusUpdateRes };

    //updateCarrierStandingV2 call
    let carrierStandingReasonCodeId = '';
    if (tempDataObj.carrierStandingStatus.toUpperCase() === 'DENIED') {
      if (!tempDataObj.carrierStandingReasonCode) {
        throw new Error('***\'carrierStandingReasonCode\' is mandatory for carrierStandingStatus \'Denied\'.***');
      };
      const carrierStandingReasonCodeDic = (dataDictionaryArr || []).find(item => { return item.name === 'carrierStandingReasonCode'; });
      const carrierStandingReasonCodeOptions = carrierStandingReasonCodeDic?.options;
      const carrierStandingReasonCodeObj = (carrierStandingReasonCodeOptions || []).find(item => {
        return item.name === tempDataObj.carrierStandingReasonCode;
      });
      carrierStandingReasonCodeId = carrierStandingReasonCodeObj?.id;
      if (!carrierStandingReasonCodeId) {
        throw new Error(`***carrierStandingReasonCodeId not found in minion response for carrierStandingReasonCode '${tempDataObj.carrierStandingReasonCode}'.***`);
      };
    };

    tempDataObj = { ...tempDataObj, carrierStandingReasonCodeId };
    tempDataObj = { ...tempDataObj, lastCall: 'updateCarrierStandingV2' };
    const updateCarrierStandingRes = await updateCarrierStandingV2({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: updateCarrierStandingRes };

    //createCarrierCertificationV2 call
    if (tempDataObj.certificationType) {
      if (tempDataObj.certificationType.toUpperCase() === 'NO') {
        tempDataObj = { ...tempDataObj, carrierCertTypeId: null };
      } else {
        const carrierCertTypeDic = (dataDictionaryArr || []).find(item => { return item.name === 'carrierCertificationType'; });
        const carrierCertTypeOptions = carrierCertTypeDic?.options;
        const carrierCertTypeObj = (carrierCertTypeOptions || []).find(item => { return item.name === tempDataObj.certificationType; });
        const carrierCertTypeId = carrierCertTypeObj?.id;
        if (!carrierCertTypeId) {
          throw new Error(`***Carrier certification type Id not found in minion response for certification type '${tempDataObj.certificationType}'.***`);
        };
        tempDataObj = { ...tempDataObj, carrierCertTypeId };
      };
      const carrierCertExpDate = tempDataObj.certificationExpired.toUpperCase() === 'YES'
        ? new Date(new Date().getTime() - 2 * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
        : new Date(new Date().getTime() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      tempDataObj = { ...tempDataObj, carrierCertExpDate };

      tempDataObj = { ...tempDataObj, lastCall: 'createCarrierCertificationV2' };
      const createCarrierCertRes = await createCarrierCertificationV2({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: createCarrierCertRes };
    };

    //attach customer if related customer available
    if (tempDataObj.relatedCustomer) {
      //allCustomersForCustomerPickerV2 call
      tempDataObj = { ...tempDataObj, customerCode: tempDataObj.relatedCustomer };
      tempDataObj = { ...tempDataObj, lastCall: 'getCustomerDetails' };
      const customerRes = await getCustomerDetails({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: customerRes };
      const custArray = customerRes?.data?.allCustomersV2?.edges;
      const customers = (custArray || []).map((customer, key) => {
        return customer.node;
      });
      const customer = (customers || []).shift();
      if (!customer) {
        throw new Error(`***The customer details not found for '${tempDataObj.relatedCustomer}'.***`);
      };
      tempDataObj = {
        ...tempDataObj,
        relatedCustomerId: customer.id,
        relatedCustomerName: customer.name,
      };

      //createOrUpdateCarrierCustomerRelationship call
      tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateCarrierCustomerRel' };
      const createUpdateCarrierCustRelRes = await createOrUpdateCarrierCustomerRel({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: createUpdateCarrierCustRelRes };
    };

    //attach facility if related facility available
    if (tempDataObj.relatedFacility) {
      //allFacilities call
      tempDataObj = { ...tempDataObj, lastCall: 'getFacilities' };
      const facilityRes = await getFacilities({
        bearerToken: accToken,
        dataObj: tempDataObj,
        facilityIdentifier: tempDataObj.relatedFacility,
      });
      tempDataObj = { ...tempDataObj, lastResponse: facilityRes };
      const facilities = facilityRes?.data?.allFacilities?.edges;
      const facilityObject = (facilities || []).find(facility => {
        return facility.node.code === tempDataObj.relatedFacility;
      });
      const facilityId = facilityObject?.node?.id;
      if (!facilityId) {
        throw new Error(`***The related facility id not found for '${tempDataObj.relatedFacility}' in the response.***`);
      };
      tempDataObj = { ...tempDataObj, facilityId };

      //createCarrierFacilityRelationship call
      tempDataObj = { ...tempDataObj, lastCall: 'createCarrierFacilityRelationship' };
      const createCarrierFacilityRelRes = await createCarrierFacilityRelationship({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: createCarrierFacilityRelRes };
    };

    outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true, contactName, opportunityName, crmV2ContactName, crmV2ContactId };
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
  createCarrier,
};