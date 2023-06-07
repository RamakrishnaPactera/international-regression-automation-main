import {
  createLoadV2,
  createUpdateStopV2,
  acquireLock,
  assignVendorToRouteV2Carrier,
  assignVendorToRouteV2Vendor,
  updateRouteVendorV2,
  releaseLock,
  upsertDriverAssignment,
  upsertStopEventsV2,
  updateRouteMaxCost,
  createCostDetailsV2,
  createRateDetails,
  createVendorInvoice,
  getAllGlobalTenantChargeTypeConfig,
  createOffers,
  createLoadInvoiceBatch,
  processLoadInvoiceBatch,
  updateOrderInvRequirement,
  customerInvQueueV2,
} from '../networkCalls/loadCalls.js';

import {
  getAccessToken,
  getFacilities,
  getCarriers,
  getCustomerDetails,
  getDataDictionaryFromMinion,
} from '../networkCalls/commonCalls.js';

import { pollTimeout, validateRLCStatusOpen } from '../utilities/utilities';

import { staticData } from '../../globalData/staticAssets.js';
const {
  defaultTrailerType,
  defaultLoadActivationStatus,
  defaultTransportModeId,
  defaultSizeId,
  defaultDivision,
  defaultDriverAssignment,
  defaultChargeType,
  defaultChargePerItem,
  defaultCostUnits,
  defaultInvoiceStatus,
  defaultInvDistributionMethod,
  defaultPaymentTerms,
} = staticData[Cypress.env('environment')];

