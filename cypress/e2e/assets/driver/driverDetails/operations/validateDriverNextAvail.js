/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Driver Availability: Functional & UI Testcases
Test Cases List
Authored By : Shashi Jaiswal
Date : 12-05-2023,
Functions/Calling References : genericUtils, loginUtils, resourceUtils
Test case Included:
ME-154799 : Verify the Driver Next Available Details
ME-154801 : Verify the Availability Calculated Date & Time Field
ME-154802 : Verify Availability Calculated City & State Field
ME-154803 : Verify Availability Driver Preferred Date & Time Field
ME-154805 : Verify Availability Driver Preferred City & State Field
ME-137499 : Driver Availability: Regression Functional & UI Testcases
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import { typeText, verifyAttrValueContains, verifyVisible, viewFullPage, getTDMData, verifyValue, clearText } from '../../../../../utilities/commonUtils/genericUtils';
import operationsPage from '../../../../../pageObjects/assets/driver/driverDetails/operations/operationsPage.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import { getTodayDatePlusOneMMDD } from '../../../../../utilities/commonUtils/dateTimeUtils';

const { searchCity, placeholder, value } = generalData.expectedData;
const { tdmDriverCommonScenario, tdmDriverData, tdmAddDriverReq } = addDriverData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const { nextAvail } = operationsPage;
let driverDataTDM;

describe('Driver Availability: Functional & UI Testcases', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
  });

  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('[ME-154799] [ME-137499] Verify the Driver Next Available Details',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //verify input fields exist
      verifyVisible({ element: nextAvail.txtCalcDt });
      verifyVisible({ element: nextAvail.txtCalcTm });
      verifyVisible({ element: nextAvail.txtCalcCitySt });
      verifyVisible({ element: nextAvail.txtPrefDt });
      verifyVisible({ element: nextAvail.txtPrefTm });
      verifyVisible({ element: nextAvail.txtPrefCity });
    });

  it('[ME-154801, ME-154802, ME-154803, ME-154805, ME-137499] Verify Calculated & Preferred Field',
    () => {
      //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Verify Calculated Date & Time Field
      const calcDate = getTodayDatePlusOneMMDD();
      typeText({ locator: nextAvail.txtCalcDt, dataText: calcDate });
      verifyAttrValueContains({ locator: nextAvail.txtCalcDt, attribute: value, verifyText: calcDate });
      clearText({ locator: nextAvail.txtCalcTm });
      verifyValue({ locator: nextAvail.txtCalcTm, value: '' });
      //Verify Calculated City & State Field
      verifyAttrValueContains({ locator: nextAvail.txtCalcCitySt, attribute: placeholder, verifyText: searchCity });
      verifyValue({ locator: nextAvail.txtCalcCitySt, value: '' });
      //Verify Preferred Date & Time Field
      typeText({ locator: nextAvail.txtPrefDt, dataText: calcDate });
      verifyAttrValueContains({ locator: nextAvail.txtPrefDt, attribute: value, verifyText: calcDate });
      clearText({ locator: nextAvail.txtPrefTm });
      verifyValue({ locator: nextAvail.txtPrefTm, value: '' });
      //Verify Preferred City & State Field
      verifyAttrValueContains({ locator: nextAvail.txtPrefCity, attribute: placeholder, verifyText: searchCity });
      verifyValue({ locator: nextAvail.txtPrefCity, value: '' });
    });
});