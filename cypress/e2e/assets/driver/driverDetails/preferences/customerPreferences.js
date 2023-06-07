/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Verify Customer Preferences - Functional Testcase
 Test Cases List
 Authored By : Sanjeev Bandari
 Date : 04-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils, utilities,dateTimeUtils
 Test case Included : [ME-152023] Customer Preferences - Functional Testcase → Preference tab
                    : [ME-152024] Customer Preferences - Verify "Add Customer Preferences " Functionality
                    : [ME-152025] Customer Preferences - Verify Edit Customer Preferences Functionality.
                    : [ME-152026] Customer Preferences -Verify Delete Customer Preferences Record.
                    : [ME-152027] Customer Preferences - Verify Save functionality
                    : [ME-52129] Customer Preference - UAT - UI Testcase
                    : [ME-154731] Customer Preferences -Verify whether the User able to add New Customer preference record.
                    : [ME-154734] Customer Preferences -Verify values of the Customer preference card fields - Name , Reason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { driverSaveAction, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { getMinionValues, viewFullPage, clickAction, typeDrpDwnWithMachtingText, waitSometime, getTDMData, verifyIfEnabled, validateDrpDwnAllOptions, selectItemFromDropDown, toastWithMsg, verifyTextContains, typeText, dropDownIncludesTextClick, clickCancelOnWindowAlertConfirm, clickOkOnWindowAlertConfirm, getText, verifyExists } from '../../../../../utilities/commonUtils/genericUtils';
import preferencesData from '../../../../../testData/assets/driver/driverDetails/preferences/preferencesData.json';
import preferencesPage from '../../../../../pageObjects/assets/driver/driverDetails/preferences/preferencesPage.json';
import commonData from '../../../../../testData/staticData/commonData/commonData.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import { returntodayDateMMDDYY } from '../../../../../utilities/commonUtils/dateTimeUtils';
import { generateRandomNumberByLength } from '../../../../../tdm/lib/utilities/utilities';
import dayjs from 'dayjs';
const { shortWait } = commonData;
const { txtFieldDriverFirstName, txtFieldDriverLastName, drpdwnPhoneNumCountry, txtFieldPhoneNumber } = homePage;
const {
  minionPreferencePreference,
  minionPreferenceReason,
  tdmAddCustomer,
  tdmAddCustomerReq,
  tdmAddDriverReq,
  tdmCustomerData,
  tdmDriverCommonScenario,
  tdmDriverData,
} = preferencesData.expectedData;
const {
  msgUpdated,
} = addDriverData.expectedData;
const {
  addPreferencesDailogTitle,
  drpDwnCountryIndia,
  firstName,
  lastName,
  typeNullVal,
} = addDriverData.userDefinedData;
const {
  userName: usernameText,
  password: passwordText,
} = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM, documentDate, recordByName, customerNameVal, drpDwnPreferenceReason, drpDwnPreferenceReason1, drpDwnPreferenceReason2, drpDwnPreferencePreference, drpDwnPreferencePreference1, drpDwnPreferencePreference2;
describe('Customer Preferences - Functional Testcase [ME-152023][ME-154731] [ME-154734] [ME-152024][ME-152025][ME-152026][ME-152027][ME-137803][ME-137804| Assets - Driver Preferences Tab | Regression', () => {
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
    getMinionValues(minionPreferenceReason, 4).then((resultOptions) => {
      drpDwnPreferenceReason = resultOptions;
      drpDwnPreferenceReason1 = resultOptions[0];
      drpDwnPreferenceReason2 = resultOptions[1];
    });
    getMinionValues(minionPreferencePreference, 3).then((resultOptions) => {
      drpDwnPreferencePreference = resultOptions;
      drpDwnPreferencePreference1 = resultOptions[0];
      drpDwnPreferencePreference2 = resultOptions[1];
    });
  });
  beforeEach(() => {
    viewFullPage();
    loginToApplication({ username: usernameText, password: passwordText });
  });
  it('[ME-152023][ME-154731][ME-154734] Customer Preferences - Functional UI Testcase',
    () => {
      //open driver via search driver and navigating to driver edit page
      cy.log(driverDataTDM.driverCode);
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.addCustomerPreferences });
      //Verify Add Customer Preference pop up should be displayed to add New Customer preference Record.
      verifyTextContains({ locator: preferencesPage.dialogCustomerPreferences, containsText: addPreferencesDailogTitle });
      //Verify Preference PopUp fields should be enabled to input data and should be mandatory
      verifyIfEnabled({ locator: preferencesPage.customerNameSearchInput });
      verifyIfEnabled({ locator: preferencesPage.drpDwnPreferenceTerm });
      verifyIfEnabled({ locator: preferencesPage.drpDwnReason });
      //Verify values of the Customer preference card fields - Name , Reason,Preferences
      typeText({ locator: preferencesPage.customerNameSearchInput, dataText: customerNameVal.customerName });
      verifyTextContains({ locator: preferencesPage.autoSuggestCustomerName, containsText: customerNameVal.customerName });
      drpDwnPreferencePreference.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: preferencesPage.drpDwnPreferenceTerm, locator2: preferencesPage.drpDwnPreferenceTermBtn, optionsArray: drpDwnPreferencePreference });
      drpDwnPreferenceReason.unshift(typeNullVal);
      validateDrpDwnAllOptions({ locator1: preferencesPage.drpDwnReason, locator2: preferencesPage.drpDwnReasonBtn, optionsArray: drpDwnPreferenceReason });
    });

  it('[ME-152024][ME-152025][ME-152026][ME-152027][ME-137803] Customer Preferences - Verify "Add Customer Preferences " Functionality',
    () => {
      //open driver via search driver and navigating to driver edit page
      cy.log(driverDataTDM.driverCode);
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.addCustomerPreferences });
      //Verify "Add Customer Preferences " Functionality
      dropDownIncludesTextClick({ element: preferencesPage.customerNameSearch, typeText: customerNameVal.customerName, containText: customerNameVal.customerName });
      selectItemFromDropDown({ element: preferencesPage.drpDwnPreferenceTerm, ddValue: drpDwnPreferencePreference1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnReason, ddValue: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      verifyTextContains({ locator: preferencesPage.addedRowData, containsText: customerNameVal.customerName });
      verifyTextContains({ locator: preferencesPage.addedRowData, containsText: drpDwnPreferencePreference1 });
      verifyTextContains({ locator: preferencesPage.addedRowData, containsText: drpDwnPreferenceReason1 });
      const date = returntodayDateMMDDYY();
      verifyTextContains({ locator: preferencesPage.addedRowData, containsText: date });
      getText({ locator: preferencesPage.getTestUserName });
      cy.then(() => {
        recordByName = Cypress.env('inputValue');
        verifyTextContains({ locator: preferencesPage.addedRowData, containsText: recordByName });
      });
      verifyTextContains({ locator: preferencesPage.addedRowData, containsText: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.tabGeneral });
      typeText({ locator: txtFieldDriverFirstName, dataText: firstName });
      typeText({ locator: txtFieldDriverLastName, dataText: lastName });
      typeDrpDwnWithMachtingText({ locator: drpdwnPhoneNumCountry, drpDwnVal: drpDwnCountryIndia });
      typeText({ locator: txtFieldPhoneNumber, dataText: generateRandomNumberByLength({ lengthOfNum: 10 }) });
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Verify Edit Customer Preferences Functionality
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.kabobMenuCustPreferences });
      clickAction({ locator: preferencesPage.editButtonCustPreferences });
      selectItemFromDropDown({ element: preferencesPage.drpDwnPreferenceTerm, ddValue: drpDwnPreferencePreference2 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnReason, ddValue: drpDwnPreferenceReason2 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      verifyTextContains({ locator: preferencesPage.addedRowData, containsText: drpDwnPreferencePreference2 });
      verifyTextContains({ locator: preferencesPage.addedRowData, containsText: drpDwnPreferenceReason2 });
      //Verify Delete Customer Preferences Record.
      clickAction({ locator: preferencesPage.kabobMenuCustPreferences });
      clickAction({ locator: preferencesPage.deleteButtonCustPreferences });
      clickCancelOnWindowAlertConfirm();
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.kabobMenuCustPreferences });
      clickAction({ locator: preferencesPage.deleteButtonCustPreferences });
      clickOkOnWindowAlertConfirm();
      toastWithMsg({ message: msgUpdated });
    });

  it('[ME-52129][ME-137804] Customer Preference - UAT - UI Testcase',
    () => {
      //open driver via search driver and navigating to driver edit page
      cy.log(driverDataTDM.driverCode);
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigate to driver preferences tab
      clickAction({ locator: preferencesPage.tabDrvrPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.tabCustomerPreferences });
      waitSometime(shortWait);
      clickAction({ locator: preferencesPage.addCustomerPreferences });
      //Verify Add Customer Preference pop up should be displayed to add New Customer preference Record.
      verifyTextContains({ locator: preferencesPage.dialogCustomerPreferences, containsText: addPreferencesDailogTitle });
      //Verify for Error or Warning messages are populating properly or not
      verifyExists({ element: preferencesPage.nameTooltipIcon });
      verifyExists({ element: preferencesPage.preferenceTermTooltipIcon });
      verifyExists({ element: preferencesPage.reasonTooltipIcon });
      //Verify "Add Customer Preferences " Functionality
      dropDownIncludesTextClick({ element: preferencesPage.customerNameSearch, typeText: customerNameVal.customerName, containText: customerNameVal.customerName });
      selectItemFromDropDown({ element: preferencesPage.drpDwnPreferenceTerm, ddValue: drpDwnPreferencePreference1 });
      selectItemFromDropDown({ element: preferencesPage.drpDwnReason, ddValue: drpDwnPreferenceReason1 });
      clickAction({ locator: preferencesPage.addCustomerPrefrenceConfirm });
      toastWithMsg({ message: msgUpdated });
      waitSometime(shortWait);
      //verify Date field should be in MM/DD/YY Format
      getText({ locator: preferencesPage.custDateCellVal });
      cy.then(() => {
        documentDate = Cypress.env('inputValue'); //date format from is UI-example-05/10/23
        const parsed = dayjs(documentDate, 'MM/DD/YY');
        expect(parsed.format('MM/DD/YY')).to.eq(documentDate);
      });
    });
});