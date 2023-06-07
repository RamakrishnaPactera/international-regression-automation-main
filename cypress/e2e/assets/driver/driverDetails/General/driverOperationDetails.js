/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
Test Driver General - Update Permanent fields _UI TESTCASES
 Test Cases List
 Authored By                    : PruthviRaj,Sanjeev Bandari
 Date                           : 04-05-2023,
 Functions/Calling References   : utilities, genericUtils, loginUtils, resourceUtils
 Test case Included             : ME-151590, ME-152057, ME-151591, ME-151593, ME-152064, ME-152076, ME-152078, ME-152087, ME-152091, ME-152093, ME-152065, ME-152017,
                                : ME-151592, ME-151991, ME-152066, ME-152070, ME-152089, ME-152095, ME-152098, ME-152106
                                : ME-152068, ME-152069, ME-152018, ME-152073, ME-152094, ME-152099, ME-152101, ME-152103, ME-152104, ME-152107- Verify Driver General - Update Permanent fields _UI TESTCASES | Assets - Driver Operation details Tab | Regression
                                : ME-137508 Driver General - Update Permanent fields_Regression Testcase
                                : ME-147808 Validate the Terminal field in Driver General screen| Assets - Driver Add New - Operational Details | Regression
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import { loginToApplication } from '../../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import {
  viewFullPage, toastWithMsg,
  verifyElementTextContains, getTDMData, verifyTextContains, verifyAttrValueContains, dropDownContainsValueCheckBoxSelection,
  selectValueDropDownInputType, clickActionWait, validateDefaultDrpDwn, textClear, getText, getTextFromAttrValue, scrollIntoView,
} from '../../../../../utilities/commonUtils/genericUtils';
import { navigateToDriverAddNewPage, enterDriverMandatoryFields, driverSaveAction, searchDriverWithCode } from '../../../../../utilities/assetUtils/resourceUtilis';
import addDriverData from '../../../../../testData/assets/driver/addDriver/addDriverData.json';
import historyData from '../../../../../testData/assets/driver/driverDetails/history/historyData.json';
import addDriverPage from '../../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import driverCommonPage from '../../../../../pageObjects/assets/driver/driverCommonPage.json';
import sqlData from '../../../../../testData/sqlData/sqlData.json';
const { azureSQLUrl } = Cypress.env('endPointUrl')[Cypress.env('environment')];
const { tabDriverGeneral } = driverCommonPage;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  tdmAddPowerData,
  tdmAddPowerReq,
  tdmAddTrailerData,
  tdmAddTrailerReq,
  tdmPowerCommonScenario,
  tdmTrailerCommonScenario,
} = historyData.staticData;
const {
  valueAttr,
  terminalValue,
  placeHolderAttr,
  placeHolderValue,
} = addDriverData.staticData;
const {
  titleOperationalDetails,
  labelPermanentPower,
  drpDwnDetailsPermanentPower,
  labelPermanentTrailers,
  drpDwnpermanentTrailer,
  drpDwnPermanentTrailerValue,
  drpDwnDetailsTerminal,
  txtTerminal,
} = addDriverPage.operationalDetails;
const {
  operationalDetailslabelValue,
  titleOperationalDetailsValue,
} = addDriverData.userDefinedData;
const {
  msgUpdated,
} = addDriverData.expectedData;
const {
  driverKey,
  drivertestdatabase,
  drivertestuser,
  testDriverPowerQuery,
  testDriverTrailerQuery,
  testportVal,
} = sqlData.sqlData;
let powerDataTDM, trailerDataTDM, trailerDataTDM2, powerCodeValue, trailerCodeValue;
describe('Verify Driver Operational Details - Regression Testcase Preparation and Execution - [ME-151590] [ME-152057] [ME-151591] [ME-151593] [ME-152064] [ME-152076] [ME-152078] [ME-152087] [ME-152091] [ME-152093] [ME-152065], [ME-152017], [ME-152068], [ME-152069], [ME-152018], [ME-152073], [ME-152094], [ME-152099], [ME-152101], [ME-152103], [ME-152104], [ME-152107], [ME-151592], [ME-151991], [ME-152066], [ME-152070], [ME-152089], [ME-152095], [ME-152098], [ME-152106] [ME-137508] [ME-147808]', () => {
  before(() => {
    getTDMData({ dataType: tdmAddPowerData, dataCondition: tdmAddPowerReq, dataScenario: tdmPowerCommonScenario });
    cy.then(() => {
      powerDataTDM = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmAddTrailerData, dataCondition: tdmAddTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM = Cypress.env('inputVal');
    });
    getTDMData({ dataType: tdmAddTrailerData, dataCondition: tdmAddTrailerReq, dataScenario: tdmTrailerCommonScenario });
    cy.then(() => {
      trailerDataTDM2 = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-151590 ME-152057 ME-151591 ME-151593 ME-152064 ME-152076 ME-152078 ME-152087 ME-152091 ME-152093 ME-152065, ME-152017, ME-152068, ME-152069, ME-152018, ME-152073, ME-152094, ME-152099, ME-152101, ME-152103, ME-152104, ME-152107, ME-151592, ME-151991, ME-152066, ME-152070, ME-152089, ME-152095, ME-152098, ME-152106, ME-137508- Verify Driver Operational Details - Regression Testcase | Assets - Driver Add New - Operational Details | Regression',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p1'],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      const { driverCode } = enterDriverMandatoryFields();
      verifyElementTextContains({ locator: titleOperationalDetails, verifyText: titleOperationalDetailsValue });
      //verifying Operational Details Permanent Power
      validateDefaultDrpDwn({ element: labelPermanentPower, drpdwnlocator: drpDwnDetailsPermanentPower, verifyText: operationalDetailslabelValue[2] });
      selectValueDropDownInputType({ element: drpDwnDetailsPermanentPower, ddValue: powerDataTDM.powerCode });
      verifyAttrValueContains({ locator: drpDwnDetailsPermanentPower, attribute: valueAttr, verifyText: powerDataTDM.powerCode });
      //verifying Operational Details Permanent trailer
      validateDefaultDrpDwn({ element: labelPermanentTrailers, drpdwnlocator: drpDwnpermanentTrailer, verifyText: operationalDetailslabelValue[3] });
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM.trailerCode });
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM2.trailerCode });
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM.trailerCode });
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM2.trailerCode });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });

      getTextFromAttrValue({ locator: drpDwnDetailsPermanentPower, attr: valueAttr });
      cy.then(() => {
        powerCodeValue = Cypress.env('textValue');
      });
      //Validating DB*
      cy.url().then((text) => {
        const expectedValue = powerCodeValue;
        cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: `${testDriverPowerQuery}${driverCode}'` }).then((results) => {
          cy.log('Selected record ' + JSON.stringify(results));
          const actualValue = results[0].power;
          expect(actualValue).to.contain(expectedValue);
        });
      });

      getText({ locator: drpDwnPermanentTrailerValue });
      cy.then(() => {
        trailerCodeValue = Cypress.env('inputValue');
      });
      //Validating DB*
      cy.url().then((text) => {
        const expectedValue = trailerCodeValue;
        cy.task('azureSQL', { user: drivertestuser, password: driverKey, server: azureSQLUrl, portVal: testportVal, database: drivertestdatabase, query: `${testDriverTrailerQuery}${driverCode}'` }).then((results) => {
          cy.log('Selected record ' + JSON.stringify(results));
          const actualValue1 = results[0].trailerCode;
          const actualValue2 = results[1].trailerCode;
          const stringArray = expectedValue.split(', ');
          const firstString = stringArray[0];
          const secondString = stringArray[1];
          expect(actualValue1).to.contains(firstString);
          expect(actualValue2).to.contains(secondString);
        });
      });

      //open driver via search driver and navigating to Driver General page
      searchDriverWithCode({ driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      //verifying Operational Details Permanent Power
      verifyAttrValueContains({ locator: drpDwnDetailsPermanentPower, attribute: valueAttr, verifyText: powerDataTDM.powerCode });
      //verifying Operational Details Permanent trailer
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM.trailerCode });
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM2.trailerCode });

      //removing dropdown value- Permanent Power
      textClear({ locator: drpDwnDetailsPermanentPower });
      //removing dropdown- the Permanent trailer
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM.trailerCode });
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM2.trailerCode });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //verifying the empty dropdown options- Permanent Power and Permanent trailer
      validateDefaultDrpDwn({ element: labelPermanentPower, drpdwnlocator: drpDwnDetailsPermanentPower, verifyText: operationalDetailslabelValue[2] });
      validateDefaultDrpDwn({ element: labelPermanentTrailers, drpdwnlocator: drpDwnpermanentTrailer, verifyText: operationalDetailslabelValue[3] });

      //editing the dropdown options- Permanent Power and Permanent trailer
      selectValueDropDownInputType({ element: drpDwnDetailsPermanentPower, ddValue: powerDataTDM.powerCode });
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM.trailerCode });
      dropDownContainsValueCheckBoxSelection({ element: drpDwnpermanentTrailer, ddValue: trailerDataTDM2.trailerCode });
      //Save Driver
      driverSaveAction();
      toastWithMsg({ message: msgUpdated });
      //verifying Operational Details Permanent Power
      verifyAttrValueContains({ locator: drpDwnDetailsPermanentPower, attribute: valueAttr, verifyText: powerDataTDM.powerCode });
      //verifying Operational Details Permanent trailer
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM.trailerCode });
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM2.trailerCode });
      //open driver via search driver and navigating to Driver General page
      searchDriverWithCode({ driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      //verifying Operational Details Permanent Power
      verifyAttrValueContains({ locator: drpDwnDetailsPermanentPower, attribute: valueAttr, verifyText: powerDataTDM.powerCode });
      //verifying Operational Details Permanent trailer
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM.trailerCode });
      verifyTextContains({ locator: drpDwnPermanentTrailerValue, containsText: trailerDataTDM2.trailerCode });
    });

  it('ME-147808 Validate the Terminal field in Driver General screen| Assets - Driver Add New - Operational Details | Regression',
    {
      tags: ['@assets', '@resources', '@driver', '@addNewDriver', '@driverGeneral', '@p2'],
    },
    () => {
      //Navigating to Driver - Add New page
      navigateToDriverAddNewPage();
      //Creating Driver with Mandatory fields and General Information
      enterDriverMandatoryFields();
      scrollIntoView({ locator: txtTerminal });
      verifyAttrValueContains({ locator: drpDwnDetailsTerminal, attribute: placeHolderAttr, verifyText: placeHolderValue });
      selectValueDropDownInputType({ element: drpDwnDetailsTerminal, ddValue: terminalValue });
      verifyAttrValueContains({ locator: drpDwnDetailsTerminal, attribute: valueAttr, verifyText: terminalValue });
      driverSaveAction();
    });
});