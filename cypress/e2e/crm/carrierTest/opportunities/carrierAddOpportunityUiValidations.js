/*---------------------------------------------------------------------------------------------------------------
List to all Fields Data to add and edit opportunity, UI validations with the below Minion terms//
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 14-03-2023
Functions/Calling References  : crmOpportunitiesPage,crmOpportunitiesData,opportunityUtils,utilities
Test case Included            : ME-130919 - Can I Validate Add Opportunity UI validations in the Carrier > CRM > CarrierContacts > Opportunities Tab > Add Opportunity
                              : ME-130919 - Can I Validate Edit Opportunity UI validations in the Carrier > CRM > CarrierContacts > Opportunities Tab > Add Opportunity
---------------------------------------------------------------------------------------------------------------*/

import {
  clickFirstElementIn,
  getMinionValues,
  getTDMData,
  generateRandomNumber,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
import crmFirmographicsPage from '../../../../pageObjects/crm/crmPage/crmFirmographicsPage.json';
import commondata from '../../../../testData/staticData/commonData/commonData.json';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmIndustryData from '../../../../testData/crm/crmData/crmIndustryData.json';
import crmOpportunitiesData from '../../../../testData/crm/crmData/crmOpportunitiesData.json';
import {
  createRegionSet,
  navigateToCrmTab,
  openAddOpportunityModal,
  openEditOpportunityModal,
  openOpportunityInExpandView,
  switchToClosedStatus,
  verifyObIbRegion,
  verifyAddopportunityTextFieldsAndDatePicker,
  verifyAndFillOpportunityFields,
} from '../../../../utilities/opportunitiesUtils/opportunitiesUtils';
import { searchCarrier } from '../../../../utilities/carrierUtils/carrierUtils';
const { longWait } = commondata;
const {
  tabRegions,
  tabCreateRegionSet,
} = crmFirmographicsPage;
const {
  opportunityName,
  regionNameText,
} = crmOpportunitiesData.userDefined;
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewScenario,
} = crmIndustryData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let opportunitySourceValue, opportunityTypeValue, opportunitySolutionTypeVal, opportunityPricingStratVal, businessUnitVal, divisionValue, modeValue, sizeValue, regionTypeValue, equipmentValue;
let regionSetName, opportunityNameValue;
let carrierNameVal;
describe('Can I Validate Add Opportunity UI validations in the Carrier > CRM > CarrierContacts > Opportunities Tab > Add Opportunity [ME-130919][ME-130920]', () => {
  beforeEach(() => {
    getMinionValues('customerCrmOpportunitySource', 1).then((opportunitySource) => {
      opportunitySourceValue = opportunitySource[0];
    });
    getMinionValues('customerCrmOpportunityType', 1).then((opportunityType) => {
      opportunityTypeValue = opportunityType[0];
    });
    getMinionValues('customerCrmOpportunitySolutionType', 1).then((opportunitySolutionType) => {
      opportunitySolutionTypeVal = opportunitySolutionType[0];
    });
    getMinionValues('customerCrmOpportunityPricingStrategy', 1).then((opportunityPricingStrat) => {
      opportunityPricingStratVal = opportunityPricingStrat[0];
    });
    getMinionValues('businessUnit', 1).then((opportunityBusinessUnit) => {
      businessUnitVal = opportunityBusinessUnit[0];
    });
    getMinionValues('division', 1).then((opportunityDivision) => {
      divisionValue = opportunityDivision[0];
    });
    getMinionValues('trailerType', 1).then((opportunityEquipment) => {
      equipmentValue = opportunityEquipment[0];
    });
    getMinionValues('transportMode', 1).then((opportunityMode) => {
      modeValue = opportunityMode[0];
    });
    getMinionValues('loadSize', 1).then((opportunityLoadSize) => {
      sizeValue = opportunityLoadSize[0];
    });
    getMinionValues('regionType', 1).then((createRegionType) => {
      regionTypeValue = createRegionType[0];
    });
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewScenario });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-130919 Can I Validate Add Opportunity UI validations in the Carrier > CRM > CarrierContacts> Opportunities > Add Opportunities | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p3',
      '@phase2',
    ],
  },
  () => {
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    clickFirstElementIn({ locator: tabRegions });
    clickFirstElementIn({ locator: tabCreateRegionSet });
    waitSometime(longWait);
    regionSetName = regionNameText + generateRandomNumber();
    createRegionSet({ regionName: regionSetName, createRegionType: regionTypeValue });
    navigateToCrmTab();
    openOpportunityInExpandView();
    waitSometime(longWait);
    openAddOpportunityModal();
    opportunityNameValue = opportunityName + generateRandomNumber();
    verifyAndFillOpportunityFields({ nameField: opportunityNameValue, opportunitySourceField: opportunitySourceValue, opportunityTypeField: opportunityTypeValue, fieldDivision: divisionValue, fieldBusinessUnit: businessUnitVal, fieldMode: modeValue, fieldSize: sizeValue, fieldSolutionType: opportunitySolutionTypeVal, fieldEquipment: equipmentValue, regionName: regionSetName });
    verifyObIbRegion();
    verifyAddopportunityTextFieldsAndDatePicker({ pricingStrategy: opportunityPricingStratVal });
  });
  it('ME-130920 Can I Validate Edit Opportunity UI validations in the Carrier > CRM > CarrierContacts> Opportunities > Add Opportunities | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p3',
      '@phase2',
    ],
  },
  () => {
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    clickFirstElementIn({ locator: tabRegions });
    clickFirstElementIn({ locator: tabCreateRegionSet });
    waitSometime(longWait);
    regionSetName = regionNameText + generateRandomNumber();
    createRegionSet({ regionName: regionSetName, createRegionType: regionTypeValue });
    navigateToCrmTab();
    openOpportunityInExpandView();
    waitSometime(longWait);
    openAddOpportunityModal();
    opportunityNameValue = opportunityName + generateRandomNumber();
    verifyAndFillOpportunityFields({ nameField: opportunityNameValue, opportunitySourceField: opportunitySourceValue, opportunityTypeField: opportunityTypeValue, fieldDivision: divisionValue, fieldBusinessUnit: businessUnitVal, fieldMode: modeValue, fieldSize: sizeValue, fieldSolutionType: opportunitySolutionTypeVal, fieldEquipment: equipmentValue, regionName: regionSetName });
    verifyObIbRegion();
    verifyAddopportunityTextFieldsAndDatePicker({ pricingStrategy: opportunityPricingStratVal });
    switchToClosedStatus();
    openEditOpportunityModal();
    verifyAndFillOpportunityFields({ nameField: opportunityNameValue, opportunitySourceField: opportunitySourceValue, opportunityTypeField: opportunityTypeValue, fieldDivision: divisionValue, fieldBusinessUnit: businessUnitVal, fieldMode: modeValue, fieldSize: sizeValue, fieldSolutionType: opportunitySolutionTypeVal, fieldEquipment: equipmentValue, regionName: regionSetName });
    verifyAddopportunityTextFieldsAndDatePicker({ pricingStrategy: opportunityPricingStratVal });
  });
});