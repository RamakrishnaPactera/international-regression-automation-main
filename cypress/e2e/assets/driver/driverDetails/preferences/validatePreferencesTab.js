/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Verify Mandatory fields in preferences tab
Authored By : Shashi Jaiswal
 Date : 18-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils, utilities
 Test case Included :
 ME-156531 : Verify Mandatory fields in preferences tab - Facility Preferences
 ME-156532 : Verify Mandatory fields in preferences tab - Customer Preferences
 ME-156533 : Verify Mandatory fields in preferences tab - Preferred lanes
 ME-156534 : Verify Mandatory fields in preferences tab - Team Preferences
 ME-156535 : Verify Mandatory fields in preferences tab - Geography Preferences
 ME-156536 : Verify Mandatory fields in preferences tab - Preferred Routes
 ME-156537 : Verify Mandatory fields in preferences tab - Career Goals
 ME-156538 : Verify Mandatory fields in preferences tab - Commodity Preferences
 ME-156539 : Verify Mandatory fields in preferences tab - Operational Preferences
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { viewFullPage, clickAction, waitSometime, getTDMData, verifyVisible, verifyAttrValueContains, verifyTableRowElementText, triggerMouseHover, verifyElementText } from '../../../../../utilities/commonUtils/genericUtils';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';

const { shortWait } = commonData;
const {
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
  requiredName,
  requiredPrefTerm,
  requiredPreference,
  requiredReason,
  requiredType,
  requiredState,
  validationRequired,
  requiredPosition,
  requiredCommodity,
} = preferencesData.expectedData;
const {
  dataPopUpType,
  errorText,
} = preferencesData.staticData;
const { facility, errorIconMsg, btnSaveRecord, customer, btnCloseIcon, preferredLane, teamPref, geoPref, prefRoute, careerGoals, commodity, operationalPref } = preferencesPage;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM;

describe('Validate Mandatory fields - Driver preferences tab', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });

  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });

  it('ME-156531, Verify Mandatory fields in preferences tab - Facility Preferences',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: facility.btnAddNew });
      //verify mandatory fields
      verifyAttrValueContains({ locator: facility.txtFacName, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: facility.infoTagFacName });
      verifyAttrValueContains({ locator: facility.drpDwnPreference, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: facility.infoTagPreference });
      verifyAttrValueContains({ locator: facility.drpDwnReason, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: facility.infoTagReason });
      triggerMouseHover({ element: btnSaveRecord });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: requiredName });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: requiredPreference });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: requiredReason });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-156532, Verify Mandatory fields in preferences tab - Customer Preferences',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: customer.prefTab });
      clickAction({ locator: customer.btnAddNew });
      //Verify mandatory fields
      verifyAttrValueContains({ locator: customer.txtName, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: customer.infoTagCusName });
      verifyAttrValueContains({ locator: customer.drpDwnPreference, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: customer.infoTagPreference });
      verifyAttrValueContains({ locator: customer.txtReason, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: customer.infoTagReason });
      triggerMouseHover({ element: btnSaveRecord });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: requiredName });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: requiredPrefTerm });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: requiredReason });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-156533, Verify Mandatory fields in preferences tab - Preferred lanes',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferredLane.btnAddNew });
      //Verify mandatory fields
      verifyElementText({ locator: preferredLane.spanTypeOrigin, verifyText: '*' });
      verifyElementText({ locator: preferredLane.spanDestType, verifyText: '*' });
      verifyAttrValueContains({ locator: preferredLane.drpDwnPref, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: preferredLane.infoTagPreference });
      verifyAttrValueContains({ locator: preferredLane.drpDwnReason, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: preferredLane.infoTagReason });
      triggerMouseHover({ element: btnSaveRecord });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: requiredPreference });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: requiredReason });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-156534, Verify Mandatory fields in preferences tab - Team Preferences',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: teamPref.btnAddNew });
      //Verify mandatory fields
      verifyAttrValueContains({ locator: teamPref.drpDwnType, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: teamPref.infoTagType });
      verifyAttrValueContains({ locator: teamPref.drpDwnPreference, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: teamPref.infoTagPreference });
      triggerMouseHover({ element: btnSaveRecord });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: requiredType });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: requiredPreference });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-156535, Verify Mandatory fields in preferences tab - Geography Preferences',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: geoPref.btnAddNew });
      //Verify mandatory fields
      verifyAttrValueContains({ locator: geoPref.drpDwnState, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: geoPref.infoTagState });
      verifyAttrValueContains({ locator: geoPref.drpDwnPref, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: geoPref.infoTagPref });
      verifyAttrValueContains({ locator: geoPref.drpDwnReason, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: geoPref.infoTagReason });
      triggerMouseHover({ element: btnSaveRecord });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: requiredState });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: requiredPreference });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: requiredReason });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-156536, Verify Mandatory fields in preferences tab - Preferred Routes',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: prefRoute.btnAddNew });
      //Verify mandatory fields
      verifyAttrValueContains({ locator: prefRoute.drpDwnPref, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: prefRoute.infoTagPref });
      verifyAttrValueContains({ locator: prefRoute.drpDwnReason, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: prefRoute.infoTagReason });
      triggerMouseHover({ element: prefRoute.btnAddPrefRoute });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: requiredPreference });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: requiredReason });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-156537, Verify Mandatory fields in preferences tab - Career Goals',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: careerGoals.btnAddNewGoal });
      //Verify mandatory fields
      verifyAttrValueContains({ locator: careerGoals.drpDwnPosition, attribute: validationRequired, verifyText: validationRequired });
      verifyVisible({ element: careerGoals.infoTagPosition });
      verifyAttrValueContains({ locator: careerGoals.drpDwnPreference, attribute: validationRequired, verifyText: validationRequired });
      verifyVisible({ element: careerGoals.infoTagPref });
      verifyAttrValueContains({ locator: careerGoals.drpDwnReason, attribute: validationRequired, verifyText: validationRequired });
      verifyVisible({ element: careerGoals.infoTagReason });
      triggerMouseHover({ element: btnSaveRecord });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: requiredPosition });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: requiredPreference });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: requiredReason });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-156538, Verify Mandatory fields in preferences tab - Commodity Preferences',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: commodity.btnAddNew });
      //Verify mandatory fields
      verifyAttrValueContains({ locator: commodity.drpDwnCommodity, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: commodity.infoTagCommodity });
      verifyAttrValueContains({ locator: commodity.drpDwnPref, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: commodity.infoTagPref });
      verifyAttrValueContains({ locator: commodity.drpDwnReason, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: commodity.infoTagReason });
      triggerMouseHover({ element: btnSaveRecord });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: requiredCommodity });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: requiredPreference });
      verifyTableRowElementText({ locator: errorIconMsg, index: 2, verifyText: requiredReason });
      clickAction({ locator: btnCloseIcon });
    });

  it('ME-156539, Verify Mandatory fields in preferences tab - Operational Preferences',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: operationalPref.btnAddNew });
      //Verify mandatory fields
      verifyAttrValueContains({ locator: operationalPref.drpDwnType, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: operationalPref.infoTagType });
      verifyAttrValueContains({ locator: operationalPref.drpDwnPreference, attribute: dataPopUpType, verifyText: errorText });
      verifyVisible({ element: operationalPref.infoTagPreference });
      triggerMouseHover({ element: btnSaveRecord });
      verifyTableRowElementText({ locator: errorIconMsg, index: 0, verifyText: requiredType });
      verifyTableRowElementText({ locator: errorIconMsg, index: 1, verifyText: requiredPreference });
      clickAction({ locator: btnCloseIcon });
    });
});