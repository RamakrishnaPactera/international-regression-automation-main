/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Verify Commodity Preferences - Functional Testcase
 Test Cases List
 Authored By : Sanjeev Bandari
 Date : 05-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils, utilities,dateTimeUtils
 Test case Included : [ME-152349] Commodity Preference - UAT - UI Validations Testcase
                    : [ME-152352][ME-156569] Commodity Preference - Verify "Add Commodity Preferences " Functionality
                    : [ME-152353] Commodity Preference - Verify Edit Commodity Preferences Functionality
                    : [ME-152355] Commodity Preference - Verify Delete Commodity Preferences Record..
                    : [ME-152351] Commodity Preference - Verify for No duplicate Commodity values
                    : [ME-52131]  Commodity Preference - UAT - UI Testcase
                    : [ME-154736] Commodity Preference - Verify user can be able to access Commodity Preference PopUp and  fields should be enabled to input data.
                    : [ME-154738] Commodity Preference - Verify user can be able to access Commodity Preference PopUp and  fields should be mandatory fields.
                    : [ME-154739] Commodity Preference - Verify values of the Commodity preference card fields - Commodity , Preference and Reason
                    : [ME-154744] Commodity Preference - Verify Commodity field in Commodity Preference
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { driverSaveAction, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { getMinionValues, viewFullPage, clickAction, waitSometime, getTDMData, verifyIfEnabled, validateDrpDwnAllOptions, selectItemFromDropDown, toastWithMsg, verifyTextContains, clickCancelOnWindowAlertConfirm, clickOkOnWindowAlertConfirm, getText, verifyIfDisabled, verifyExists } from '../../../../../utilities/commonUtils/genericUtils';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import { returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import dayjs from 'dayjs';
const { shortWait } = commonData;
const {
  errorMessageCommodityBanner,
  minionDriverPreferenceCommodity,
  minionDriverPreferenceCommodityReason,
  minionPreferencePreference,
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
} = preferencesData.expectedData;
const {
  msgUpdated,
} = addDriverData.expectedData;
const {
  addCommodityDailogTitle,
  typeNullVal,
} = addDriverData.userDefinedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM, recordByName, drpDwnPreferenceReason, drpDwnPreferenceReason1, drpDwnPreferencePreference1, drpDwnPreferencePreference, drpDwnPreferencePreference2, drpDwnPreferenceCommodity, drpDwnPreferenceCommodity1, drpDwnPreferenceCommodity2;
describe('Commodity Preferences - Functional Testcase [ME-152349][ME-154736][ME-154738][ME-154739][ME-154744][ME-152352][ME-152353][ME-152355][ME-152351][ME-52131][ME-156569][ME-137800][ME-137802] | Assets - Driver Preferences Tab | Regression', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    getMinionValues(minionDriverPreferenceCommodity, 4).then((resultOptions) => {
      drpDwnPreferenceCommodity = resultOptions;
      drpDwnPreferenceCommodity1 = resultOptions[0];
      drpDwnPreferenceCommodity2 = resultOptions[1];
    });
    getMinionValues(minionPreferencePreference, 3).then((resultOptions) => {
      drpDwnPreferencePreference = resultOptions;
      drpDwnPreferencePreference1 = resultOptions[0];
      drpDwnPreferencePreference2 = resultOptions[1];
    });
    getMinionValues(minionDriverPreferenceCommodityReason, 1).then((resultOptions) => {
      drpDwnPreferenceReason = resultOptions;
      drpDwnPreferenceReason1 = resultOptions[0];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('[ME-152349][ME-154736][ME-154738][ME-154739][ME-154744] Commodity Preference - UAT - UI Validations Testcase',
    () => {
      //open driver via search driver and navigating to driver edit page
      cy.log(driverDataTDM.driverCode);
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.addcommodityPreferenceBtn });
      //Verify Add Commodity Preference pop up should be displayed to add New Commodity preference Record.
      verifyTextContains({ locator: preferencesPage.dialogCommodityPreferences, containsText: addCommodityDailogTitle });
      //Verify User can be able to access Commodity Preference PopUp and Below fields should be enabled to input data.
      verifyIfEnabled({ locator: preferencesPage.drpDwnCommodity });
      verifyIfEnabled({ locator: preferencesPage.drpDwnCommodityPreference });
      verifyIfEnabled({ locator: preferencesPage.drpDwnCommodityReason });
      //verify Without providing Commodity fields in the commodity preferences popup , Add Commodity preferences button should not be enabled.
      verifyIfDisabled({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      //Verify values of the Commodity preference card fields - Commodity , Preference and Reason
      drpDwnPreferenceCommodity.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: preferencesPage.drpDwnCommodity, locator2: preferencesPage.drpDwnCommodityBtn, optionsArray: drpDwnPreferenceCommodity });
      drpDwnPreferencePreference.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: preferencesPage.drpDwnCommodityPreference, locator2: preferencesPage.drpDwnCommodityPreferenceBtn, optionsArray: drpDwnPreferencePreference });
      drpDwnPreferenceReason.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: preferencesPage.drpDwnCommodityReason, locator2: preferencesPage.drpDwnCommodityReasonBtn, optionsArray: drpDwnPreferenceReason });
    });
  it('[ME-152352][ME-152353][ME-152355][ME-156569][ME-137800] Customer Preferences - Verify "Add ,Edit and Delete Customer Preferences " Functionality',
    () => {
      //open driver via search driver and navigating to driver edit page
      cy.log(driverDataTDM.driverCode);
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.addcommodityPreferenceBtn });
      //Verify "Add Commodity Preferences " Functionality
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodity, ddValue: drpDwnPreferenceCommodity1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityPreference, ddValue: drpDwnPreferencePreference1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityReason, ddValue: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      waitSometime(shortWait);
      verifyTextContains({ locator: preferencesPage.tblCommodityAddRowData, containsText: drpDwnPreferenceCommodity1 });
      verifyTextContains({ locator: preferencesPage.tblCommodityAddRowData, containsText: drpDwnPreferencePreference1 });
      verifyTextContains({ locator: preferencesPage.tblCommodityAddRowData, containsText: drpDwnPreferenceReason1 });
      const date = returntodayDateMMDDYY();
      verifyTextContains({ locator: preferencesPage.tblCommodityAddRowData, containsText: date });
      getText({ locator: preferencesPage.getTestUserName });
      cy.then(() => {
        recordByName = Cypress.env('inputValue');
        verifyTextContains({ locator: preferencesPage.tblCommodityAddRowData, containsText: recordByName });
      });
      verifyTextContains({ locator: preferencesPage.tblCommodityAddRowData, containsText: drpDwnPreferenceReason1 });
      //Verify Edit commodity Functionality
      clickAction({ locator: preferencesPage.kabobMenuCommodityPreferences });
      clickAction({ locator: preferencesPage.editButtonCustPreferences });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodity, ddValue: drpDwnPreferenceCommodity2 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityPreference, ddValue: drpDwnPreferencePreference2 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityReason, ddValue: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      verifyTextContains({ locator: preferencesPage.tblCommodityAddRowData, containsText: drpDwnPreferenceCommodity2 });
      verifyTextContains({ locator: preferencesPage.tblCommodityAddRowData, containsText: drpDwnPreferencePreference2 });
      verifyTextContains({ locator: preferencesPage.tblCommodityAddRowData, containsText: drpDwnPreferenceReason1 });
      //Verify Delete Commodity Preferences Record.
      clickAction({ locator: preferencesPage.kabobMenuCommodityPreferences });
      clickAction({ locator: preferencesPage.deleteButtonCustPreferences });
      clickCancelOnWindowAlertConfirm();
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.kabobMenuCommodityPreferences });
      clickAction({ locator: preferencesPage.deleteButtonCustPreferences });
      clickOkOnWindowAlertConfirm();
    });
  it('[ME-152351][ME-137802] Commodity Preference - Verify for No duplicate Commodity values',
    () => {
      //open driver via search driver and navigating to driver edit page
      cy.log(driverDataTDM.driverCode);
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.addcommodityPreferenceBtn });
      //Verify "Add Commodity Preferences " Functionality
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodity, ddValue: drpDwnPreferenceCommodity1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityPreference, ddValue: drpDwnPreferencePreference1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityReason, ddValue: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.addcommodityPreferenceBtn });
      //Verify for No duplicate Commodity values
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodity, ddValue: drpDwnPreferenceCommodity1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityPreference, ddValue: drpDwnPreferencePreference1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityReason, ddValue: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      waitSometime(shortWait);
      verifyTextContains({ locator: preferencesPage.errorMessageCommodityTableBanner, containsText: errorMessageCommodityBanner });
    });
  it('[ME-52131] Commodity Preference - UAT - UI Testcase',
    () => {
      //open driver via search driver and navigating to driver edit page
      cy.log(driverDataTDM.driverCode);
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.addcommodityPreferenceBtn });
      //Verify Add Commodity Preference pop up should be displayed to add New Commodity preference Record.
      verifyTextContains({ locator: preferencesPage.dialogCommodityPreferences, containsText: addCommodityDailogTitle });
      //Verify User can be able to access Commodity Preference PopUp and Below fields should be enabled to input data.
      verifyExists({ element: preferencesPage.commodityTooltipIcon });
      verifyExists({ element: preferencesPage.preferenceTooltipIcon });
      verifyExists({ element: preferencesPage.reasonTooltipIcon });
      //Verify "Add Commodity Preferences " Functionality
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodity, ddValue: drpDwnPreferenceCommodity1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityPreference, ddValue: drpDwnPreferencePreference1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnCommodityReason, ddValue: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      waitSometime(shortWait);
      getText({ locator: preferencesPage.commodityDateCellVal });
      cy.then(() => {
        const documentDate = Cypress.env('inputValue'); //date format from is UI-example-05/10/23
        const parsed = dayjs(documentDate, 'MM/DD/YY');
        expect(parsed.format('MM/DD/YY')).to.eq(documentDate);
      });
    });
});