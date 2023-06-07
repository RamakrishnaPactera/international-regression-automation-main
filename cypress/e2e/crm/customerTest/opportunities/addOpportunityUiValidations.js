/*---------------------------------------------------------------------------------------------------------------
Verify Add and Edit Opportunity UI validations and hover over columns and sorting//
Test Cases List
Authored By                   : Mamatha Polapalli
Date                          : 13-03-2023
Functions/Calling References  : crmOpportunitiesPage,crmOpportunitiesData,opportunityUtils,utilities
Test case Included            : ME-130432 - Can I Validate Add Opportunity UI validations in the Customer >
                                CRM > Opportunities > Add Opportunities
                              : ME-130433 - Can I Validate Edit Opportunity UI validations in the Customer >
                                CRM > Opportunities > Add Opportunities
---------------------------------------------------------------------------------------------------------------*/

import {
  getMinionValues,
  getTDMData,
  generateRandomNumber,
  viewFullPage,
  waitSometime,
} from '../../../../utilities/commonUtils/genericUtils';
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
import {
  navigateToRegionsTab,
} from '../../../../utilities/customerUtils/customerUtils';
const { longWait } = commondata;
const {
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerScenario,
} = crmIndustryData.staticData;
const {
  opportunityName,
  regionNameText,
} = crmOpportunitiesData.userDefined;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let customerNameVal, opportunitySourceValue, opportunityTypeValue, opportunitySolutionTypeVal, opportunityPricingStratVal, businessUnitVal, divisionValue, modeValue, sizeValue, regionTypeValue, equipmentValue;
let regionSetName, opportunityNameValue;
describe('Can I Validate Add Opportunity UI validations in the Customer > CRM > Opportunities Tab > Add Opportunity [ME-130432][ME-130433][ME-130491]', () => {
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
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerScenario });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-130432 Can I Validate Add Opportunity UI validations in the Customer > CRM > Opportunities > Add Opportunities | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p3',
      '@phase2',
    ],
  },
  () => {
    navigateToRegionsTab({ customerName: customerNameVal.customerName });
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
  it('ME-130433 Can I Validate Edit Opportunity UI validations in the Customer > CRM > Opportunities > Add Opportunities | Customer Regression | Sprint Regression', {
    tags: [
      '@customer',
      '@crm',
      '@customerContacts',
      '@p3',
      '@phase2',
    ],
  },
  () => {
    navigateToRegionsTab({ customerName: customerNameVal.customerName });
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