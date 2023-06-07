/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Test Business Scenario for P2 - Pull in driver time off details : UAT TestCase
Test Business Scenario for P2 - Driver Messenger Service, Utilization and HOS Summary : UAT TestCase
Test Business Scenario for P2 - Driver General Information : Application is allowing Duplicate entries : UAT TestCase
 Test Cases List
 Authored By                    : PruthviRaj
 Date                           : 11-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             : [ME-154385] [ME-154384] [ME-154382] [ME-154381] [ME-154380] [ME-154785] [ME-154786] [ME-154787] [ME-41612] [ME-137483]-Test Business Scenario for P2 - Pull in driver time off details : UAT TestCase | Assets - Driver Time Off Details Tab | Regression
                                : [ME-137489] Pull in driver time off details P2 : Regression TestCase
                                : [ME-137477] Driver General Information : Application is allowing Duplicate entries : Regression TestCase
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { viewFullPage, toastWithMsg, getTDMData, verifyTextContains, clickAction, verifyVisible, verifyTableColumnsHeaders, getMinionValues, typeText, clearText } from '../../../../../utilities/commonUtils/genericUtils';
import { driverSaveAction, searchDriverWithCode, driverAddPlannedTimeOff, navigateToDriverAddNewPage, enterDriverMandatoryFields, addAddress } from '../../../../../utilities/assetUtils/resourceUtilis';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import operationsTabPage from '../../../../../pageObjects/assets/driver/addDriver/operationsTabPage.json';
import operationsTabData from '../../../../../testData/assets/driver/addDriver/operationsTabData.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import { verifyIndustriesTblValues } from '../../../../../utilities/customerUtils/customerUtils';
import driverGeneralData from '../../../../../testData/assets/driver/driverDetails/general/generalData.json';
import homePage from '../../../../../pageObjects/homePage/homePage.json';
const { tabDriverGeneral, tabDriverOperations, driverOperationsTimeOff } = driverCommonPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  txtFieldAddDriverCode,
} = homePage;
const {
  tdmAddDriverReq,
  tdmDriverCommonScenario,
  tdmDriverData,
} = historyData.staticData;
const {
  defaultAddressType,
} = driverGeneralData.staticData;
const {
  colHeaderTimeOff,
  timeOffEmptyTable,
  timeOffRowData,
} = operationsTabPage.timeOff;
const {
  tablemessageDriver,
  tableHOSSummary,
  tableUtilization,
} = operationsTabPage;
const {
  driverTimeOffEmptyTable,
} = operationsTabData.expectedData;
const {
  colHeaderTimeOffData,
  colHeaderUtilizationData,
} = operationsTabData.staticData;
const {
  msgUpdated,
  msgDuplicateDriverCode,
} = addDriverData.expectedData;
let driverDataTDM, drpDwnDriverTimeOffType;

describe('Verify Driver Time Off Details - Regression Testcase Preparation and Execution -[ME-154385] [ME-154384] [ME-154382] [ME-154381] [ME-154380] [ME-154785] [ME-154786] [ME-154787] [ME-41612] [ME-137483] [ME-156543][ME-156548] [ME-137489] [ME-137489] [ME-137477]', () => {
  before(() => {
    getMinionValues(addDriverData.staticData.minionDriverGeneralTimeOff, 5).then(resultOptions => {
      drpDwnDriverTimeOffType = resultOptions[0];
    });
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

  it('ME-154385 ME-154384 ME-154382 ME-154381 ME-154380 ME-154785 ME-154786 ME-154787 ME-137483,ME-156543,ME-156548 ME-137489- Test Business Scenario for P2 - Pull in driver time off details : UAT TestCase | Assets - Driver Time Off Details Tab | Regression',
    {
      tags: ['@assets', '@driver', '@addNewDriver', '@driverGeneral', '@driverOperations', '@p2'],
    },
    () => {
      //Navigating to Driver
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      //Navigating to Operations tab
      clickAction({ locator: tabDriverOperations });

      //verifying the Time Off table
      verifyVisible({ element: driverOperationsTimeOff });
      clickAction({ locator: driverOperationsTimeOff });
      verifyTableColumnsHeaders({ locator: colHeaderTimeOff, columnNames: colHeaderTimeOffData });
      //verifying the Time Off empty table
      verifyTextContains({ locator: timeOffEmptyTable, containsText: driverTimeOffEmptyTable });

      //verifying the Driver Operations Tab Messenger Service table
      verifyVisible({ element: tablemessageDriver });

      //verifying the Driver Operations Tab HOS Summar table
      verifyVisible({ element: tableHOSSummary });

      //verifying the Driver Operations Tab Utilization table
      verifyVisible({ element: tableUtilization });
      clickAction({ locator: tableUtilization });
      verifyTableColumnsHeaders({ locator: colHeaderTimeOff, columnNames: colHeaderUtilizationData });

      //Navigating to general tab
      clickAction({ locator: tabDriverGeneral });
      //create New Planned Time Off
      const { startDate, endDate, notes } = driverAddPlannedTimeOff({ driverTimeOffType: drpDwnDriverTimeOffType });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //Navigating to Operations tab
      clickAction({ locator: tabDriverOperations });
      clickAction({ locator: driverOperationsTimeOff });
      //verifying the Time Off table data
      const driverOperationsTimeOffTable = new Map([
        [colHeaderTimeOffData[0], drpDwnDriverTimeOffType],
        [colHeaderTimeOffData[1], startDate],
        [colHeaderTimeOffData[2], endDate],
        [colHeaderTimeOffData[3], notes],
      ]);
      verifyIndustriesTblValues({ mapName: driverOperationsTimeOffTable, locator: timeOffRowData });
    });

  it('ME-41612, ME-137477 -Test Business Scenario for P2 - Driver General Information : Application is allowing Duplicate entries : UAT TestCase| Assets - Driver Time Off Details Tab | Regression',
    {
      tags: ['@assets', '@driver', '@addNewDriver', '@driverGeneral', '@p2'],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      enterDriverMandatoryFields(false);
      clearText({ locator: txtFieldAddDriverCode });
      typeText({ locator: txtFieldAddDriverCode, dataText: driverDataTDM.driverCode });
      addAddress({ typeOfAddress: defaultAddressType });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgDuplicateDriverCode });
    });
});