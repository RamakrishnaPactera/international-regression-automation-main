/*----------------------------------------------------------------------------------------------------------------------------------------------
Test Trailer General - Update Permanent fields_testcase
 Test Cases List
 Authored By                   : Pruthvirajg
 Date                          : 31-05-2023,
 Functions/Calling References  : dateTimeUtils, staticAssets, utilities, genericUtils, loginUtils, resourceUtilis
 Test case Included            : [ME-160785, ME-160789, ME-160795, ME-160799, ME-160801, ME-160803, ME-160815, ME-161003, ME-161004, ME-161006, ME-161007, ME-161010, ME-161012, ME-161014, ME-161016, ME-161020, ME-161102, ME-161104, ME-161105, ME-161106, ME-161108, ME-161110]
---------------------------------------------------------------------------------------------------------------------------------------------*/
import { addPower, createTrailerWithMandatoryFields, navigateToAddTrailer, saveTrailer, searchTrailerWithCode } from '../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, dropDownContainsValueCheckBoxSelection, generateRandomAlphaNumByLength, getTDMData, selectValueDropDownInputType, textClear, validateDefaultDrpDwn, verifyAttrValueContains, verifyElementTextContains, verifyIfEnabled, verifyTextContains, viewFullPage, waitSometime } from '../../../../utilities/commonUtils/genericUtils';
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import trailerPage from '../../../../pageObjects/assets/trailer/trailerPage.json';
import trailerDetailsData from '../../../../testData/assets/trailer/trailerDetailsData.json';
import addDriverData from '../../../../testData/assets/driver/addDriver/addDriverData.json';
import commonData from '../../../../testData/staticData/commonData/commonData.json';

const { titleOperationalDetails, labelPermanentDrivers, labelPermanentPower, txtFieldPermanentPower, drpdwnPermanentDriverBtn, drpdwnpermanentDriverCodes } = trailerPage.operationalDetails;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const {
  titlOperationalDetails,
  valueAttr,
} = trailerDetailsData.staticData;
const {
  permanentDriver,
  permanentPower,
} = trailerDetailsData.expectedData;
const {
  btnTrailerSave,
  tabTrailerGeneral,
} = trailerPage;
const {
  tdmDriverCommonScenario,
  tdmDriverData,
  tdmAddDriverReq,
} = addDriverData.staticData;
const { shortWait } = commonData;
let driverDataTDM, driverDataTDM2, powerCode, trailerCode;

