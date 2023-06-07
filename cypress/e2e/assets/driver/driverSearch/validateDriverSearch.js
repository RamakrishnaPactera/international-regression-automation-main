/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Test Driver Search - Functional TestCase
 Test Cases List
 Authored By : Shashi Jaiswal, Pruthvirajg
 Date : 10-05-2023,
 Functions/Calling References : genericUtils, loginUtils, resourceUtils
 Test case Included:
 ME-153379 : As a Application User , Verify when choosing any search parameters whether the Search and Clear button on driver Search page is enabled and function as expected
 ME-153382 : Verify when there is no records available with respect to Search criteria
 ME-153384 : Verify whether the scroll bars and Results load in the Search results table is enabled and Function as expected.
 ME-154122 : As a User , Verify whether the Search results are not happening with irrelevant of Search criteria when division drop drown value is selected
 ME-153373 : As a User , Verify whether the Search results are not happening with irrelevant of Search criteria when type drop drown value is selected
 ME-154339 : Verify the search functionality when driver is searched as according to Driver code by giving the drivercode in Driver Code search
 ME-154340 : Verify the search functionality when driver is searched as according to phonenumber by giving the phonenumber in phone search
 ME-154342 : Verify the search functionality when driver is searched as according to name by giving the driver name in name search
 ME-154344 : Verify the cards in Search page for Identifiers and Organizational Details
 ME-142184 : [FE]Driver Search-verify newly Created Terminal Column in Driver Search Results
 ME-142186 : [FE]Driver Search-verify Wire up the column ‘Terminal’ to the terminal field in the ‘Operational Details’ card in create mode
 ME-155652 : [FE]Driver Search-verify Wire up the column ‘Terminal’ to the terminal field in the ‘Operational Details’ card in update mode
 ME-142187 : [FE]Driver Search- Driver record with terminal set, In card verify User should be able to retrieve the record.
 ME-155692 : [FE]Driver Search-Remove "terminal" field in card and verify the column ‘Terminal'in Driver Search results
 ME-137410 : Driver Search -Regression Tetscase
 ME-137507- Display an Alert while tab change without saving text in AssetsDriver__Regression TESTCASES.
 ME-154338 : Verify the search functionality when driver is searched as according to Type by selecting the Type in Type dropdown
 ME-154336 : Verify the search functionality when driver is searched as according to Division by selecting the Division in Division dropdown
 ME-153369 : As a User Verify whether , by clicking on Driver ID in the Search results should be able to redirect to related driver asset page or not
 ME-153357 : Verify Organizational Details and Its Fields
 ME-153367 : As A User , verify whether the Search results or appropriate or Not
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { loginToApplication } from '../../../../utilities/appSpecificUtils/loginUtils/loginUtils';
import { driverSaveAction, enterDriverMandatoryFields, navigateToAddPowerNewPage, navigateToDriverAddNewPage, navigateToDriverSearchPage, searchDriverWithCode } from '../../../../utilities/assetUtils/resourceUtilis';
import { clickAction, clickActionWait, getMinionValues, scrollIntoView, typeText, verifyAttrValueContains, verifyElementValue, verifyFirstElementContinsTxt, verifyIfEnabled, verifyTextContains, verifyVisible, viewFullPage, getTDMData, verifyTableRowElementText, verifyElementText, generateRandomNumberByLength, typeDrpDwnWithMachtingText, verifyExists, selectItemFrmSrchPicker, scrollToTopRight, textClear, verifyLblTextLength, generateRandomAlphaNumByLength, clearAndTypeWithWait, verifyConfirmAlertMessage, clickOkOnWindowAlertConfirm, dropDownContainsTextClick, typeDropDown } from '../../../../utilities/commonUtils/genericUtils';
import driverSearchPage from '../../../../pageObjects/assets/driver/driverSearch/driverSearchPage.json';
import historyData from '../../../../testData/assets/driver/driverDetails/history/historyData.json';
import generalData from '../../../../testData/assets/driver/driverDetails/general/generalData.json';
import addDriverData from '../../../../testData/assets/driver/addDriver/addDriverData.json';
import driverCommonPage from '../../../../pageObjects/assets/driver/driverCommonPage.json';
import driverAddNewPage from '../../../../pageObjects/assets/driver/addDriver/addDriverPage.json';
import homePage from '../../../../pageObjects/homePage/homePage.json';
import { txtFieldPowerCode } from '../../../../pageObjects/assets/power/powerSearch/powerSearchPage.json';

