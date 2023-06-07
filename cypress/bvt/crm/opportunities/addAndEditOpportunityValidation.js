/*---------------------------------------------------------------------------------------------------------------
Validate required fields in AddOpportunity popup
Test Cases List
Authored By                   : Sanjeev
Date                          : 21-04-2023
Functions/Calling References  : opportunitiesPage,carrierUtils,genericUtils,loginUtils
Test case Included            : ME-146451 Verify the "Edit Opportunity" Modal with the required fields via Kabob menu > CRM  > Opportunities Tab > Add Opportunity
                              : ME-146459,ME-146460 Verify Save Opportunity Button should disabled when all required fields value/s removed in Edit Opportunity Modal> CRM  > Opportunities Tab > Add Opportunity
                              : ME-146463 Verify Closed opportunities records should display in italic size font in Opportunities Table in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity
                              : ME-146462 Verify Open and On Hold opportunities records should display in normal font in Opportunities Table in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity
                                ME-146458 Verify Last updated Verbiage message  should display above the Save Opportunity Button in Edit Opportunity Modal
 ----------------------------------------------------------------------------------------------------------------------*/
import { getTDMData, viewFullPage, clickAction, verifyContains, verifyClosePopup, clearText, verifyIfDisabled, scrollIntoView, dropDownContainsTextClick, waitSometime, verifyCSSAttributeValue, toastWithMsg, dropDownExactCheckBoxSelection, generateRandomNumber, getDateWithTargetDay, getMinionValues, clickFirstElementIn } from '../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import crmIndustryData from '../../../testData/crm/crmData/crmIndustryData.json';
import { addNameAndTypeOfOpportunity, navigateToCrmTab, openAddOpportunityModal, verifyLastUpdatedMsgEditOpp } from '../../../utilities/opportunitiesUtils/opportunitiesUtils';
import { searchCarrier } from '../../../utilities/carrierUtils/carrierUtils';
import opportunitiesPage from '../../../pageObjects/crm/opportunityPage/opportunityPage.json';
import generalData from '../../../testData/assets/driver/driverDetails/general/generalData.json';
import { searchCustomer } from '../../../utilities/customerUtils/customerUtils';
import crmOpportunitiesPage from '../../../pageObjects/crm/opportunitiesPage/crmOpportunitiesPage.json';
import commonData from '../../../testData/staticData/commonData/commonData.json';
import crmOpportunitiesData from '../../../testData/crm/crmData/crmOpportunitiesData.json';
const { txtLastUpdatedBy } = crmOpportunitiesData.expectedData;
const {
  asterisk,
} = generalData.userDefinedData;
const { xIcon, btnKabob, btnEditOpportunities, btnSaveOpportunity } = crmOpportunitiesPage;
const {
  tdmAddCarrierReq,
  tdmCarrierData,
  tdmAddCustomerReq,
  tdmCustomerData,
  tdmCarrierNewOppOpen,
  tdmCustomerNewOppOpen,
} = crmIndustryData.staticData;
const {
  labelOppName,
  labelOppType,
  labelOppStage,
  labelOppReps,
  txtOppName,
  dropDwnStageType,
  drpDwnCloseReason,
  tblStatusdropdown,
  tblRowCellValue,
} = opportunitiesPage;
const oppPageContainLocators = [
  labelOppName,
  labelOppType,
  labelOppStage,
  labelOppReps,
];
const {
  stageClosedLost,
  stageRevisitOpp,
  statusClosed,
  closeReasonRevist,
  closeReasonClosedLost,
  fontStyle, txtNormal, txtItalic,
} = crmOpportunitiesData.staticData;
const {
  msgAddOpportunity,
} = crmOpportunitiesData.expectedData;
const { shortWait, longWait } = commonData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const dateObjToday = getDateWithTargetDay({ targetDate: 0 });
let carrierNameVal, customerNameVal, opportunityTypeValue;
describe('Can user Validate Add Opportunity UI validations in the Carrier & Customer > CRM > Opportunities Tab > Add Opportunity [ME-146451] [ME-146459] [ME-146460] [ME-146462] [ME-146463] [ME-146458]', () => {
  before(() => {
    getMinionValues('customerCrmOpportunityType', 1).then((opportunityType) => {
      opportunityTypeValue = opportunityType[0];
    });
  });
  beforeEach(() => {
    getTDMData({ dataType: tdmCarrierData, dataCondition: tdmAddCarrierReq, dataScenario: tdmCarrierNewOppOpen });
    cy.then(() => {
      carrierNameVal = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmCustomerNewOppOpen });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    loginToApplication({ username: usernameText, password: passwordText });
    viewFullPage();
  });
  it('ME-146451 Verify the "Edit Opportunity" Modal with the required fields via Kabob menu > CRM  > Opportunities Tab > Add Opportunity | customer |carrier', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@opportunities',
      '@p2',
    ],
  },
  () => {
    //Search Carrier
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnKabob });
    clickAction({ locator: btnEditOpportunities });
    //Validating mandatory fields with asterisk
    oppPageContainLocators.forEach((element) => {
      verifyContains({ locator: element, containsText: asterisk });
    });
    scrollIntoView({ locator: xIcon });
    verifyClosePopup();
    //Search Customer
    searchCustomer({ customerName: customerNameVal.customerName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnKabob });
    clickAction({ locator: btnEditOpportunities });
    //Validating mandatory fields with asterisk
    oppPageContainLocators.forEach((element) => {
      verifyContains({ locator: element, containsText: asterisk });
    });
    scrollIntoView({ locator: xIcon });
    verifyClosePopup();
  });

  it('ME-146459,ME-146460 Verify Save Opportunity Button should disabled when all required fields value/s removed in Edit Opportunity Modal> CRM  > Opportunities Tab > Add Opportunity | customer |carrier', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@opportunities',
      '@p2',
    ],
  },
  () => {
    //Search Carrier
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnKabob });
    clickAction({ locator: btnEditOpportunities });
    //Verify Save Opportunity Button should disabled at the first time when Edit Opportunity Modal Opened
    verifyIfDisabled({ locator: btnSaveOpportunity });
    clearText({ locator: txtOppName });
    verifyIfDisabled({ locator: btnSaveOpportunity });
    scrollIntoView({ locator: xIcon });
    verifyClosePopup();
    //Search Customer
    searchCustomer({ customerName: customerNameVal.customerName });
    //Navigating to CRM tab
    navigateToCrmTab();
    clickAction({ locator: btnKabob });
    //Verify Save Opportunity Button should disabled at the first time when Edit Opportunity Modal Opened
    clickAction({ locator: btnEditOpportunities });
    verifyIfDisabled({ locator: btnSaveOpportunity });
    clearText({ locator: txtOppName });
    verifyIfDisabled({ locator: btnSaveOpportunity });
    scrollIntoView({ locator: xIcon });
    verifyClosePopup();
  });

  it('ME-146462 Verify Open and On Hold opportunities records should display in normal font in Opportunities Table in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@opportunities',
      '@p2',
    ],
  },
  () => {
    //Search Carrier
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    navigateToCrmTab();
    verifyCSSAttributeValue({ locator: tblRowCellValue, attrValue: fontStyle, containsValue: txtNormal });
    clickAction({ locator: btnKabob });
    clickAction({ locator: btnEditOpportunities });
    dropDownContainsTextClick({ element: dropDwnStageType, typeText: stageRevisitOpp, exactText: stageRevisitOpp });
    dropDownContainsTextClick({ element: drpDwnCloseReason, typeText: closeReasonRevist, exactText: closeReasonRevist });
    clickAction({ locator: btnSaveOpportunity });
    waitSometime(shortWait);
    toastWithMsg({ message: msgAddOpportunity });
    waitSometime(shortWait);
    verifyCSSAttributeValue({ locator: tblRowCellValue, attrValue: fontStyle, containsValue: txtNormal });
    //Search Customer
    searchCustomer({ customerName: customerNameVal.customerName });
    navigateToCrmTab();
    verifyCSSAttributeValue({ locator: tblRowCellValue, attrValue: fontStyle, containsValue: txtNormal });
    clickAction({ locator: btnKabob });
    clickAction({ locator: btnEditOpportunities });
    dropDownContainsTextClick({ element: dropDwnStageType, typeText: stageRevisitOpp, exactText: stageRevisitOpp });
    dropDownContainsTextClick({ element: drpDwnCloseReason, typeText: closeReasonRevist, exactText: closeReasonRevist });
    clickAction({ locator: btnSaveOpportunity });
    waitSometime(shortWait);
    toastWithMsg({ message: msgAddOpportunity });
    waitSometime(shortWait);
    verifyCSSAttributeValue({ locator: tblRowCellValue, attrValue: fontStyle, containsValue: txtNormal });
  });

  it('ME-146463 Verify Closed opportunities records should display in italic size font in Opportunities Table in Carrier & Customer > CRM  > Opportunities Tab > Add Opportunity', {
    tags: [
      '@carrier',
      '@customer',
      '@crm',
      '@opportunities',
      '@p2',
    ],
  },
  () => {
    //Search Carrier
    searchCarrier({ carrierName: carrierNameVal.carrierName });
    navigateToCrmTab();
    clickAction({ locator: btnKabob });
    clickAction({ locator: btnEditOpportunities });
    dropDownContainsTextClick({ element: dropDwnStageType, typeText: stageClosedLost, exactText: stageClosedLost });
    dropDownContainsTextClick({ element: drpDwnCloseReason, typeText: closeReasonClosedLost, exactText: closeReasonClosedLost });
    clickAction({ locator: btnSaveOpportunity });
    waitSometime(shortWait);
    toastWithMsg({ message: msgAddOpportunity });
    waitSometime(shortWait);
    dropDownExactCheckBoxSelection({ element: tblStatusdropdown, ddValue: statusClosed });
    verifyCSSAttributeValue({ locator: tblRowCellValue, attrValue: fontStyle, containsValue: txtItalic });
    //Search Customer
    searchCustomer({ customerName: customerNameVal.customerName });
    navigateToCrmTab();
    clickAction({ locator: btnKabob });
    clickAction({ locator: btnEditOpportunities });
    dropDownContainsTextClick({ element: dropDwnStageType, typeText: stageClosedLost, exactText: stageClosedLost });
    dropDownContainsTextClick({ element: drpDwnCloseReason, typeText: closeReasonClosedLost, exactText: closeReasonClosedLost });
    clickAction({ locator: btnSaveOpportunity });
    waitSometime(shortWait);
    toastWithMsg({ message: msgAddOpportunity });
    waitSometime(shortWait);
    dropDownExactCheckBoxSelection({ element: tblStatusdropdown, ddValue: statusClosed });
    verifyCSSAttributeValue({ locator: tblRowCellValue, attrValue: fontStyle, containsValue: txtItalic });
  });
  it('ME-146458 Verify Last updated Verbiage message  should display above the Save Opportunity Button in Edit Opportunity Modal> CRM  > Opportunities Tab > Edit Opportunity | customer |carrier',
    {
      tags: ['@carrier', '@customer', '@crm', '@opportunities', '@p2', '@phase2'],
    },
    () => {
      //pre-requisite test data
      const currentDate = dateObjToday.mm + '/' + dateObjToday.dd + '/' + dateObjToday.yy;
      const user = usernameText.split('@')[0];
      const expectedMsg = txtLastUpdatedBy + user + '.' + user + ' ' + currentDate;

      //carrier
      //opening existing carrier
      searchCarrier({ carrierName: carrierNameVal.carrierName });

      navigateToCrmTab();
      openAddOpportunityModal();

      //adding new opportunity with test account
      addNameAndTypeOfOpportunity({ nameField: generateRandomNumber(), opportunityTypeField: opportunityTypeValue });
      clickAction({ locator: btnSaveOpportunity });
      waitSometime(longWait);

      //navigating to edit opportunity model popup
      clickFirstElementIn({ locator: btnKabob });
      clickFirstElementIn({ locator: btnEditOpportunities });

      verifyLastUpdatedMsgEditOpp({ locator: btnSaveOpportunity, containMsg: expectedMsg });

      //customer
      //opening existing customer
      searchCustomer({ customerName: customerNameVal.customerName });

      navigateToCrmTab();
      openAddOpportunityModal();

      //adding new opportunity with test account
      addNameAndTypeOfOpportunity({ nameField: generateRandomNumber(), opportunityTypeField: opportunityTypeValue });
      clickAction({ locator: btnSaveOpportunity });
      waitSometime(longWait);

      //navigating to edit opportunity model popup
      clickFirstElementIn({ locator: btnKabob });
      clickFirstElementIn({ locator: btnEditOpportunities });

      verifyLastUpdatedMsgEditOpp({ locator: btnSaveOpportunity, containMsg: expectedMsg });
    });
});