describe('Test Power unit Appearance - UI and Functional Testcases [ME-160785, ME-160789, ME-160795, ME-160799, ME-160801, ME-160803, ME-160815, ME-161003, ME-161004, ME-161006, ME-161007, ME-161010, ME-161012, ME-161014, ME-161016, ME-161020, ME-161102, ME-161104, ME-161105, ME-161106, ME-161108, ME-161110]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM2 = Cypress.env('inputVal');
    });
  });
  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });
  it('ME-160785, ME-160789, ME-160795, ME-160799, ME-160801, ME-160803, ME-160815, ME-161003, ME-161004, ME-161006, ME-161007, ME-161010, ME-161012, ME-161014, ME-161016, ME-161020, ME-161102, ME-161104, ME-161105, ME-161106, ME-161108, ME-161110 - Test Power unit Appearance - UI and Functional Testcases > Resources |  Assets - Power | Regression',
    {
      tags: ['@assets', '@resources', '@power', '@p2'],
    }, () => {
      //Add power with mandatory fields and search with same
      powerCode = addPower();

      navigateToAddTrailer();
      trailerCode = generateRandomAlphaNumByLength({ lengthOfString: 5 });
      createTrailerWithMandatoryFields(trailerCode);
      verifyIfEnabled({ locator: btnTrailerSave });
      verifyElementTextContains({ locator: titleOperationalDetails, verifyText: titlOperationalDetails });

      //verifying Operational Details Permanent driver
      validateDefaultDrpDwn({ element: labelPermanentDrivers, drpdwnlocator: drpdwnPermanentDriverBtn, verifyText: permanentDriver });
      dropDownContainsValueCheckBoxSelection({ element: drpdwnpermanentDriverCodes, ddValue: driverDataTDM.driverCode });
      dropDownContainsValueCheckBoxSelection({ element: drpdwnpermanentDriverCodes, ddValue: driverDataTDM2.driverCode });
      verifyTextContains({ locator: drpdwnPermanentDriverBtn, containsText: driverDataTDM.driverCode });
      verifyTextContains({ locator: drpdwnPermanentDriverBtn, containsText: driverDataTDM2.driverCode });

      //verifying Operational Details Permanent Power
      validateDefaultDrpDwn({ element: labelPermanentPower, drpdwnlocator: txtFieldPermanentPower, verifyText: permanentPower });
      selectValueDropDownInputType({ element: txtFieldPermanentPower, ddValue: powerCode });
      verifyAttrValueContains({ locator: txtFieldPermanentPower, attribute: valueAttr, verifyText: powerCode });
      //Save Trailer
      saveTrailer();

      //open trailer via search trailer and navigating to trailer General page
      searchTrailerWithCode({ trailerCode });
      waitSometime(shortWait);
      clickAction({ locator: tabTrailerGeneral });
      //verifying Operational Details Permanent Power
      verifyAttrValueContains({ locator: txtFieldPermanentPower, attribute: valueAttr, verifyText: powerCode });
      //verifying Operational Details Permanent driver
      verifyTextContains({ locator: drpdwnPermanentDriverBtn, containsText: driverDataTDM.driverCode });
      verifyTextContains({ locator: drpdwnPermanentDriverBtn, containsText: driverDataTDM2.driverCode });

      //removing dropdown value- Permanent Power
      textClear({ locator: txtFieldPermanentPower });
      //removing dropdown- the Permanent driver
      dropDownContainsValueCheckBoxSelection({ element: drpdwnpermanentDriverCodes, ddValue: driverDataTDM.driverCode });
      dropDownContainsValueCheckBoxSelection({ element: drpdwnpermanentDriverCodes, ddValue: driverDataTDM2.driverCode });
      //Save Trailer
      saveTrailer();
      //verifying the empty dropdown options- Permanent Power and Permanent driver
      validateDefaultDrpDwn({ element: labelPermanentDrivers, drpdwnlocator: drpdwnPermanentDriverBtn, verifyText: permanentDriver });
      validateDefaultDrpDwn({ element: labelPermanentPower, drpdwnlocator: txtFieldPermanentPower, verifyText: permanentPower });

      //editing the dropdown options- Permanent Power and Permanent driver
      dropDownContainsValueCheckBoxSelection({ element: drpdwnpermanentDriverCodes, ddValue: driverDataTDM.driverCode });
      dropDownContainsValueCheckBoxSelection({ element: drpdwnpermanentDriverCodes, ddValue: driverDataTDM2.driverCode });
      selectValueDropDownInputType({ element: txtFieldPermanentPower, ddValue: powerCode });
      //Save Trailer
      saveTrailer();
      //verifying Operational Details Permanent Power
      verifyAttrValueContains({ locator: txtFieldPermanentPower, attribute: valueAttr, verifyText: powerCode });
      //verifying Operational Details Permanent driver
      verifyTextContains({ locator: drpdwnPermanentDriverBtn, containsText: driverDataTDM.driverCode });
      verifyTextContains({ locator: drpdwnPermanentDriverBtn, containsText: driverDataTDM2.driverCode });

      //open trailer via search trailer and navigating to trailer General page
      searchTrailerWithCode({ trailerCode });
      waitSometime(shortWait);
      clickAction({ locator: tabTrailerGeneral });
      //verifying Operational Details Permanent Power
      verifyAttrValueContains({ locator: txtFieldPermanentPower, attribute: valueAttr, verifyText: powerCode });
      //verifying Operational Details Permanent driver
      verifyTextContains({ locator: drpdwnPermanentDriverBtn, containsText: driverDataTDM.driverCode });
      verifyTextContains({ locator: drpdwnPermanentDriverBtn, containsText: driverDataTDM2.driverCode });
    });
});