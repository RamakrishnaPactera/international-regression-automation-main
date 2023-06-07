/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Test Driver Status Details - Functional TestCase
Test Cases List
Authored By : Shashi Jaiswal
Date : 12-05-2023,
Functions/Calling References : genericUtils, loginUtils, resourceUtils
Test case Included:
ME-154595 : Verify the Driver Status Details
ME-154597, ME-156540 : Verify Driver Operations Operating Status Field
ME-154599, ME-156540 : Verify the Driver Operations Next Reset Field
ME-154600 : Verify the Driver Operations Next Route Field
ME-154603 : Verify the Driver Operations Remaining hours Field
ME-137443 : Driver Status Details-Additional Details P2 : RegressionTestCase
ME-57964  : Test New Driver -Operations - Grey Out Assigned Fields_UI Testcases
ME-158180 : Test Existing Driver -Operations - Grey Out Assigned Fields_UI Testcases
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { driverSaveAndVerifyUpdatedMsg, enterDriverMandatoryFields, searchDriverWithCode, navigateToDriverAddNewPage } from '../../../../../utilities/assetUtils/resourceUtilis';
import { clickActionWait, getMinionValues, typeText, verifyAttrValueContains, verifyVisible, viewFullPage, getTDMData, verifyElementDoesNotHaveValue, typeDrpDwnWithMachtingText, verifyValue, clearText, verifyReadOnly } from '../../../../../utilities/commonUtils/genericUtils';
import operationsPage from '../../../../../pageObjects/assets/driver/driverDetails/operations/operationsPage.json';
import generalData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import { getTodayDatePlusOneMMDD } from '../../../../../utilities/commonUtils/dateTimeUtils';

const { attrDataReadonly, attrDisabled, boolTrue } = generalData.staticData;
const { tdmDriverCommonScenario, tdmDriverData, tdmAddDriverReq, minionDrpDwnDriverStatus } = addDriverData.staticData;
const { tabDriverGeneral, tabDriverOperations } = driverCommonPage;
const { drpDwnStatus } = addDriverPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
let driverDataTDM, driverStatusData1, driverStatusData2;

const verifyDisabledFields = () => {
  verifyVisible({ element: operationsPage.divAssignPower });
  verifyVisible({ element: operationsPage.divAssignTrailer });
  verifyReadOnly({ locator: operationsPage.divAssignPower, condition: boolTrue });
  verifyAttrValueContains({ locator: operationsPage.btnAssignTrailer, attribute: attrDisabled, verifyText: attrDisabled });
};

describe('Driver Status Details - Functional TestCase [ME-137443, ME-156540]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    getMinionValues(minionDrpDwnDriverStatus, 2).then(resultOptions => {
      driverStatusData1 = resultOptions[0];
      driverStatusData2 = resultOptions[1];
    });
  });

  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('[ME-154595, ME-154597, ME-137443, ME-156540] Verify the Driver Status & Operating status Details',
    () => {
    //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      verifyVisible({ element: operationsPage.txtDutyStatus });
      verifyVisible({ element: operationsPage.txtRemHours });
      verifyVisible({ element: operationsPage.txtNxtReset });
      verifyVisible({ element: operationsPage.divNxtRoute });
      verifyVisible({ element: operationsPage.divAssignPower });
      verifyVisible({ element: operationsPage.divAssignTrailer });
      verifyVisible({ element: operationsPage.divDaysInService });
      //verify Operating status
      clickActionWait({ locator: tabDriverGeneral });
      typeDrpDwnWithMachtingText({ locator: drpDwnStatus, drpDwnVal: driverStatusData1 });
      verifyAttrValueContains({ locator: drpDwnStatus, attribute: 'value', verifyText: driverStatusData1 });
      typeDrpDwnWithMachtingText({ locator: drpDwnStatus, drpDwnVal: driverStatusData2 });
      verifyAttrValueContains({ locator: drpDwnStatus, attribute: 'value', verifyText: driverStatusData2 });
    });

  it('[ME-154599, ME-154600, ME-154603, ME-137443] Verify Next reset, Next route & Remaining hour field',
    () => {
    //open driver via search driver and navigating to driver edit page
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Verify next reset field
      const resetDate = getTodayDatePlusOneMMDD();
      typeText({ locator: operationsPage.txtNxtReset, dataText: resetDate });
      verifyAttrValueContains({ locator: operationsPage.txtNxtReset, attribute: 'value', verifyText: resetDate });
      //Verify next route field
      verifyElementDoesNotHaveValue({ locator: operationsPage.divNxtRoute });
      verifyAttrValueContains({ locator: operationsPage.divNxtRoute, attribute: attrDataReadonly, verifyText: 'true' });
      //verify remaining hours field
      typeText({ locator: operationsPage.txtRemHours, dataText: 5 });
      verifyAttrValueContains({ locator: operationsPage.txtRemHours, attribute: 'type', verifyText: 'number' });
      clearText({ locator: operationsPage.txtRemHours });
      verifyValue({ locator: operationsPage.txtRemHours, value: '' });
    });

  it('[ME-57964, ME-158180] Test New & Existing Driver -Operations - Grey Out Assigned Fields_UI Testcases',
    {
      tags: ['@assets', '@resources', '@driver', '@p2'],
    },
    () => {
      //Create driver scenario
      navigateToDriverAddNewPage();
      const { driverCode } = enterDriverMandatoryFields(false);
      driverSaveAndVerifyUpdatedMsg();
      clickActionWait({ locator: tabDriverOperations });
      verifyDisabledFields();
      //Search driver scenario
      searchDriverWithCode({ driverCode });
      verifyDisabledFields();
    });
});