const { minionDrpDwnProfessionalType, minionDrpDwnDivision, countryIndia } = generalData.staticData;
const { txtFieldDriverCode, txtFieldPhoneNumGenPage, txtFieldDriverNameSearch, btnSearchSubmit, linkDriver, clearSearchBtn, spanEmptyResult, drpDwnProfType, btnExpandDrpDwnDivisionTerm, fleetTxtBx, btnProfType, result10thRow, result15thRow, rowDataType, drpDwnDivisionTerm, rowDataDivision, rowDataFirstName, rowDataPhone, drpDwnCountryGenPage, columnTerminal, rowTerminal } = driverSearchPage;
const { tdmDriverCommonScenario, tdmDriverData, tdmAddDriverReq } = addDriverData.staticData;
const { userName: usernameText, password: passwordText } = Cypress.env('users')[Cypress.env('appLoginUser')];
const { tabDriverGeneral, snapShot } = driverCommonPage;
const { drpdwnPhoneNumCountry, txtFieldPhoneNumber } = driverAddNewPage;
const { btnDriverSave, txtFieldDriverFirstName, resourcesMenu } = homePage;
const { driverSearch } = homePage.resourcesDDO;
const { tdmFacilityCommonScenario, tdmFacilityData, tdmAddFacilityReq } = historyData.staticData;
const { alertMsgForUnsavedChanges } = historyData.expectedData;
const { txtTerminal } = driverAddNewPage.operationalDetails;
let drpDwnProfData, drpDwnDivData, driverDataTDM, facilityDataTDM, facilityDataTDM1;

const createFacility = (createPrimaryFacility) => {
  cy.log('***creating driver using TDM***');
  getTDMData({ dataType: tdmFacilityData, dataCondition: tdmAddFacilityReq, dataScenario: tdmFacilityCommonScenario });
  cy.then(() => {
    if (createPrimaryFacility) {
      facilityDataTDM = Cypress.env('inputVal');
    } else {
      facilityDataTDM1 = Cypress.env('inputVal');
    }
  });
};

