/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Career Goals - UAT - Functional Testcase
 Test Cases List
 Authored By : Shashi Jaiswal, Mamatha Polapalli
 Date : 02-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils, utilities
 Test case Included : ME-52190,ME-156571 Verify whether the Career Goals card present under Driver → Preference tab
 ME-137786 : Verify Edit Career Goals Functionality
 ME-151324 : Verify whether user can be able to add Career Goals record by clicking on Add Symbol in Career Goals card
 ME-151325 : Verify whether the User able to add New Career Goals record.
 ME-151326 : Verify values of the Career Goals card fields
 ME-151327 : Career Goals - Verify Mandatory fields
 ME-151328 : Verify Delete Career Goals Record.
 ME-151569 : Verify Career Goals Auto populated fields.
 ME-151572 : Verify whether Duplicate Career Goals records are not allowed
 ME-137789 : Career goals - Regression - UI Testcase
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { addNewCareerGoal, driverSaveAndVerifyUpdatedMsg, searchDriverWithCode, validateDrpDwnField } from '../../../../../utilities/assetUtils/resourceUtilis';
import { getMinionValues, viewFullPage, clickAction, typeDrpDwnWithMachtingText, waitSometime, getTDMData, clickActionWait, verifyIfDisabled, verifyIfEnabled, verifyLblHaveValue, selectItemFrmSrchPicker, clickOkOnWindowAlert, clickCancelOnWindowAlert, verifyVisible, verifyLabelUsingMapArray, verifyContains, verifyToolTips, getText } from '../../../../../utilities/commonUtils/genericUtils';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import dayjs from 'dayjs';

const { shortWait } = commonData;
const { btnDriverSave } = homePage;
const {
  minionDrvrPreference,
  minionLoadDivision,
  minionBusinessUnit,
  minionGoalPreference,
  minionRoutesReason,
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
  tdmCustomerData,
  tdmAddCustomer,
  tdmAddCustomerReq,
} = preferencesData.expectedData;
const { lblPosition, lblCustomer, lblDivision, lblFleet, lblPreference, lblReason, asterisk } = preferencesData.staticData;
const { careerGoals } = preferencesPage;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];

let driverDataTDM, customerNameVal, drpDwnPositionData, drpDwnUpdatedPosData, drpDwnDivisionData, drpDwnBuData, drpDwnPreferenceData, drpDwnReasonData, documentDate;