const createLoad = async ({ dataCondition: dataReq, dataObj: scenarioDataSet }) => {
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

    //getDataDictionary call to fetch data dictionary from Minion
    tempDataObj = { ...tempDataObj, lastCall: 'getDataDictionary' };
    const getDataDictionaryRes = await getDataDictionaryFromMinion({ bearerToken: accToken });
    const dataDictionaryArr = getDataDictionaryRes?.data?.tenantConfiguration?.types;

    //call customer service
    tempDataObj = { ...tempDataObj, lastCall: 'getCustomerDetails' };
    const responseCustomer = await getCustomerDetails({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: responseCustomer };
    const custArray = responseCustomer?.data?.allCustomersV2?.edges;
    const customers = (custArray || []).map((customer, key) => {
      return customer.node;
    });
    const customer = (customers || []).shift();
    if (!customer) {
      throw new Error(`***The customer details not found for '${tempDataObj.customerCode}'.***`);
    };
    tempDataObj = { ...tempDataObj, customerId: customer.id, customerName: customer.name };
    outputDataObj = { ...outputDataObj, customerName: customer.name };
    //if activationStatus is passed through data template or else assign a default value
    const activationStatus = tempDataObj.activationStatus || defaultLoadActivationStatus;
    tempDataObj = { ...tempDataObj, activationStatus };

    //retrieve trailer type id for load default equipment
    const trailerTypeDic = (dataDictionaryArr || []).find(item => { return item.name === 'trailerType'; });
    const trailerTypeOptions = trailerTypeDic?.options;
    const trailerTypeObj = (trailerTypeOptions || []).find(item => {
      return item.name === defaultTrailerType;
    });
    const trailerTypeId = trailerTypeObj?.id;
    if (!trailerTypeId) {
      throw new Error(`***Trailer Type Id not found in minion response for default Trailer Type '${defaultTrailerType}'.***`);
    };

    const truckMode = tempDataObj.truckMode || defaultTransportModeId;
    const sizeId = tempDataObj.sizeId || defaultSizeId;
    const division = tempDataObj.division || defaultDivision;

    tempDataObj = { ...tempDataObj, trailerTypeId, truckMode, sizeId, division };

    //call create load V2
    tempDataObj = { ...tempDataObj, lastCall: 'createLoadV2' };
    const responseLoad = await createLoadV2({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: responseLoad };
    const loadObject = responseLoad?.data?.createLoadV2?.load;
    if (!loadObject) {
      throw new Error('***The load object not found in the createLoadV2 response***');
    };
    const loadNumber = loadObject?.code;
    const loadId = loadObject?.id;
    const ordersArray = loadObject?.orders;
    const routesArray = loadObject?.routes;
    const refsArray = (ordersArray || [])[0]?.refs;
    const orderIds = (ordersArray || []).map((order, key) => {
      return { orderId: order.id, orderCode: order.code };
    });
    const routeIds = (routesArray || []).map((route, key) => {
      return { routeId: route.id, routeCode: route.code };
    });
    const referenceIds = (refsArray || []).map((ref, key) => {
      return ref.value;
    });
    const orderNbr = (orderIds || []).shift();
    const routeNbr = (routeIds || []).shift();
    const currentLoad = {
      orderReference: (referenceIds || []).shift(),
      loadNumber,
    };
    tempDataObj = { ...tempDataObj, ...currentLoad, ...routeNbr, ...orderNbr };
    tempDataObj = { ...tempDataObj, loadId };
    outputDataObj = {
      ...outputDataObj,
      ...currentLoad,
      orderCode: orderNbr?.orderCode,
      orderId: orderNbr?.orderId,
      routeCode: routeNbr?.routeCode,
    };

    //getting load creation time
    const loadCreatedAt = loadObject?.createdAt;
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOLoadCreateTime = (new Date(new Date(loadCreatedAt) - tzOffset)).toISOString();
    const month = localISOLoadCreateTime.slice(5, 7);
    const date = localISOLoadCreateTime.slice(8, 10);
    const time = localISOLoadCreateTime.slice(11, 16);
    const loadCreatedDtTime = (`${month}/${date} ${time}`);
    outputDataObj = { ...outputDataObj, loadCreatedDtTime };

    //getfacilitites for pickup
    tempDataObj = { ...tempDataObj, lastCall: 'getFacilities - pickup' };
    const resFacilityPickUp = await getFacilities({
      bearerToken: accToken,
      dataObj: tempDataObj,
      facilityIdentifier: tempDataObj.pickUpFacilityCode,
    });
    tempDataObj = { ...tempDataObj, lastResponse: resFacilityPickUp };

    const puFacilities = resFacilityPickUp?.data?.allFacilitiesV2?.edges;
    const puFacilityObject = (puFacilities || []).find(facility => {
      return facility.node.code === tempDataObj.pickUpFacilityCode;
    });
    const pickUpFacilityId = puFacilityObject?.node?.id;
    if (!pickUpFacilityId) {
      throw new Error(`***The pick up facility id not found for '${tempDataObj.pickUpFacilityCode}' in the response.***`);
    };
    tempDataObj = { ...tempDataObj, pickUpFacilityId };

    //Return Pick Up facility Name
    const puFacility = (puFacilities || []).map((facility, key) => { return facility.node; });
    const puFacilityName = (puFacility || []).shift();
    tempDataObj = { ...tempDataObj, pickUpFacilityName: puFacilityName.name };
    outputDataObj = { ...outputDataObj, pickUpFacilityName: puFacilityName.name };

    //Return Pick Up facility Address
    let pickupCity;
    let pickupState;
    const puFacilityAddress = (puFacilities || []).find(facility => {
      const puAddrObj = (facility.node.addresses || []).shift();
      pickupCity = puAddrObj.city;
      pickupState = puAddrObj.state;
      outputDataObj = { ...outputDataObj, pickupCity, pickupState };
      return (pickupState, pickupState);
    });
    tempDataObj = { ...tempDataObj, puFacilityAddress };
    //Update stop for pickup
    const cstDateTimeNow = new Date(Date.now() - (300 * 60000)); //converting current UTC time to CST time by adding 300 mins
    const centralOffsetTime = cstDateTimeNow.toISOString();
    const pickUpDate = centralOffsetTime.slice(0, 10);

    //using hardcoded pickup and delivery time
    //delivery on the same date required so that actual driver arrival and deprature can be updated within 75 mins in future
    tempDataObj = {
      ...tempDataObj,
      centralOffsetTime,
      pickUpDateTime: `${pickUpDate}${'T05:05:00.000Z'}`,
      deliveryDateTime: `${pickUpDate}${'T05:45:00.000Z'}`,
      utcExpEmptyDateTime: `${pickUpDate}${'T07:05:00.000Z'}`, //setting expected empty date time 3 hrs earlier than pickup time in UTC
    };

    tempDataObj = { ...tempDataObj, lastCall: 'createUpdateStopV2 - Pickup' };
    const resCreateUpdateStopPU = await createUpdateStopV2({
      bearerToken: accToken,
      dataObj: tempDataObj,
      facilityId: tempDataObj.pickUpFacilityId,
      stopType: 'PU',
      stopDateTime: tempDataObj.pickUpDateTime,
      loadFromId: 'Tail Only',
      unloadFromId: null,
    });
    tempDataObj = { ...tempDataObj, lastResponse: resCreateUpdateStopPU };
    const pickUpStopId = resCreateUpdateStopPU?.data?.createOrUpdateStopV2?.routeStop?.id;
    if (!pickUpStopId) {
      throw new Error(`***Route stop id not found for pickup facility code '${tempDataObj.pickUpFacilityCode}'.***`);
    };
    tempDataObj = { ...tempDataObj, pickUpStopId };

    //getfacilitites for delivery
    tempDataObj = { ...tempDataObj, lastCall: 'getFacilities - delivery' };
    const resFacilityDelivery = await getFacilities({
      bearerToken: accToken,
      dataObj: tempDataObj,
      facilityIdentifier: tempDataObj.deliveryFacilityCode,
    });
    tempDataObj = { ...tempDataObj, lastResponse: resFacilityDelivery };

    const delFacilities = resFacilityDelivery?.data?.allFacilitiesV2?.edges;
    const delFacilityObject = (delFacilities || []).find(facility => {
      return facility.node.code === tempDataObj.deliveryFacilityCode;
    });
    const deliveryFacilityId = delFacilityObject?.node?.id;
    if (!deliveryFacilityId) {
      throw new Error(`***The delivery facility id not found for '${tempDataObj.deliveryFacilityCode}' in the response.***`);
    };
    tempDataObj = { ...tempDataObj, deliveryFacilityId };
    //Return delivery facility Name
    const delFacility = (delFacilities || []).map((facility, key) => { return facility.node; });
    const delFacilityName = (delFacility || []).shift();
    tempDataObj = { ...tempDataObj, delFacilityName: delFacilityName.name };
    outputDataObj = { ...outputDataObj, delFacilityName: delFacilityName.name };
    //Update stop for delivery
    tempDataObj = { ...tempDataObj, lastCall: 'createUpdateStopV2 - Delivery' };
    const resCreateUpdateStopDEL = await createUpdateStopV2({
      bearerToken: accToken,
      dataObj: tempDataObj,
      facilityId: tempDataObj.deliveryFacilityId,
      stopType: 'Del',
      stopDateTime: tempDataObj.deliveryDateTime,
      loadFromId: null,
      unloadFromId: 'Tail Only',
    });
    tempDataObj = { ...tempDataObj, lastResponse: resCreateUpdateStopDEL };
    const deliveryStopId = resCreateUpdateStopDEL?.data?.createOrUpdateStopV2?.routeStop?.id;
    if (!deliveryStopId) {
      throw new Error(`***Route stop id not found for delivery facility code '${tempDataObj.deliveryFacilityCode}'.***`);
    };
    tempDataObj = { ...tempDataObj, deliveryStopId };
    let delCity;
    let delState;
    const delAddress = (delFacilities || []).find(facility => {
      const addressObj = (facility.node.addresses || []).shift();
      delCity = addressObj.city;
      delState = addressObj.state;
      outputDataObj = { ...outputDataObj, delCity, delState };
      return (delCity, delState);
    });
    tempDataObj = { ...tempDataObj, delAddress };

    //exit if load with attachStopsOnly
    if (dataReq.toLowerCase() === 'attachstopsonly') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };

    //call carriersForCarrierPicker and assignVendorToRouteV2 to attach vendor if scenarioDataSet.vendorCode is not null or blank
    if (tempDataObj.vendorCode) {
      //carriersForCarrierPicker call for vendor
      const vendorCode = tempDataObj.vendorCode;
      tempDataObj = { ...tempDataObj, lastCall: 'getCarriers - vendor' };
      const resGetVendors = await getCarriers({ bearerToken: accToken, dataObj: tempDataObj, searchCode: vendorCode });
      tempDataObj = { ...tempDataObj, lastResponse: resGetVendors };
      const vendorArray = resGetVendors?.data?.carriersNullableV2?.edges;
      const vendors = (vendorArray || []).map((vendor, key) => { return vendor.node; });
      const vendor = (vendors || []).shift();
      if (!vendor) {
        throw new Error(`***Details not returned for vendor code '${vendorCode}'.***`);
      };

      tempDataObj = { ...tempDataObj, vendorId: vendor.id, vendorName: vendor.name };
      outputDataObj = { ...outputDataObj, vendorName: vendor.name };
    }

    if (dataReq.toLowerCase() === 'createofferonly') {
    //create or update stop for Offers
      tempDataObj = { ...tempDataObj, lastCall: 'createOffers' };
      const resCreatOffer = await createOffers({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: resCreatOffer };

      //exit if load with creatOfferOnly
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };

    //acquireLock call
    tempDataObj = { ...tempDataObj, lastCall: 'acquireLock' };
    const resAcquireLock = await acquireLock({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: resAcquireLock };

    //carriersForCarrierPicker call for details of carrier to be attached
    const carrierCode = tempDataObj.carrierCode;
    tempDataObj = { ...tempDataObj, lastCall: 'getCarriers - carriers' };
    const resGetCarriers = await getCarriers({ bearerToken: accToken, dataObj: tempDataObj, searchCode: carrierCode });
    tempDataObj = { ...tempDataObj, lastResponse: resGetCarriers };
    const carrierArray = resGetCarriers?.data?.carriersNullableV2?.edges;
    const carriers = (carrierArray || []).map((carrier, key) => { return carrier.node; });
    const carrier = (carriers || []).shift();
    if (!carrier) {
      throw new Error(`***Details not returned for carrier code '${carrierCode}'.***`);
    };
    tempDataObj = { ...tempDataObj, carrierId: carrier.id, carrierName: carrier.name };
    outputDataObj = { ...outputDataObj, carrierName: carrier.name };

    //assignVendorToRouteV2 call to assign carrier
    tempDataObj = { ...tempDataObj, lastCall: 'assignVendorToRouteV2Carrier' };
    const resAssignCarrier = await pollTimeout({
      fn: assignVendorToRouteV2Carrier,
      fnParams: { bearerToken: accToken, dataObj: tempDataObj },
      validate: validateRLCStatusOpen,
      interval: 3000,
      timeout: 120000,
    }); //The timeout here cannot be greater than the timeout in cy.then in utilities > tdmUtils > getTestData

    tempDataObj = { ...tempDataObj, lastResponse: resAssignCarrier };
    const routeCarrierId = resAssignCarrier?.data?.assignVendorToRouteV2?.routeVendor?.id;
    if (!routeCarrierId) {
      throw new Error(`***Route carrier Id not returned for carrier code '${carrierCode}'.***`);
    };
    tempDataObj = { ...tempDataObj, routeCarrierId };

    //updateRouteVendorV2 call to update route
    tempDataObj = { ...tempDataObj, lastCall: 'updateRouteVendorV2' };
    const resUpdateRtVendor = await updateRouteVendorV2({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: resUpdateRtVendor };

    //releaseLock call
    tempDataObj = { ...tempDataObj, lastCall: 'releaseLock' };
    const resreleaseLock = await releaseLock({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: resreleaseLock };

    //exit if load with attachCarrierOnly
    if (dataReq.toLowerCase() === 'attachcarrieronly') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };

    if (tempDataObj.vendorCode) {
    //assignVendorToRouteV2 call to assign vendor
      tempDataObj = { ...tempDataObj, lastCall: 'assignVendorToRouteV2Vendor' };
      const resAssignVendor = await pollTimeout({
        fn: assignVendorToRouteV2Vendor,
        fnParams: { bearerToken: accToken, dataObj: tempDataObj },
        validate: validateRLCStatusOpen,
        interval: 3000,
        timeout: 120000,
      }); //The timeout here cannot be greater than the timeout in cy.then in utilities > tdmUtils > getTestData
      tempDataObj = { ...tempDataObj, lastResponse: resAssignVendor };
    }

    //exit if load with attachCarrierAndVendor
    if (dataReq.toLowerCase() === 'attachcarrierandvendor') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };

    const driverAssignment = tempDataObj.driverDispatched || defaultDriverAssignment;
    if (driverAssignment.toLowerCase() === 'yes') {
    //upsertDriverAssignment call (Status - Dispatched)
      tempDataObj = { ...tempDataObj, lastCall: 'upsertDriverAssignment' };
      const driverAssignRes = await upsertDriverAssignment({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: driverAssignRes };
    //const driverDispatched = true;
    }
    //exit if load dispatchedWithNoStopEvents
    if (dataReq.toLowerCase() === 'dispatchedwithnostopevents') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };
    if (driverAssignment.toLowerCase() === 'yes') {
    //upsertStopEventsV2 call - driver arrival for pickup
      tempDataObj = { ...tempDataObj, lastCall: 'upsertStopEventsV2 - driver arrival for pickup' };
      const driverArrivalPURes = await upsertStopEventsV2({
        bearerToken: accToken,
        dataObj: tempDataObj,
        isoDateTimeActual: tempDataObj.pickUpDateTime,
        stopId: tempDataObj.pickUpStopId,
        eventTypeId: 'driver_arrival',
      });
      tempDataObj = { ...tempDataObj, lastResponse: driverArrivalPURes };
    }
    //exit if load with stopEventPickUpArrivalOnly
    if (dataReq.toLowerCase() === 'stopeventpickuparrivalonly') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };
    if (driverAssignment.toLowerCase() === 'yes') {
    //upsertStopEventsV2 call - driver departure for pickup
      const stopEventPickUpDeparture = new Date(new Date(tempDataObj.pickUpDateTime).getTime() + 15 * 60 * 1000).toISOString(); //15 mins after arrival
      tempDataObj = { ...tempDataObj, lastCall: 'upsertStopEventsV2 - driver departure for pickup' };
      const driverDepartPURes = await upsertStopEventsV2({
        bearerToken: accToken,
        dataObj: tempDataObj,
        isoDateTimeActual: stopEventPickUpDeparture,
        stopId: tempDataObj.pickUpStopId,
        eventTypeId: 'driver_departure',
      });
      tempDataObj = { ...tempDataObj, lastResponse: driverDepartPURes };
    }
    //exit if load with stopEventPickUpDepartureOnly
    if (dataReq.toLowerCase() === 'stopeventpickupdepartureonly') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };
    if (driverAssignment.toLowerCase() === 'yes') {
    //upsertStopEventsV2 call - driver arrival for delivery
      tempDataObj = { ...tempDataObj, lastCall: 'upsertStopEventsV2 - driver arrival for delivery' };
      const driverArrivalDELRes = await upsertStopEventsV2({
        bearerToken: accToken,
        dataObj: tempDataObj,
        isoDateTimeActual: tempDataObj.deliveryDateTime,
        stopId: tempDataObj.deliveryStopId,
        eventTypeId: 'driver_arrival',
      });
      tempDataObj = { ...tempDataObj, lastResponse: driverArrivalDELRes };
    }
    //exit if load with stopEventDeliveryArrivalOnly
    if (dataReq.toLowerCase() === 'stopeventdeliveryarrivalonly') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };
    if (driverAssignment.toLowerCase() === 'yes') {
    //upsertStopEventsV2 call - driver departure for delivery
      const stopEventDeliveryDeparture = new Date(new Date(tempDataObj.deliveryDateTime).getTime() + 10 * 60 * 1000).toISOString(); //10 mins after arrival
      tempDataObj = { ...tempDataObj, lastCall: 'upsertStopEventsV2 - driver departure for delivery' };
      const driverDepartDELRes = await upsertStopEventsV2({
        bearerToken: accToken,
        dataObj: tempDataObj,
        isoDateTimeActual: stopEventDeliveryDeparture,
        stopId: tempDataObj.deliveryStopId,
        eventTypeId: 'driver_departure',
      });
      tempDataObj = { ...tempDataObj, lastResponse: driverDepartDELRes };
    }
    //exit if load with stopEventDeliveryDepartureOnly
    if (dataReq.toLowerCase() === 'stopeventdeliverydepartureonly') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };

    //updateRouteMaxCost call
    tempDataObj = { ...tempDataObj, lastCall: 'updateRouteMaxCost' };
    const updateRtMaxCostRes = await updateRouteMaxCost({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: updateRtMaxCostRes };

    //call GetAllGlobalTenantChargeTypeConfig to evaluate chargeTypeId for createCostDetailsV2 call
    tempDataObj = { ...tempDataObj, lastCall: 'getAllGlobalTenantChargeTypeConfig' };
    const getChargeTypeResponse = await getAllGlobalTenantChargeTypeConfig({ bearerToken: accToken });
    tempDataObj = { ...tempDataObj, lastResponse: getChargeTypeResponse };

    //if chargeType is passed through data template or else assign a default value
    const chargeType = tempDataObj.chargeType || defaultChargeType;
    const chargeTypeIds = getChargeTypeResponse?.data?.configurations;
    const chargeTypeObj = (chargeTypeIds || []).find(item => { return item.description === chargeType; });
    if (!chargeTypeObj) {
      throw new Error(`***The charge Type '${tempDataObj.chargeType}' is not found in the Charge Type Configuration.***`);
    };
    const chargeTypeId = chargeTypeObj.chargeTypeId;
    const chargeTypeCode = chargeTypeObj.code;

    //if cost per item is passed through data template or else assign a default value
    const chargePerItem = tempDataObj.chargePerItem || defaultChargePerItem;

    //if cost unit is passed through data template or else assign a default value
    const units = tempDataObj.units || defaultCostUnits;

    tempDataObj = { ...tempDataObj, chargeTypeId, chargePerItem, units };
    outputDataObj = { ...outputDataObj, chargeTypeCode };

    //skip createCostDetailsV2 call if the data requirement is addratelineitemonly
    if (dataReq.toLowerCase() !== 'addratelineitemonly') {
      //createCostDetailsV2 call
      tempDataObj = { ...tempDataObj, lastCall: 'createCostDetailsV2' };
      const createCostDetailsV2Res = await createCostDetailsV2({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: createCostDetailsV2Res };
      const costDetailsArr = createCostDetailsV2Res?.data?.createCostDetails;
      const costDetailsObj = (costDetailsArr || []).shift();
      const totalCost = (costDetailsObj || {}).enteredTotalCost;
      outputDataObj = { ...outputDataObj, totalCost };
    }

    //exit if load with addCostLineItemOnly
    if (dataReq.toLowerCase() === 'addcostlineitemonly') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };

    //createRateDetails - rateLineItem call
    tempDataObj = { ...tempDataObj, lastCall: 'createRateDetails' };
    const createRateDetailsResponse = await createRateDetails({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createRateDetailsResponse };
    const rateDetailsArr = createRateDetailsResponse?.data?.createRateDetails;
    const rateDetailsObj = (rateDetailsArr || []).shift();
    const totalCost = (rateDetailsObj || {}).enteredTotalRate;
    outputDataObj = { ...outputDataObj, totalCost };

    //exit if load with addCostLineItemOnly or addCostRateLineItem
    if (dataReq.toLowerCase() === 'addratelineitemonly' || dataReq.toLowerCase() === 'addcostratelineitem') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };

    //if invoice Status is passed through data template or else assign a default value
    const invoiceStatus = tempDataObj.invoiceStatus || defaultInvoiceStatus;

    tempDataObj = { ...tempDataObj, invoiceStatus };

    //createVendorInvoice call
    if (dataReq.toLowerCase() === 'addvendorinvoice' || dataReq.toLowerCase() === 'addvendorandorderinvoice') {
      tempDataObj = { ...tempDataObj, lastCall: 'createVendorInvoice' };
      const createVendorInvoiceRes = await createVendorInvoice({ bearerToken: accToken, dataObj: tempDataObj });
      tempDataObj = { ...tempDataObj, lastResponse: createVendorInvoiceRes };
      const vendorInvoiceObj = createVendorInvoiceRes?.data?.createVendorInvoice;
      const vendorInvoiceNumber = (vendorInvoiceObj || {}).vendorInvoiceNumber;
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      outputDataObj = { ...outputDataObj, vendorInvoiceNumber };
    }

    if (dataReq.toLowerCase() === 'addvendorinvoice') {
      outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
      return outputDataObj;
    };

    //if Invoice Distribution Method item is passed through data template or else assign a default value
    const invDistributionMethod = tempDataObj.invDistributionMethod || defaultInvDistributionMethod;

    //if Invoice Distribution Method item is passed through data template or else assign a default value
    const paymentTerms = tempDataObj.paymentTerms || defaultPaymentTerms;

    tempDataObj = { ...tempDataObj, invDistributionMethod, paymentTerms };

    //update Order Bypass call
    tempDataObj = { ...tempDataObj, lastCall: 'updateOrderInvRequirement' };
    const updateOrderInvRequirementRes = await updateOrderInvRequirement({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: updateOrderInvRequirementRes };

    //create Load Invoice Batch call
    tempDataObj = { ...tempDataObj, lastCall: 'createLoadInvoiceBatch' };
    const createLoadInvoiceBatchRes = await createLoadInvoiceBatch({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: createLoadInvoiceBatchRes };
    const createInvoiceBatchObj = createLoadInvoiceBatchRes?.data?.createInvoiceBatch;
    const invoiceBatchId = (createInvoiceBatchObj || {}).id;
    const invoiceHeadersArr = createInvoiceBatchObj?.invoiceHeaders;
    const invoiceHeaderObj = (invoiceHeadersArr || []).shift();
    const invoiceHeaderId = invoiceHeaderObj?.id;
    const invRateDetailsArr = invoiceHeaderObj?.rateDetails;
    const orderRateDetailsObj = (invRateDetailsArr || []).shift();
    const rateDetailId = orderRateDetailsObj?.id;
    tempDataObj = { ...tempDataObj, invoiceBatchId, invoiceHeaderId, rateDetailId };

    //Process order Load Invoice call
    tempDataObj = { ...tempDataObj, lastCall: 'processLoadInvoiceBatch' };
    const processLoadInvoiceBatchRes = await processLoadInvoiceBatch({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: processLoadInvoiceBatchRes };

    //customerInvQueueV2 order Load Invoice call
    tempDataObj = { ...tempDataObj, lastCall: 'customerInvQueueV2' };
    const customerInvQueueV2Res = await customerInvQueueV2({ bearerToken: accToken, dataObj: tempDataObj });
    tempDataObj = { ...tempDataObj, lastResponse: customerInvQueueV2Res };
    const invoicesArr = customerInvQueueV2Res?.data?.customerInvoicesQueue?.edges;
    const invoiceObj = (invoicesArr || []).shift();
    const orderInvoiceNumber = invoiceObj?.node?.invoiceNumber;
    outputDataObj = { ...outputDataObj, orderInvoiceNumber };
    outputDataObj = { ...outputDataObj, isDataCreationSuccessful: true };
  } catch (err) {
    if (err.message) {
      outputDataObj = { ...outputDataObj, lastCall: `***${tempDataObj.lastCall}***` };
      outputDataObj = { ...outputDataObj, error: `Error Message ***${err.message}***` };
      //outputDataObj = { ...outputDataObj, error: `***${err.stack}***` };
      if (!(err.message).includes('Error in Response Body')) {
        outputDataObj = { ...outputDataObj, lastResponse: `***${JSON.stringify(tempDataObj.lastResponse)}***` };
      }
    };
  }
  return outputDataObj;
};

export {
  createLoad,
};