describe('Driver Search - Functional TestCase [ME-137410] [ME-137507]', () => {
  before(() => {
    cy.log('***creating driver using TDM***');
    getTDMData({ dataType: tdmDriverData, dataCondition: tdmAddDriverReq, dataScenario: tdmDriverCommonScenario });
    cy.then(() => {
      driverDataTDM = Cypress.env('inputVal');
    });
    //create primary facility
    createFacility(true);
    //create secondary facility for update purpose
    createFacility(false);
    getMinionValues(minionDrpDwnProfessionalType, 1).then((resultOptions) => {
      drpDwnProfData = resultOptions[0];
    });
    getMinionValues(minionDrpDwnDivision, 1).then((resultOptions) => {
      drpDwnDivData = resultOptions[0];
    });
  });

  beforeEach(() => {
    cy.then(() => {
      viewFullPage();
      loginToApplication({ username: usernameText, password: passwordText });
    });
  });

  it('ME-153379, ME-153367 As a Application User, Verify when choosing any search parameters whether the Search and Clear button on driver Search page is enabled and function as expected',
    () => {
      navigateToDriverSearchPage();
      dropDownContainsTextClick({ element: drpDwnProfType, typeText: drpDwnProfData, exactText: drpDwnProfData });
      verifyFirstElementContinsTxt({ locator: drpDwnProfType, verifyText: drpDwnProfData });
      verifyIfEnabled({ locator: clearSearchBtn });
      verifyIfEnabled({ locator: btnSearchSubmit });
      clickAction({ locator: clearSearchBtn });
      verifyAttrValueContains({ locator: btnProfType, attribute: 'data-isempty', verifyText: 'true' });
      //searching existing driver
      typeText({ locator: txtFieldDriverCode, dataText: driverDataTDM.driverCode });
      clickActionWait({ locator: btnSearchSubmit });
      //validating search result
      verifyTextContains({ locator: linkDriver, containsText: driverDataTDM.driverCode });
    });

  it('ME-153382 Verify when there is no records available with respect to Search criteria',
    () => {
      navigateToDriverSearchPage();
      verifyVisible({ element: spanEmptyResult });
      verifyIfEnabled({ locator: clearSearchBtn });
      verifyIfEnabled({ locator: btnSearchSubmit });
      verifyElementValue({ locator: txtFieldDriverCode, verifyText: '' });
      verifyElementValue({ locator: txtFieldDriverNameSearch, verifyText: '' });
      verifyElementValue({ locator: txtFieldPhoneNumGenPage, verifyText: '' });
      verifyElementValue({ locator: btnExpandDrpDwnDivisionTerm, verifyText: '' });
      verifyElementValue({ locator: fleetTxtBx, verifyText: '' });
      verifyAttrValueContains({ locator: btnProfType, attribute: 'data-isempty', verifyText: 'true' });
    });

  it('ME-153384 Verify whether the scroll bars and Results load in the Search results table is enabled and Function as expected.',
    () => {
      navigateToDriverSearchPage();
      verifyVisible({ element: spanEmptyResult });
      verifyIfEnabled({ locator: btnSearchSubmit });
      clickActionWait({ locator: btnSearchSubmit });
      scrollIntoView({ locator: result10thRow });
      scrollIntoView({ locator: result15thRow });
    });

  it('ME-153373, ME-154338 As a User, Verify whether the Search results are not happening with irrelevant of Search criteria when type drop drown value is selected',
    () => {
      navigateToDriverSearchPage();
      dropDownContainsTextClick({ element: drpDwnProfType, typeText: drpDwnProfData, exactText: drpDwnProfData });
      verifyFirstElementContinsTxt({ locator: drpDwnProfType, verifyText: drpDwnProfData });
      verifyIfEnabled({ locator: btnSearchSubmit });
      clickAction({ locator: btnSearchSubmit });
      //Verify table rows contains related search field
      verifyTableRowElementText({ locator: rowDataType, index: 0, verifyText: drpDwnProfData });
      verifyTableRowElementText({ locator: rowDataType, index: 1, verifyText: drpDwnProfData });
      //Clear search and validate.
      clickAction({ locator: clearSearchBtn });
      verifyAttrValueContains({ locator: btnProfType, attribute: 'data-isempty', verifyText: 'true' });
      verifyVisible({ element: spanEmptyResult });
    });

  it('ME-154122, ME-154336 As a User, Verify whether the Search results are not happening with irrelevant of Search criteria when division drop drown value is selected',
    () => {
      navigateToDriverSearchPage();
      typeDropDown({ locator: drpDwnDivisionTerm, drpDwnVal: drpDwnDivData });
      verifyFirstElementContinsTxt({ locator: drpDwnDivisionTerm, verifyText: drpDwnDivData });
      verifyIfEnabled({ locator: btnSearchSubmit });
      clickAction({ locator: btnSearchSubmit });
      //Verify table rows contains related search field
      verifyTableRowElementText({ locator: rowDataDivision, index: 0, verifyText: drpDwnDivData });
      verifyTableRowElementText({ locator: rowDataDivision, index: 1, verifyText: drpDwnDivData });
      //Clear search and validate.
      clickAction({ locator: clearSearchBtn });
      verifyElementText({ locator: btnExpandDrpDwnDivisionTerm, verifyText: '' });
      verifyVisible({ element: spanEmptyResult });
    });

  it('[ME-154339, ME-154340, ME-154342, ME-137410, ME-153369], Verify the search functionality when driver is searched as according to code, name or phone number',
    () => {
      navigateToDriverSearchPage();
      //name search
      typeText({ locator: txtFieldDriverNameSearch, dataText: driverDataTDM.firstName });
      clickActionWait({ locator: btnSearchSubmit });
      //validating search result
      verifyTextContains({ locator: rowDataFirstName, containsText: driverDataTDM.firstName });
      clickAction({ locator: clearSearchBtn });
      //drivercode search
      typeText({ locator: txtFieldDriverCode, dataText: driverDataTDM.driverCode });
      clickActionWait({ locator: btnSearchSubmit });
      clickActionWait({ locator: linkDriver });
      clickActionWait({ locator: tabDriverGeneral });
      verifyVisible({ element: snapShot });
      //save phonumber so that it can be used to search in next step
      typeDrpDwnWithMachtingText({ locator: drpdwnPhoneNumCountry, drpDwnVal: countryIndia });
      const phoneNum = generateRandomNumberByLength({ lengthOfNum: 10 });
      typeText({ locator: txtFieldPhoneNumber, dataText: phoneNum });
      clickActionWait({ locator: btnDriverSave });
      verifyVisible({ element: snapShot });
      navigateToDriverSearchPage();
      //Phonenumber search
      typeDrpDwnWithMachtingText({ locator: drpDwnCountryGenPage, drpDwnVal: countryIndia });
      typeText({ locator: txtFieldPhoneNumGenPage, dataText: phoneNum });
      clickActionWait({ locator: btnSearchSubmit });
      //validating search result
      verifyTextContains({ locator: linkDriver, containsText: driverDataTDM.driverCode });
      verifyAttrValueContains({ locator: rowDataPhone, attribute: 'title', verifyText: phoneNum });
    });

  it('ME-154344, ME-153357 Verify the cards in Search page for Identifiers and Organizational Details',
    () => {
      navigateToDriverSearchPage();
      //Verify identifiers card search fields
      verifyExists({ element: txtFieldDriverNameSearch });
      verifyExists({ element: txtFieldPhoneNumGenPage });
      verifyExists({ element: txtFieldDriverCode });
      verifyExists({ element: drpDwnProfType });
      //Verify Organizational details search fields
      verifyExists({ element: drpDwnDivisionTerm });
      verifyExists({ element: fleetTxtBx });
      verifyExists({ element: btnSearchSubmit });
    });

  it('ME-142184 [FE]Driver Search-verify newly Created Terminal Column in Driver Search Results',
    () => {
      navigateToDriverSearchPage();
      verifyExists({ element: columnTerminal });
      typeText({ locator: txtFieldDriverCode, dataText: driverDataTDM.driverCode });
      clickActionWait({ locator: btnSearchSubmit });
      verifyExists({ element: rowTerminal });
    });

  it('ME-142186 [FE]Driver Search-verify Wire up the column ‘Terminal’ to the terminal field in the ‘Operational Details’ card in create mode',
    () => {
      //Save terminal info
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      scrollToTopRight();
      scrollIntoView({ locator: txtTerminal });
      selectItemFrmSrchPicker({ locator: txtTerminal, typeText: facilityDataTDM.facilityName });
      driverSaveAction();
      //Verify terminal info in driver search grid
      navigateToDriverSearchPage();
      typeText({ locator: txtFieldDriverCode, dataText: driverDataTDM.driverCode });
      clickActionWait({ locator: btnSearchSubmit });
      verifyAttrValueContains({ locator: rowTerminal, attribute: 'title', verifyText: facilityDataTDM.facilityName });
    });

  it('ME-155652 [FE]Driver Search-verify Wire up the column ‘Terminal’ to the terminal field in the ‘Operational Details’ card in update mode',
    () => {
      //Save terminal info
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      scrollToTopRight();
      scrollIntoView({ locator: txtTerminal });
      textClear({ locator: txtTerminal });
      selectItemFrmSrchPicker({ locator: txtTerminal, typeText: facilityDataTDM1.facilityName });
      driverSaveAction();
      //Verify terminal info in driver search grid
      navigateToDriverSearchPage();
      typeText({ locator: txtFieldDriverCode, dataText: driverDataTDM.driverCode });
      clickActionWait({ locator: btnSearchSubmit });
      verifyAttrValueContains({ locator: rowTerminal, attribute: 'title', verifyText: facilityDataTDM1.facilityName });
    });

  it('[ME-142187, ME-155692] [FE]Driver Search- Driver record with terminal set, In card verify User should be able to retrieve the record.',
    () => {
      //Save terminal info
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      scrollToTopRight();
      scrollIntoView({ locator: txtTerminal });
      //Verify terminal info
      verifyElementValue({ locator: txtTerminal, verifyText: facilityDataTDM1.facilityName });
      //Clear data
      textClear({ locator: txtTerminal });
      driverSaveAction();
      navigateToDriverSearchPage();
      typeText({ locator: txtFieldDriverCode, dataText: driverDataTDM.driverCode });
      clickActionWait({ locator: btnSearchSubmit });
      //Verify in search grid
      verifyLblTextLength({ locator: rowTerminal, expectedVal: 0 });
    });

  it('ME-137507- Display an Alert while tab change without saving text in AssetsDriver__Regression TESTCASES.',
    () => {
      //Navigating to Driver
      searchDriverWithCode({ driverCode: driverDataTDM.driverCode });
      clickActionWait({ locator: tabDriverGeneral });
      const firstName = generateRandomAlphaNumByLength({ lengthOfString: 7 });
      //edit the driver fist name
      clearAndTypeWithWait({ element: txtFieldDriverFirstName, typeText: firstName });
      clickActionWait({ locator: resourcesMenu });
      clickAction({ locator: driverSearch });
      //validating window prompt
      verifyConfirmAlertMessage({ msgToVerify: alertMsgForUnsavedChanges });
      clickOkOnWindowAlertConfirm();

      //Navigating to Add driver
      navigateToDriverAddNewPage();
      enterDriverMandatoryFields(false);
      clickActionWait({ locator: resourcesMenu });
      clickAction({ locator: driverSearch });
      //validating window prompt
      verifyConfirmAlertMessage({ msgToVerify: alertMsgForUnsavedChanges });
      clickOkOnWindowAlertConfirm();

      //Navigating to Power
      navigateToAddPowerNewPage();
      const powerCode = generateRandomAlphaNumByLength({ lengthOfString: 7 });
      typeText({ locator: txtFieldPowerCode, dataText: powerCode });
      clickActionWait({ locator: resourcesMenu });
      clickAction({ locator: driverSearch });
      //validating window prompt
      verifyConfirmAlertMessage({ msgToVerify: alertMsgForUnsavedChanges });
      clickOkOnWindowAlertConfirm();
    });
});