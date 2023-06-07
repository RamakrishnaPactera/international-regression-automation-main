import {
  createOrUpdateCustomerV2,
  createOrUpdateCustomerSettingV2,
  createCreditHistoryV2,
  createUpdateCarrierCustRelV2,
  createUpdateCustFacilityRelV2,
  createCustomerLoadDefaults,
  crmOpportunitySaveV2,
  crmSaveContact,
} from '../networkCalls/customerCalls.js';

import {
  getAccessToken,
  getFacilities,
  getCarriers,
  getDataDictionaryFromMinion,
} from '../networkCalls/commonCalls.js';

import { generateRandomAlphaNumByLength, genrateRandomName, generateRandomNumberByLength } from '../utilities/utilities';

const createCustomer = async ({ dataCondition: dataReq, dataObj: scenarioDataSet }) => {
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

    //call createOrUpdateCustomerV2
    const customerCargoInsurance = ((tempDataObj.cargoInsurance || 'NO').toUpperCase()) === 'YES' ? 1000000 : 0;
    const customerLiabilityInsurance = ((tempDataObj.liabilityInsurance || 'NO').toUpperCase()) === 'YES' ? 1000000 : 0;
    const customerGeneralInsurance = ((tempDataObj.generalInsurance || 'NO').toUpperCase()) === 'YES' ? 1000000 : 0;
    const customerLevelType = tempDataObj.customerLevelType || 'Silver';
    const customerOpportunityType = tempDataObj.customerOpportunityType || 'Gold';
    const customerStandingStatus = tempDataObj.customerStatus;
    const cargoInsuranceStatus = tempDataObj.customerStatus;
    const city = tempDataObj.city || 'Atlanta';
    const state = tempDataObj.state || 'GA';
    const street1 = tempDataObj.street1 || '2455 Paces Ferry Rd SE';
    const postalCode = tempDataObj.postalCode || '30339-6444';
    const country = tempDataObj.country || 'USA';
    const invoiceDistributionMethodId = tempDataObj.invoiceDistributionMethodId || 'No Print';
    const identifierTypeId = tempDataObj.identifierTypeId || 'DUNS';
    const identiferCode = `${identifierTypeId}${generateRandomAlphaNumByLength({ lengthOfString: 8 })}`;

    const customerCode = generateRandomAlphaNumByLength({ lengthOfString: 8 });
    const customerName = `${genrateRandomName()} Inc ${generateRandomNumberByLength({ lengthOfNum: 8 })}`;
    const customerUrl = `http://${customerName.replace(/\s/g, '').toLowerCase()}${customerCode.toLowerCase()}.net`;
    const customerPh = `+1202${generateRandomNumberByLength({ lengthOfNum: 7 })}`;

    const customerData = {
      customerCargoInsurance,
      customerLiabilityInsurance,
      customerGeneralInsurance,
      customerLevelType,
      customerOpportunityType,
      customerStandingStatus,
      cargoInsuranceStatus,
      customerCode,
      customerName,
      customerUrl,
      customerPh,
      city,
      state,
      street1,
      postalCode,
      country,
      invoiceDistributionMethodId,
      identifierTypeId,
      identiferCode,
    };
    tempDataObj = { ...tempDataObj, ...customerData };
    outputDataObj = { ...outputDataObj, ...customerData };

    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateCustomerV2' };
    const createUpdateCustRes = await createOrUpdateCustomerV2({ bearerToken: accToken, dataObj: tempDataObj });
    const contactName = createUpdateCustRes?.data?.createOrUpdateCustomerV2?.customer?.contacts[0]?.name;
    tempDataObj = { ...tempDataObj, lastResponse: createUpdateCustRes };

    const customerObject = createUpdateCustRes?.data?.createOrUpdateCustomerV2?.customer;
    if (!customerObject) {
      throw new Error('***Newly created customer details not found in the createOrUpdateCustomerV2 response.***');
    };
    const addressArray = customerObject.addresses;
    const addressIds = (addressArray || []).map((address, key) => {
      return address.id;
    });
    const customerId = customerObject.id;
    const customerAddressId = addressIds.shift();
    const customerMainAddressId = customerObject.mainAddress.id;
    tempDataObj = { ...tempDataObj, customerId, customerAddressId, customerMainAddressId };

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
    //createOrUpdateCustomerSettingV2 call
    tempDataObj = { ...tempDataObj, lastCall: 'createOrUpdateCustomerSettingV2' };
    const createUpdateCustSettingsRes = await createOrUpdateCustomerSettingV2({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createUpdateCustSettingsRes };

    //createCustomerLoadDefaults call
    //get trailer type ids from minion data dictionary
    const trailerTypeDic = (dataDictionaryArr || []).find(item => { return item.name === 'trailerType'; });
    const trailerTypeOptions = trailerTypeDic?.options;
    const trailerTypeIds = trailerTypeOptions.reduce((pre, cur) => {
      if (cur.active) {
        return [...pre, cur.id];
      }
      return pre;
    }, []);
    tempDataObj = { ...tempDataObj, trailerTypeIds };
    tempDataObj = { ...tempDataObj, lastCall: 'createCustomerLoadDefaults' };
    const createCustomerLoadDefaultsRes = await createCustomerLoadDefaults({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createCustomerLoadDefaultsRes };

    //createCreditHistoryV2 call
    if (tempDataObj.creditStatus) {
      const customerCreditExpiryDate = tempDataObj.creditExpired.toUpperCase() === 'YES' ? '2021-09-28T04:00:00.000Z' : '2027-09-28T04:00:00.000Z';
      tempDataObj = { ...tempDataObj, customerCreditExpiryDate };
      tempDataObj = { ...tempDataObj, lastCall: 'createCreditHistoryV2' };
      const createCreditHistoryRes = await createCreditHistoryV2({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: createCreditHistoryRes };
    };

    //attach a carrier if related carrier is available in data req
    if (tempDataObj.relatedCarrier) {
      //carriersForCarrierPickerV2 call
      tempDataObj = { ...tempDataObj, lastCall: 'getCarriers' };
      const resGetCarriers = await getCarriers({ bearerToken: accToken, dataObj: tempDataObj, searchCode: tempDataObj.relatedCarrier });
      tempDataObj = { ...tempDataObj, lastResponse: resGetCarriers };
      const carrierArray = resGetCarriers?.data?.carriersNullable?.edges;
      const carriers = (carrierArray || []).map((carrier, key) => { return carrier.node; });
      const carrier = (carriers || []).shift();
      if (!carrier) {
        throw new Error(`***Details not returned for carrier code '${tempDataObj.relatedCarrier}'.***`);
      };
      tempDataObj = { ...tempDataObj, carrierId: carrier.id, carrierName: carrier.name };

      //createOrUpdateCarrierCustomerRelationshipV2 call
      tempDataObj = { ...tempDataObj, lastCall: 'createUpdateCarrierCustRelV2' };
      const createUpdateCarrierCustRelRes = await createUpdateCarrierCustRelV2({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: createUpdateCarrierCustRelRes };
    };

    //attach a facility if related facility is available in data req
    if (tempDataObj.relatedFacility) {
      //getfacilitites call
      tempDataObj = { ...tempDataObj, lastCall: 'getFacilities' };
      const resFacility = await getFacilities({
        bearerToken: accToken,
        dataObj: tempDataObj,
        facilityIdentifier: tempDataObj.relatedFacility,
      });
      tempDataObj = { ...tempDataObj, lastResponse: resFacility };

      const facilities = resFacility?.data?.allFacilities?.edges;
      const facilityObject = (facilities || []).find(facility => {
        return facility.node.code === tempDataObj.relatedFacility;
      });
      const facilityId = facilityObject?.node?.id;
      if (!facilityId) {
        throw new Error(`***The facility id not found for '${tempDataObj.relatedFacility}' in the response.***`);
      };
      tempDataObj = { ...tempDataObj, facilityId };

      //createOrUpdateCustomerFacilityRelationshipV2 call
      tempDataObj = { ...tempDataObj, lastCall: 'createUpdateCustFacilityRelV2' };
      const createUpdateCustFacilityRelRes = await createUpdateCustFacilityRelV2({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: createUpdateCustFacilityRelRes };
    };

    outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true, contactName, opportunityName, crmV2ContactName, crmV2ContactId };
  } catch (err) {
    if (err.message) {
      outputDataObj = { ...outputDataObj, lastCall: `***${tempDataObj.lastCall}***` };
      outputDataObj = { ...outputDataObj, error: `***${err.message}***` };
      if (!(err.message).includes('Error in Response Body')) {
        outputDataObj = { ...outputDataObj, lastResponse: `***${JSON.stringify(tempDataObj.lastResponse)}***` };
      }
    };
  }
  return outputDataObj;
};

export {
  createCustomer,
};