/*---------------------------------------------------------------------------------------------------------------
Validate required fields in AddOpportunity popup
Test Cases List
Authored By                   : Jyothi Prasad
Date                          : 19-04-2023
Functions/Calling References  : opportunitiesPage,carrierUtils,genericUtils,loginUtils
Test case Included            : ME-146429 - Validate Add Opportunity required fields in the Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity
                              : ME-146436 Verify Save Opportunity Button should disabled when all required fields does not contains any value in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity
                              : ME-146433 Verify Save Opportunity button should enabled after entering value/s in all required fields in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity
                              : ME-146437 Verify the recently Added Opportunity record should display at the top of the opportunity table based on Status in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity
                              : ME-146449 Verify the "Open" and "On Hold" opportunity records should display by-default in the opportunity table in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity
---------------------------------------------------------------------------------------------------------------*/
import { getTDMData, viewFullPage, clickAction, verifyBorderColour, verifyContains, verifyVisible, verifyIfDisabled, typeText, typeDropDwnClick, verifyIfEnabled, generateRandomNumber, clickWithWaits, getMinionValues, verifyFirstElementTxt, verifyLastElementTxt, toastWithMsg } from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import { navigateToCrmTab, addNameAndTypeOfOpportunity, addOppWithNameTypeAndStage } from '../../../utilities/opportunitiesUtils/opportunitiesUtils';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
import opportunitiesPage from '../../../pageObjects/crm/opportunityPage/opportunityPage.json';
import generalData from '../../../testData/assets/driver/driverDetails/general/generalData.json';
import { searchCustomer, addOpportunityAllFields } from '../../../utilities/customerUtils/customerUtils';
import crmOpportunitiesPage from '../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import crmOpportunitiesData from '../../../testData/crm/crmData/crmOpportunitiesData.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import { genrateRandomName } from '../../../tdm/lib/utilities/utilities';
const { longWait } = commonData;
const { oppName, oppType, opportunityName } = crmOpportunitiesData.userDefined;
const {
  asterisk,
} = generalData.userDefinedData;
const { xIcon, txtFieldOppName, drpDwnOppType, btnSaveOpportunity, tblFirstRowName, tblFirstRowStatus } = crmOpportunitiesPage;
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmCarrierNewOppOpen,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCustomerNewOppOpen,
  minionDrpDwnType,
  stageRevisitOpp,
  oppStatusOpen,
  oppStatusOnHold,
  minionDrpDwnSource,
  minionDrpDwnStage,
  minionDrpDwnSolType,
  minionDrpDwnSolution,
  minionDrpDwnPricingStrat,
} = crmOpportunitiesData.staticData;
const {
  msgAddOpportunity,
} = crmOpportunitiesData.expectedData;
const {
  btnOpportunityPlus,
  txtOpportunityName,
  dropDwnOpportunityType,
  dropDwnStageType,
  dropDwnRepsId,
  labelOppName,
  labelOppType,
  labelOppStage,
  labelOppReps,
  btnSaveNewOpportunity,
} = opportunitiesPage;
const oppPageContainLocators = [
  labelOppName,
  labelOppType,
  labelOppStage,
  labelOppReps,
];
const oppPageColorLocators = [
  dropDwnOpportunityType,
  dropDwnStageType,
  dropDwnRepsId,
];
const {
  colorCodeVal,
  editIndustryColorCodeVal,
} = crmIndustryData.expectedData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let carrierNameVal, customerNameVal, opportunityNameValue, opportunityTypeValue, drpDwnSourceOption1, drpDwnStageOption1, drpDwnSolType2, drpDwnSolution1, drpDwnPricStrat1;
describe('Can user Validate Add Opportunity UI validations in the Carrier & Customer > CRM > Opportunities Tab > Add Opportunity [ME-146429, ME-146436, ME-146433, ME-146437, ME-146449]', () => {
  before(() => {
    cy.log('***creating new Carrier with Open Opportunity***');
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewOppOpen });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    cy.log('***creating new Customer with Open Opportunity***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerNewOppOpen });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    getMinionValues(minionDrpDwnType, 1).then((opportunityType) => {
      opportunityTypeValue = opportunityType[0];
    });
    getMinionValues(minionDrpDwnSource, 10).then((resultOptions) => {
      drpDwnSourceOption1 = resultOptions[1];
    });
    getMinionValues(minionDrpDwnStage, 8).then((resultOptions) => {
      drpDwnStageOption1 = resultOptions[1];
    });
    getMinionValues(minionDrpDwnSolType, 2).then((resultOptions) => {
      drpDwnSolType2 = resultOptions[1];
    });
    getMinionValues(minionDrpDwnSolution, 3).then((resultOptions) => {
      drpDwnSolution1 = resultOptions[0];
    });
    getMinionValues(minionDrpDwnPricingStrat, 3).then((resultOptions) => {
      drpDwnPricStrat1 = resultOptions[0];
    });
  });
  beforeEach(() => {
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-146429 Validate Add Opportunity required fields in the Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@opportunities',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    //Search Carrier
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    //Navigating to CRM tab
    navigateToCrmTab();
    verifyVisible({ element: btnOpportunityPlus });
    clickAction({ locator: btnOpportunityPlus });
    //Validating border color of the mandatory fields
    verifyBorderColour({ locator: txtOpportunityName, colourValue: colorCodeVal });
    oppPageColorLocators.forEach((element) => {
      verifyBorderColour({ locator: element, colourValue: editIndustryColorCodeVal });
    });
    //Validating mandatory fields with asterisk
    oppPageContainLocators.forEach((element) => {
      verifyContains({ locator: element, containsText: asterisk });
    });
    clickAction({ locator: xIcon });
    //Search Customer
    searchCustomer({ customerName: customerNameVal.customerName });
    //Navigating to CRM tab
    navigateToCrmTab();
    verifyVisible({ element: btnOpportunityPlus });
    clickAction({ locator: btnOpportunityPlus });
    //Validating border color of the mandatory fields
    verifyBorderColour({ locator: txtOpportunityName, colourValue: colorCodeVal });
    oppPageColorLocators.forEach((element) => {
      verifyBorderColour({ locator: element, colourValue: editIndustryColorCodeVal });
    });
    //Validating mandatory fields with asterisk
    oppPageContainLocators.forEach((element) => {
      verifyContains({ locator: element, containsText: asterisk });
    });
  });

  it('ME-146436 Verify Save Opportunity Button should disabled when all required fields does not contains any value in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@opportunities',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    //Search Carrier
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnOpportunityPlus });
    //Validating Save Opportunity button is disabled
    verifyIfDisabled({ locator: btnSaveNewOpportunity });
    clickAction({ locator: xIcon });
    //Search Customer
    searchCustomer({ customerName: customerNameVal.customerName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnOpportunityPlus });
    //Validating Save Opportunity button is disabled
    verifyIfDisabled({ locator: btnSaveNewOpportunity });
    clickAction({ locator: xIcon });
  });

  it('ME-146433 Verify Save Opportunity button should enabled after entering value/s in all required fields in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@opportunities',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    //Search Carrier
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnOpportunityPlus });
    //Validating Save Opportunity button is disabled
    verifyIfDisabled({ locator: btnSaveNewOpportunity });
    typeText({ locator: txtFieldOppName, dataText: oppName });
    typeDropDwnClick({ locator: drpDwnOppType, drpDwnVal: oppType });
    verifyIfEnabled({ locator: btnSaveOpportunity });
    clickAction({ locator: xIcon });
    //Search Customer
    searchCustomer({ customerName: customerNameVal.customerName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnOpportunityPlus });
    //Validating Save Opportunity button is disabled
    verifyIfDisabled({ locator: btnSaveNewOpportunity });
    typeText({ locator: txtFieldOppName, dataText: oppName });
    typeDropDwnClick({ locator: drpDwnOppType, drpDwnVal: oppType });
    verifyIfEnabled({ locator: btnSaveOpportunity });
    clickAction({ locator: xIcon });
  });

  it('ME-146437 Verify the recently Added Opportunity record should display at the top of the opportunity table based on Status in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@opportunities',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    //Search Carrier
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnOpportunityPlus });
    //Adding new Opportunity
    opportunityNameValue = opportunityName + generateRandomNumber();
    addNameAndTypeOfOpportunity({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue });
    clickWithWaits({ locator: btnSaveOpportunity, waitTime: longWait });
    //Verifying newly added Opportunity in first row
    verifyFirstElementTxt({ locator: tblFirstRowName, verifyText: opportunityNameValue });
    //Search Customer
    searchCustomer({ customerName: customerNameVal.customerName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnOpportunityPlus });
    //Adding new Opportunity
    addNameAndTypeOfOpportunity({ nameField: opportunityNameValue, opportunityTypeField: opportunityTypeValue });
    clickWithWaits({ locator: btnSaveOpportunity, waitTime: longWait });
    //Verifying newly added Opportunity in first row
    verifyFirstElementTxt({ locator: tblFirstRowName, verifyText: opportunityNameValue });
  });

  it('ME-146449 Verify the "Open" and "On Hold" opportunity records should display by-default in the opportunity table in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@opportunities',
      '@p2',
      '@phase2',
    ],
  },
  () => {
    //Search Carrier
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnOpportunityPlus });
    //Adding new Opportunity
    opportunityNameValue = opportunityName + generateRandomNumber();
    addOppWithNameTypeAndStage({ oppNameValue: opportunityNameValue, oppTypeValue: opportunityTypeValue, oppStageValue: stageRevisitOpp });
    //Verifying Opportunities with Open and OnHold status
    verifyFirstElementTxt({ locator: tblFirstRowStatus, verifyText: oppStatusOpen });
    verifyLastElementTxt({ locator: tblFirstRowStatus, verifyText: oppStatusOnHold });
    //Search Customer
    searchCustomer({ customerName: customerNameVal.customerName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnOpportunityPlus });
    //Adding new Opportunity
    addOppWithNameTypeAndStage({ oppNameValue: opportunityNameValue, oppTypeValue: opportunityTypeValue, oppStageValue: stageRevisitOpp });
    //Verifying Opportunities with Open and OnHold status
    verifyFirstElementTxt({ locator: tblFirstRowStatus, verifyText: oppStatusOpen });
    verifyLastElementTxt({ locator: tblFirstRowStatus, verifyText: oppStatusOnHold });
  });

  it('ME-146434 Verify user able to save a Opportunity via ' + ' icon in Carrier & Customer > CRM > carrier details | carrier Regression | Sprint Regression',
    {
      tags: [
        '@carrier',
        '@customer',
        '@crm',
        '@opportunities',
        '@p2',
        '@phase2',
      ],
    },
    () => {
      //Search Carrier
      searchCarrier({ carrierName: carrierNameVal.carrierName });
      //Navigating to CRM tab
      navigateToCrmTab();
      //Generating a random name to use for adding an Opportunity
      const opportunityNameValue = genrateRandomName() + generateRandomNumber();
      addOpportunityAllFields({
        dataText: opportunityNameValue,
        drpDwnSource: drpDwnSourceOption1,
        drpDwnType: opportunityTypeValue,
        drpDwnStage: drpDwnStageOption1,
        drpDwnSolutionType: drpDwnSolType2,
        drpDwnSolution: drpDwnSolution1,
        drpDwnPricStrat: drpDwnPricStrat1,
      });
      //Verifying 'Updated' message after adding an Opportunity
      toastWithMsg({ message: msgAddOpportunity });
      //Search Customer
      searchCustomer({ customerName: customerNameVal.customerName });
      //Navigating to CRM tab
      navigateToCrmTab();
      //Generating a random name to use for adding an Opportunity
      const opportunityNameValue2 = genrateRandomName() + generateRandomNumber();
      addOpportunityAllFields({
        dataText: opportunityNameValue2,
        drpDwnSource: drpDwnSourceOption1,
        drpDwnType: opportunityTypeValue,
        drpDwnStage: drpDwnStageOption1,
        drpDwnSolutionType: drpDwnSolType2,
        drpDwnSolution: drpDwnSolution1,
        drpDwnPricStrat: drpDwnPricStrat1,
      });
      //Verifying 'Updated' message after adding an Opportunity
      toastWithMsg({ message: msgAddOpportunity });
    });
});