const openGoalAction = ({ action: actionName }) => {
  cy.get(careerGoals.goalsTable).find(careerGoals.tblRows)
    .find(careerGoals.btnKabobMenu)
    .first().click({ force: true });
  cy.get(careerGoals.lstContextMenuOptions).filter(':visible').contains(actionName).click({ force: true });
};
const careerGoalLabelData = new Map([
  [preferencesPage.lblPosition, lblPosition],
  [preferencesPage.lblFleet, lblFleet],
  [preferencesPage.lblDivision, lblDivision],
  [preferencesPage.lblCustomer, lblCustomer],
  [preferencesPage.lblPreference, lblPreference],
  [preferencesPage.lblReason, lblReason],
]);
describe('Career Goals - Functional Testcase [ME-52190, ME-137786, ME-151324, ME-151325, ME-151326, ME-151327, ME-151328, ME-151569, ME-151572, ME-156571, ME-137789]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.log('***creating customer using TDM***');
    getTDMData({ dataType: tdmCustomerData, dataCondition: tdmAddCustomerReq, dataScenario: tdmAddCustomer });
    cy.then(() => {
      customerNameVal = Cypress.env('inputVal');
    });
    getMinionValues(minionDrvrPreference, 2).then((resultOptions) => {
      drpDwnPositionData = resultOptions[0];
      drpDwnUpdatedPosData = resultOptions[1];
    });
    getMinionValues(minionLoadDivision, 1).then((resultOptions) => {
      drpDwnDivisionData = resultOptions[0];
    });
    getMinionValues(minionBusinessUnit, 1).then((resultOptions) => {
      drpDwnBuData = resultOptions[0];
    });
    getMinionValues(minionGoalPreference, 1).then((resultOptions) => {
      drpDwnPreferenceData = resultOptions[0];
    });
    getMinionValues(minionRoutesReason, 1).then((resultOptions) => {
      drpDwnReasonData = resultOptions[0];
    });
  });

  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });

  it('[ME-52190, ME-151324, ME-151325, ME-151327, ME-156571] Career Goals - Functional Testcase',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: careerGoals.btnAddNewGoal });
      //Add new career goal
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnPosition, drpDwnVal: drpDwnPositionData });
      verifyIfDisabled({ locator: careerGoals.btnSaveGoal });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnDivision, drpDwnVal: drpDwnDivisionData });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnBusinessUnit, drpDwnVal: drpDwnBuData });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnPreference, drpDwnVal: drpDwnPreferenceData });
      verifyIfDisabled({ locator: careerGoals.btnSaveGoal });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnReason, drpDwnVal: drpDwnReasonData });
      //Validate mandatory fields
      verifyIfEnabled({ locator: careerGoals.btnSaveGoal });
      clickActionWait({ locator: careerGoals.btnSaveGoal });
      driverSaveAndVerifyUpdatedMsg();
    });

  it('[ME-151572] Verify whether Duplicate Career Goals records are not allowed',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      //add new career goal
      addNewCareerGoal(drpDwnPositionData, drpDwnPreferenceData, drpDwnReasonData);
      //add duplicate career goal
      addNewCareerGoal(drpDwnPositionData, drpDwnPreferenceData, drpDwnReasonData);
      //Verify unique position message
      verifyVisible({ element: careerGoals.messageBanner });
      verifyIfDisabled({ locator: btnDriverSave });
    });

  it('[ME-137786, ME-151326, ME-151569] Verify Edit Career Goals Functionality',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      //add new career goal
      addNewCareerGoal(drpDwnPositionData, drpDwnPreferenceData, drpDwnReasonData);
      //Verify table data
      verifyLblHaveValue({ locator: careerGoals.divRecordedByRow });
      verifyLblHaveValue({ locator: careerGoals.divDateRow });
      //Edit career goals
      openGoalAction({ action: 'Edit' });
      //Validate input fields
      validateDrpDwnField({ locatorBtn: careerGoals.btnExpandDrpDwnPos, locatorDrpDwn: careerGoals.drpDwnPosition });
      validateDrpDwnField({ locatorBtn: careerGoals.btnExpandDrpDwnDiv, locatorDrpDwn: careerGoals.drpDwnDivision });
      validateDrpDwnField({ locatorBtn: careerGoals.btnExpandDrpDwnBU, locatorDrpDwn: careerGoals.drpDwnBusinessUnit });
      validateDrpDwnField({ locatorBtn: careerGoals.btnExpandDrpDwnPref, locatorDrpDwn: careerGoals.drpDwnPreference });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnPosition, drpDwnVal: drpDwnUpdatedPosData });
      selectItemFrmSrchPicker({ locator: careerGoals.txtFieldCustomer, typeText: customerNameVal.customerName });
      clickActionWait({ locator: careerGoals.btnSaveGoal });
      driverSaveAndVerifyUpdatedMsg();
    });

  it('[ME-151328] Verify Delete Career Goals Record.',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      //Delete career goals
      openGoalAction({ action: 'Delete' });
      //Cancel delete
      clickCancelOnWindowAlert();
      waitSometime(shortWait);
      openGoalAction({ action: 'Delete' });
      //Apply delete
      clickOkOnWindowAlert();
      driverSaveAndVerifyUpdatedMsg();
    });

  it('ME-52191 Verify Career Goals functinal test case',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.btnAddNewCareerGoal });
      verifyLabelUsingMapArray({ map: careerGoalLabelData });
      verifyContains({ locator: preferencesPage.lblPosition, containsText: asterisk });
      verifyContains({ locator: preferencesPage.lblPreference, containsText: asterisk });
      verifyContains({ locator: preferencesPage.lblReason, containsText: asterisk });
    });
  it('ME-137789 Career goals - Regression - UI Testcase',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.btnAddNewCareerGoal });
      verifyToolTips({ locator: preferencesPage.careerGoals.positionToolTip, verifyText: preferencesData.staticData.positionToolTip });
      verifyToolTips({ locator: preferencesPage.careerGoals.preferenceToolTipIcon, verifyText: preferencesData.staticData.preferenceToolTip });
      verifyToolTips({ locator: preferencesPage.careerGoals.reasonToolTipIcon, verifyText: preferencesData.staticData.reasonToolTip });
      //create career goal
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnPosition, drpDwnVal: drpDwnPositionData });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnPreference, drpDwnVal: drpDwnPreferenceData });
      typeDrpDwnWithMachtingText({ locator: careerGoals.drpDwnReason, drpDwnVal: drpDwnReasonData });
      clickActionWait({ locator: careerGoals.btnSaveGoal });
      getText({ locator: preferencesPage.careerGoals.colCreatedDate });
      cy.then(() => {
        documentDate = Cypress.env('inputValue'); //date format from is UI-example-05/10/23
        const parsed = dayjs(documentDate, 'MM/DD/YY');
        expect(parsed.format('MM/DD/YY')).to.eq(documentDate);
      });
    });
});